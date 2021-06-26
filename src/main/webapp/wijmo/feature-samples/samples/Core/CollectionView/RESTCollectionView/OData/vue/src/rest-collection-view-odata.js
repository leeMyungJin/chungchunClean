import { RestCollectionView } from '@grapecity/wijmo.rest';

import {
    DataType, DateTime,
    httpRequest, copy, changeType, isString, isDate, asString, asNumber, isNumber, asArray, assert
} from '@grapecity/wijmo';

// regex used to parse dates
const _rxDate = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}|\/Date\([\d\-]*?\)/;

/**
 * Class that extends {@link ServerCollectionViewBase} to support OData sources.
 */
export class RestCollectionViewOData extends RestCollectionView {
    _url;
    _tbl;
    _keys;
    _odv = 4; // OData Version
    _pendingRequest;

    /**
     * Initializes a new instance of the {@link RestCollectionViewOData} class.
     *
     * @param url Url of the OData service (for example
     * 'https://services.odata.org/Northwind/Northwind.svc/').
     * @param tableName Name of the table (entity) to retrieve from the service.
     * If not provided, a list of the tables (entities) available is retrieved.
     * @param options JavaScript object containing initialization data (property 
     * values and event handlers) for the {@link ODataCollectionView}.
     */
    constructor(url, tableName, options) {
        super();
        this._url = asString(url, false);
        this._tbl = asString(tableName);
        copy(this, options);
    }

    /**
     * Gets or sets an array containing the names of the key fields.
     *
     * Key fields are required for update operations (add/remove/delete).
     */
    get keys() {
        return this._keys;
    }
    set keys(value) {
        this._keys = asArray(value);
    }
    /**
     * Gets or sets the OData version to use.
     */
    get odataVersion() {
        return this._odv;
    }
    set odataVersion(value) {
        this._odv = asNumber(value);
    }

    // ** implementation

    // URL handling
    _getServiceUrl() {
        let url = this._url;
        if (url[url.length - 1] != '/') {
            url += '/';
        }
        return url;
    }
    _getReadUrl(link) {
        let url = this._getServiceUrl();
        if (link) {
            url = link.indexOf('http') == 0 ? link : url + link;
        } else if (this._tbl) {
            url += this._tbl;
        }
        return url;
    }
    _getWriteUrl(item) {
        let url = this._getServiceUrl() + this._tbl;
        if (item) {
            assert(this.keys && this.keys.length > 0, 'write operations require keys.');
            let keys = [];
            this.keys.forEach(key => {
                let itemKey = item[key];
                if (itemKey == null) {
                    itemKey = '';
                }
                if (isString(itemKey)) { // enclose string keys in quotes
                    itemKey = '\'' + itemKey + '\'';
                }
                keys.push(this.keys.length == 1 // add key name only if we have multiple keys
                    ? itemKey
                    : key + '=' + itemKey);
            });
            if (keys.length) {
                url += '(' + keys.join(',') + ')';
            }
        }
        return url;
    }

    // read parameters apply fields, sort, paging, and filter
    _getReadParams(nextLink) {
        let settings = {};

        // we only do json
        if (!nextLink || (nextLink.indexOf('$format') < 0 && nextLink.indexOf('%24format') < 0)) {
            settings.$format = 'json';
        }

        // no parameters needed if they are already on the nextLink argument
        if (!nextLink) {

            // more setting if we have a table
            if (this._tbl) {

                // get filtered (but not paged) item count (OData4 uses $count, earlier versions use $inlinecount)
                if (this._odv < 4) {
                    settings.$inlinecount = 'allpages';
                } else {
                    settings.$count = true;
                }

                // specify fields to retrieve
                if (this.fields) {
                    settings.$select = this.fields.join(',');
                }

                // apply sort
                if (this.sortOnServer && this.sortDescriptions.length) {
                    let sort = '';
                    this.sortDescriptions.forEach(sd => {
                        if (sort) sort += ',';
                        sort += sd.property;
                        if (!sd.ascending) sort += ' desc';
                    });
                    settings.$orderby = sort;
                }

                // apply paging
                if (this.pageOnServer && this.pageSize > 0) {
                    settings.$skip = this.pageIndex * this.pageSize;
                    settings.$top = this.pageSize;
                }

                // apply filter 
                if (this.filterOnServer && this._filterProvider) {
                    settings.$filter = this._asODataFilter(this._filterProvider);
                }
            }
        }
        return settings;
    }

