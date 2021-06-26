var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RestCollectionView } from '@grapecity/wijmo.rest';
import { DataType, httpRequest, assert, copy, getType, changeType, asString, isArray, isObject, isString } from '@grapecity/wijmo';
// overshoot the number of items when paging on server
// will adjust when we hit the last page
const _INITIAL_ITEM_COUNT = 1e9;
/**
 * Class that extends {@link RestCollectionView} to support Firestore data sources.
 */
export class RestCollectionViewFirestore extends RestCollectionView {
    /**
     * Initializes a new instance of the {@link RestCollectionViewFirestore} class.
     *
     * @param projectId ID of the Firebase app that contains the database.
     * @param apiKey Unique identifier used to authenticate requests associated with the app.
     * To generate API keys, please go to https://console.cloud.google.com/.
     * @param collectionName Name of the collection.
     * @param options JavaScript object containing initialization data (property values
     * and event handlers) for this {@link Collection}.
     */
    constructor(projectId, apiKey, collectionName, options) {
        super();
        this._projectId = asString(projectId, false);
        this._apiKey = asString(apiKey, false);
        this._name = asString(collectionName, false);
        this._idToken = null;
        this._totalItemCount = _INITIAL_ITEM_COUNT;
        copy(this, options);
    }
    /**
     * Gets the name of this collection.
     */
    get name() {
        return this._name;
    }
    /**
     * Gets or sets a OAuth 2.0 id token used to access the database.
     *
     * You can use the {@link OAuth2} class to allow users to log in and
     * to obtain the {@link idToken} string.
     *
     * If you choose this authentication method, Firestore Security Rules
     * will be applied as usual to determine which users can read and write
     * to the database.
     *
     * See also the {@link accessToken} property, which bypasses Firestore
     * Security Rules and uses Cloud Identity and Access Management (IAM)
     * instead.
     */
    get idToken() {
        return this._idToken;
    }
    set idToken(value) {
        if (value != this._idToken) {
            // save OAuth idToken
            this._idToken = asString(value);
            // convert OAuth idToken into Firebase idToken
            // https://cloud.google.com/identity-platform/docs/reference/rest/v1/accounts/signInWithIdp
            if (this._idToken) {
                let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=' + this._apiKey;
                httpRequest(url, {
                    method: 'POST',
                    data: {
                        requestUri: window.location.href,
                        postBody: 'id_token=' + this._idToken + '&providerId=google.com',
                        returnSecureToken: true,
                        returnIdpCredential: true
                    },
                    success: xhr => {
                        let result = JSON.parse(xhr.responseText);
                        this._fbToken = result.idToken;
                    },
                    error: xhr => {
                        this._fbToken = '';
                    }
                });
            }
            else {
                this._fbToken = '';
            }
        }
    }
    // ** implementation
    // gets a URL to the collection or to a document
    _getUrl(doc) {
        let base = 'https://firestore.googleapis.com/v1/';
        // got object? use it
        if (isObject(doc) && doc.name) {
            return base + doc.name;
        }
        // doc not specified? use this collection's name
        if (!doc) {
            doc = '/' + this.name;
        }
        // get parent address
        let parent = 'projects/' + this._projectId + '/databases/(default)/documents';
        // build and return the URL
        return base + parent + doc;
    }
    // gets a structuredQuery object
    // that specifies fields, sorting, filtering, paging
    _getQuery() {
        // collection source
        let q = {
            from: [{
                    collectionId: this.name
                }]
        };
        // select fields to include
        if (this.fields && this.fields.length) {
            q.select = {
                fields: this.fields.map(field => {
                    return {
                        fieldPath: field
                    };
                })
            };
        }
        ;
        // server-side filtering
        let filters = null;
        if (this.filterOnServer && this._filterProvider) {
            filters = this._getQueryFilters();
        }
        // build where clause
        if (filters && filters.length) {
            q.where = filters.length == 1
                ? filters[0]
                : { compositeFilter: { filters: filters, op: 'AND' } };
        }
        // sorting
        let orderBy = [];
        if (filters && filters.length) { // order by range filters (must be first)
            filters.forEach(filter => {
                let ff = filter.fieldFilter;
                if (ff && ff.op != 'IN' && ff.op != 'EQUAL') { // no sortBy with IN/EQUAL operators
                    orderBy.push({
                        field: ff.field.fieldPath,
                        asc: true
                    });
                }
            });
        }
        if (!orderBy.length && this.sortOnServer) { // sort on server
            this.sortDescriptions.forEach(sd => {
                orderBy.push({
                    field: sd.property,
                    asc: sd.ascending
                });
            });
        }
        // apply orderBy array
        if (orderBy.length) {
            q.orderBy = orderBy.map(ob => {
                return {
                    field: { fieldPath: ob.field },
                    direction: ob.asc ? 'ASCENDING' : 'DESCENDING'
                };
            });
        }
        // paging
        let pageSize = this.pageSize;
        if (this.pageOnServer && pageSize) {
            q.limit = pageSize;
            q.offset = pageSize * this.pageIndex;
        }
        // done
        return { structuredQuery: q };
    }
    // gets the filter part of a query from a filterProvider (FlexGridFilter)
    // https://cloud.google.com/firestore/docs/reference/rest/v1/StructuredQuery#Filter
    _getQueryFilters() {
        let filters = [], filter = this._filterProvider;
        if (filter) {
            for (let c = 0; c < filter.grid.columns.length; c++) {
                let col = filter.grid.columns[c], cf = filter.getColumnFilter(col, false);
                if (cf && cf.isActive) {
                    if (cf.conditionFilter && cf.conditionFilter.isActive) {
                        this._getQueryConditionFilter(filters, cf.conditionFilter);
                    }
                    else if (cf.valueFilter && cf.valueFilter.isActive) {
                        this._getQueryValueFilter(filters, cf.valueFilter);
                    }
                    break; // cannot have multiple inequality filters on different columns
                }
            }
        }
        return filters;
    }
    _getQueryConditionFilter(filters, cf) {
        let path = cf.column.binding, sf1 = this._getQuerySimpleFilter(cf.condition1, path), sf2 = this._getQuerySimpleFilter(cf.condition2, path);
        if (sf1 && sf2 && cf.and) {
            filters.push({
                compositeFilter: {
                    op: cf.and ? 'AND' : 'OR',
                    filters: [sf1, sf2]
                }
            });
        }
        else if (sf1) {
            filters.push(sf1);
        }
        else if (sf2) {
            filters.push(sf2);
        }
    }
    _getQuerySimpleFilter(fc, path) {
        if (fc.isActive) {
            // beginsWith requires two conditions
            if (fc.operator == 6 /*OP.BW*/) {
                return {
                    compositeFilter: {
                        op: 'AND',
                        filters: [
                            { fieldFilter: {
                                    field: { fieldPath: path },
                                    op: 'GREATER_THAN_OR_EQUAL',
                                    value: this._getValueObject(fc.value)
                                } },
                            { fieldFilter: {
                                    field: { fieldPath: path },
                                    op: 'LESS_THAN',
                                    value: this._getValueObject(fc.value + '\uf8ff')
                                } },
                        ]
                    }
                };
            }
            // other operators require only one condition
            return {
                fieldFilter: {
                    field: { fieldPath: path },
                    op: this._getFilterOperator(fc.operator),
                    value: this._getValueObject(fc.value)
                }
            };
        }
        return null;
    }
    _getFilterOperator(op) {
        switch (op) {
            case 0: // OP.EQ: // equals
                return 'EQUAL';
            case 1: // OP.NE: // not equal
                return 'NOT_EQUAL';
            case 2: // OP.GT: // greater
                return 'GREATER_THAN';
            case 3: // OP.GE: // greater/equal
                return 'GREATER_THAN_OR_EQUAL';
            case 4: // OP.LT: // less
                return 'LESS_THAN';
            case 5: // OP.LE: // less/equal
                return 'LESS_THAN_OR_EQUAL';
            // not supported:
            //case OP.CT: // contains
            //case OP.EW: // ends with
            //case OP.NC: // does not contain
        }
        assert(false, op + ' operator not supported (use EQ, NE, GT, GE, LT, or LE)');
    }
    _getQueryValueFilter(filters, vf) {
        let col = vf.column, map = col.dataMap, values = [];
        // build list of values
        for (let key in vf.showValues) {
            let value = changeType(key, col.dataType, col.format);
            if (map && isString(value)) { // TFS 239356
                value = map.getKeyValue(value);
            }
            values.push(value);
            if (values.length >= 10) {
                break;
            }
        }
        // build condition
        if (values.length) {
            filters.push({
                fieldFilter: {
                    field: { fieldPath: col.binding },
                    op: 'IN',
                    value: this._getValueObject(values)
                }
            });
        }
    }
    // authorization
    _getRequestHeaders() {
        let rh = {}, token = this._fbToken;
        if (token) {
            rh.Authorization = 'Bearer ' + token;
        }
        return rh;
    }
    // parse the data received after a get request
    _parseData(docs) {
        let arr = [];
        if (isArray(docs)) {
            docs.forEach(doc => {
                let item = this._docToItem(doc);
                if (item) {
                    arr.push(item);
                }
            });
        }
        return arr;
    }
    // save Firestore document name (key) and collection into plain data items
    _saveDocName(doc, item) {
        if (doc.name && !item.$META) {
            item.$META = {
                name: doc.name
            };
            return true;
        }
        return false;
    }
    // convert Firestore document into plain data item
    _docToItem(doc) {
        // handle documents wrapped in other items (returned from runQuery)
        if (!doc.name) {
            doc = doc.document;
        }
        // the first item returned by runQuery may not be a document
        // (e.g. { readTime: xx, skippedResults: yy })
        if (!doc || !doc.name) {
            return null;
        }
        // save document name
        let item = {};
        this._saveDocName(doc, item);
        // save document fields
        for (let fld in doc.fields) {
            item[fld] = this._getDocValue(doc.fields[fld]);
        }
        // done
        return item;
    }
    // convert Firestore value into plain data item
    _getDocValue(obj) {
        let value = null;
        for (let valName in obj) {
            value = obj[valName];
            switch (valName) {
                case 'integerValue': // document stores integers as strings
                    value = parseInt(value);
                    break;
                case 'timestampValue':
                    value = new Date(value);
                    break;
                case 'mapValue':
                    let obj = {};
                    for (let k in value.fields) {
                        obj[k] = this._getDocValue(value.fields[k]);
                    }
                    value = obj;
                    break;
                case 'arrayValue':
                    value = value.values
                        ? value.values.map((val) => this._getDocValue(val))
                        : [];
                    break;
            }
        }
        return value;
    }
    // convert plain data item into Firestore document
    _itemToDoc(item) {
        let doc = {}, meta = item.$META, calcFields = this.calculatedFields;
        // save document name (key)
        if (meta && meta.name) {
            doc.name = meta.name;
        }
        // save fields
        doc.fields = {};
        for (let fld in item) {
            if (!calcFields || !(fld in calcFields)) {
                if (fld != '$META') {
                    doc.fields[fld] = this._getValueObject(item[fld]);
                }
            }
        }
        // document is ready
        return doc;
    }
    // convert value into value object
    // https://cloud.google.com/firestore/docs/reference/rest/v1/Value
    _getValueObject(value) {
        let valObj = {}, DT = DataType;
        switch (getType(value)) {
            case DT.String:
                valObj.stringValue = value;
                break;
            case DT.Boolean:
                valObj.booleanValue = value;
                break;
            case DT.Date:
                valObj.timestampValue = value.toJSON();
                break;
            case DT.Number:
                if (value == Math.round(value)) {
                    valObj.integerValue = value.toString();
                }
                else {
                    valObj.doubleValue = value;
                }
                break;
            case DT.Array:
                valObj.arrayValue = {
                    values: value.map(v => this._getValueObject(v))
                };
                break;
            case DT.Object:
                let fields = {};
                for (let k in value) {
                    fields[k] = this._getValueObject(value[k]);
                }
                valObj.mapValue = {
                    fields: fields
                };
                break;
            default:
                assert(false, 'failed to create value object.');
        }
        return valObj;
    }
    // ** overrides
    // reset page count when filter changes
    updateFilterDefinition(filterProvider) {
        if (this.filterOnServer && this.pageOnServer) {
            this._totalItemCount = _INITIAL_ITEM_COUNT;
        }
        super.updateFilterDefinition(filterProvider);
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            // cancel any pending requests
            if (this._pendingRequest) {
                //console.log('aborting pending request');
                this._pendingRequest.abort();
            }
            return new Promise(resolve => {
                this._pendingRequest = httpRequest(this._getUrl(':runQuery'), {
                    method: 'POST',
                    data: this._getQuery(),
                    requestHeaders: this._getRequestHeaders(),
                    success: xhr => {
                        // read the data
                        let data = JSON.parse(xhr.responseText), arr = this._parseData(data);
                        // keep track of total item count
                        if (this.pageOnServer && this.pageSize) {
                            if (arr.length < this.pageSize) { // not enough items? reached the end
                                let skipped = data[0].skippedResults || 0;
                                let cnt = skipped + arr.length; // this is the actual count
                                if (this._totalItemCount != cnt) {
                                    this._totalItemCount = cnt; // store count
                                    if (!arr.length) { // if we're past the end, move to last page
                                        this.moveToLastPage();
                                    }
                                }
                            }
                        }
                        // done
                        resolve(arr);
                    },
                    error: xhr => this._raiseError(xhr.responseText, false),
                    complete: xhr => this._pendingRequest = null // no pending requests
                });
            });
        });
    }
    addItem(item) {
        return new Promise(resolve => {
            let doc = this._itemToDoc(item);
            // https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents/createDocument
            httpRequest(this._getUrl(), {
                method: 'POST',
                data: { fields: doc.fields },
                requestHeaders: this._getRequestHeaders(),
                success: xhr => {
                    let doc = JSON.parse(xhr.responseText);
                    this._saveDocName(doc, item); // keep new doc's name
                    this._totalItemCount++;
                    resolve(item);
                },
                error: xhr => this._raiseError(xhr, true)
            });
        });
    }
    patchItem(item) {
        return new Promise(resolve => {
            let doc = this._itemToDoc(item);
            // https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents/patch
            httpRequest(this._getUrl(doc), {
                method: 'PATCH',
                data: { fields: doc.fields },
                requestHeaders: this._getRequestHeaders(),
                success: xhr => resolve(item),
                error: xhr => this._raiseError(xhr, true)
            });
        });
    }
    deleteItem(item) {
        return new Promise(resolve => {
            let doc = this._itemToDoc(item);
            // https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents/delete            
            httpRequest(this._getUrl(doc), {
                method: 'DELETE',
                requestHeaders: this._getRequestHeaders(),
                success: xhr => {
                    this._totalItemCount--;
                    resolve(item);
                },
                error: xhr => this._raiseError(xhr, true)
            });
        });
    }
}
