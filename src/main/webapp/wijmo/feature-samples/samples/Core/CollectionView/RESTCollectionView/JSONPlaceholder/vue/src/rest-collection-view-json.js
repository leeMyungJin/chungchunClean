import { RestCollectionView } from '@grapecity/wijmo.rest';

import { httpRequest, copy, asString, assert } from '@grapecity/wijmo';

// regex used to parse dates
const _rxDate = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}|\/Date\([\d\-]*?\)/;

/**
 * Class that extends {@link RestCollectionView} to support JSOnPlaceholder sources.
 * 
 * For more details on JSOnPlaceholder sources, please see
 * https://jsonplaceholder.typicode.com/guide/
 */
export class RestCollectionViewJson extends RestCollectionView {
    _url = 'https://jsonplaceholder.typicode.com/';
    _tbl;
    _key;
    _pendingRequest;

    /**
     * Initializes a new instance of the {@link RestCollectionViewJson} class.
     *
     * @param tableName Name of the table (entity) to retrieve from the service.
     * @param options JavaScript object containing initialization data (property 
     * values and event handlers) for the {@link ODataCollectionView}.
     */
    constructor(tableName, options) {
        super();
        this._tbl = asString(tableName);
        copy(this, options);

        // this source does not support server-side pagination, sorting, or filtering.
        this.pageOnServer = false;
        this.sortOnServer = false;
        this.filterOnServer = false;
    }

    /**
     * Gets or the name of the key field.
     *
     * Key fields are required for update operations (add/remove/delete).
     */
    get key() {
        return this._key;
    }
    set key(value) {
        this._key = asString(value);
    }

    // ** implementation

    _getWriteUrl(item) {
        let url = this._url + this._tbl;
        assert(this.key != null, 'write operations require keys');
        return url + '/' + item[this.key];
    }

    _jsonReviver(key, value) {
        if (typeof value === 'string' && _rxDate.test(value)) {
            value = value.indexOf('/Date(') == 0 // verbosejson
                ? new Date(parseInt(value.substr(6)))
                : new Date(value);
        }
        return value;
    }

    // ** overrides

    async getItems() {

        // cancel any pending requests
        if (this._pendingRequest) {
            //console.log('aborting pending request');
            this._pendingRequest.abort();
        }

        return new Promise(resolve => {
            let url = this._url + this._tbl;
            this._pendingRequest = httpRequest(url, {
                success: async xhr => {
                    let arr = JSON.parse(xhr.responseText, this._jsonReviver);
                    resolve(arr);
                },
                error: xhr => this._raiseError(xhr.responseText, false),
                complete: xhr => this._pendingRequest = null // no pending requests
            });
        });
    }

    addItem(item) {
        return new Promise(resolve => {
            let url = this._url + this._tbl;
            let requestHeaders = {
                'Content-Type': 'application/json; charset=UTF-8'
            };
            if (this.requestHeaders) {
                for (let k in this.requestHeaders) {
                    requestHeaders[k] = this.requestHeaders[k];
                }
            }
            let newItem = {};
            for (let k in item) {
                if (k != this.key) {
                    newItem[k] = item[k]
                }
            }
            httpRequest(url, {
                method: 'POST',
                requestHeaders: requestHeaders,
                data: newItem,
                success: xhr => { // update keys in the new item, refresh the view
                    let newItem = JSON.parse(xhr.responseText, this._jsonReviver);
                    item[this.key] = newItem[this.key];
                    this.refresh();
                },
                error: xhr => this._raiseError(xhr.responseText, true)
            });
        });
    }

    patchItem(item) {
        return new Promise((resolve) => {
            let url = this._getWriteUrl(item);
            httpRequest(url, {
                method: 'PUT',
                requestHeaders: this.requestHeaders,
                data: item,
                success: xhr => resolve(item),
                error: xhr => this._raiseError(xhr.responseText, true)
            });
        });
    }

    deleteItem(item) {
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