    // parse data
    _jsonReviver(key, value) {
        if (typeof value === 'string' && _rxDate.test(value)) {
            value = value.indexOf('/Date(') == 0 // verbosejson
                ? new Date(parseInt(value.substr(6)))
                : new Date(value);
        }
        return value;
    }

    // gets the OData filter definition from a wijmo.grid.filter.FlexGridFilter object.
    // https://www.odata.org/documentation/odata-version-2-0/uri-conventions/
    _asODataFilter(filter) {
        let def = '';
        for (let c = 0; c < filter.grid.columns.length; c++) {
            let col = filter.grid.columns[c],
                cf = filter.getColumnFilter(col, false);
            if (cf && cf.isActive) {
                if (def) {
                    def += ' and ';
                }
                if (cf.conditionFilter && cf.conditionFilter.isActive) {
                    def += this._asODataConditionFilter(cf.conditionFilter);
                } else if (cf.valueFilter && cf.valueFilter.isActive) {
                    def += this._asODataValueFilter(cf.valueFilter);
                }
            }
        }
        return def;
    }
    _asODataValueFilter(vf) {
        let col = vf.column,
            fld = col.binding,
            map = col.dataMap,
            def = '';

        // build condition with 'eq/or'
        for (let key in vf.showValues) {
            let value = changeType(key, col.dataType, col.format);
            if (map && isString(value)) { // TFS 239356
                value = map.getKeyValue(value);
            }
            if (def) def += ' or ';
            def += this._asEquals(fld, value, col.dataType);
        }

        // enclose in parenthesis if not empty
        if (def.length) {
            def = '(' + def + ')';
        }

        // all done
        return def;
    }
    _asEquals(fld, value, type) {
        let def = '',
            DT = DataType;
        if (value === '' || value == null) { // null or empty
            def += fld + ' eq null';
            if (type == DT.String) { // empty OK for strings only
                def += ' or ' + fld + ' eq \'\'';
            }
        } else if (type == DT.Date) { // non-null/empty dates (TFS 458080)
            def += fld + ' ge ' + this._asODataValue(value, type) + ' and ' +
                 fld + ' lt ' + this._asODataValue(DateTime.addDays(value, 1), type);
        } else { // other types
            def += fld + ' eq ' + this._asODataValue(value, type);
        }
        return '(' + def + ')';
    }
    _asODataConditionFilter(cf) {
        let c1 = this._asODataCondition(cf, cf.condition1),
            c2 = this._asODataCondition(cf, cf.condition2);
        if (c1 && c2) return '(' + c1 + (cf.and ? ' and ' : ' or ') + c2 + ')';
        if (c1) return '(' + c1 + ')';
        if (c2) return '(' + c2 + ')';
        return null;
    }
    _asODataCondition(cf, cnd) {
        let col = cf.column,
            fld = col.binding,
            map = col.dataMap,
            value = cnd.value;
        if (map && isString(value)) { // TFS 440901
            value = map.getKeyValue(value);
        }
        value = this._asODataValue(value, cf.column.dataType);
        switch (cnd.operator) {
            case 0: // EQ = 0, 
                return fld + ' eq ' + value;
            case 1: // NE = 1,
                return fld + ' ne ' + value;
            case 2: // GT = 2, 
                return fld + ' gt ' + value;
            case 3: // GE = 3, 
                return fld + ' ge ' + value;
            case 4: // LT = 4, 
                return fld + ' lt ' + value;
            case 5: // LE = 5, 
                return fld + ' le ' + value;
            case 6: // BW = 6, 
                return 'startswith(' + fld + ',' + value + ')';
            case 7: // EW = 7, 
                return 'endswith(' + fld + ',' + value + ')';
            case 8: // CT = 8, 
                return this._odv >= 4
                    ? 'contains(' + fld + ',' + value + ')' // OData4
                    : 'substringof(' + value.toLowerCase() + ', tolower(' + fld + '))'; // OData2
            case 9: // NC = 9 
                return this._odv >= 4
                    ? 'not contains(' + fld + ',' + value + ')' // OData4
                    : 'not substringof(' + value.toLowerCase() + ', tolower(' + fld + '))'; // OData2
        }
    }
    _asODataValue(value, dataType) {
        if (isDate(value)) {
            value = value.toJSON();
            if (this._odv < 4) { // TFS 323961
                value = "datetime'" + value.substr(0, 10) + "'";
            }
            return value;
        } else if (isString(value)) {
            return "'" + value.replace(/'/g, "''") + "'";
        } else if (value != null) {
            return value.toString();
        }
        return dataType == DataType.String ? "''" : null;
    }

    // convert objects before posting to OData services
    _convertToDbFormat(item) {
        if (this._odv >= 4) {
            return item;
        }
        let obj = {};
        for (let key in item) {
            let value = item[key];
            if (isNumber(value)) {

                // convert numbers to strings in versions prior to 4.0.
                // failing to do this may cause the service to throw an error:
                // 'Cannot convert a primitive value to the expected type'
                // which can in turn causes an HTTP 400 (Bad Request) error
                value = value.toString();

            }
            obj[key] = value;
        }
        return obj;
    }
    

    // ** overrides

    async getItems(link) {

        // cancel any pending requests
        if (this._pendingRequest) {
            //console.log('aborting pending request');
            this._pendingRequest.abort();
        }

        return new Promise(resolve => {
            this._pendingRequest = httpRequest(this._getReadUrl(link), {
                requestHeaders: this.requestHeaders,
                data: this._getReadParams(link),
                success: async xhr => {

                    // parse response (handles OData4 and earlier)
                    let resp = JSON.parse(xhr.responseText, this._jsonReviver),
                        arr = resp.d ? resp.d.results : resp.value,
                        count = resp.d ? resp.d.__count : (resp['odata.count'] || resp['@odata.count']),
                        nextLink = resp.d ? resp.d.__next : (resp['odata.nextLink'] || resp['@odata.nextLink']);

                    // update total item count
                    if (count != null) {
                        this._totalItemCount = isString(count) ? parseInt(count) : count;
                    }

                    // get data from next link
                    if (nextLink) {
                        let nextPage = await this.getItems(nextLink);
                        arr = arr.concat(nextPage);
                    }

                    // done
                    resolve(arr);
                },
                error: xhr => this._raiseError(xhr.responseText, false),
                complete: xhr => this._pendingRequest = null // no pending requests
            });
        });
    }

    addItem(item) {

        // write operations require keys
        if (!this.keys || !this.keys.length) {
            return null;
        }

        return new Promise(resolve => {
            let url = this._getWriteUrl();
            let requestHeaders = {
                'Accept': 'application/json'
            };
            if (this.requestHeaders) {
                for (let k in this.requestHeaders) {
                    requestHeaders[k] = this.requestHeaders[k];
                }
            }
            httpRequest(url, {
                method: 'POST',
                requestHeaders: requestHeaders,
                data: this._convertToDbFormat(item),
                success: xhr => { // update keys in the new item, refresh the view
                    let newItem = JSON.parse(xhr.responseText, this._jsonReviver);
                    this.keys.forEach(key => {
                        item[key] = newItem[key];
                    });
                    this.refresh();
                },
                error: xhr => this._raiseError(xhr.responseText, true)
            });
        });
    }

    patchItem(item) {

        // write operations require keys
        if (!this.keys || !this.keys.length) {
            return null;
        }

        return new Promise((resolve) => {
            let url = this._getWriteUrl(this._edtClone);
            httpRequest(url, {
                method: 'PATCH', //'PUT',
                requestHeaders: this.requestHeaders,
                data: this._convertToDbFormat(item),
                success: xhr => resolve(item),
                error: xhr => this._raiseError(xhr.responseText, true)
            });
        });
    }

    deleteItem(item) {

        // write operations require keys
        if (!this.keys || !this.keys.length) {
            return null;
        }

        return new Promise(resolve => {
            let url = this._getWriteUrl(item);
            httpRequest(url, {
                method: 'DELETE',
                requestHeaders: this.requestHeaders,
                success: xhr => {
                    resolve(item);
                },
                error: xhr => this._raiseError(xhr.responseText, true)
            });
        });
    }    
}
