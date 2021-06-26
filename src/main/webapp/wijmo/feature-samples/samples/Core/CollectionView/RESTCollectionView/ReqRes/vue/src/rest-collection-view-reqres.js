import { RestCollectionView } from '@grapecity/wijmo.rest';

import {
    httpRequest, copy, asString, assert
} from '@grapecity/wijmo';

// regex used to parse dates
const _rxDate = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}|\/Date\([\d\-]*?\)/;

/**
 * Class that extends {@link ServerCollectionViewBase} to support Reqres sources.
 * 
 * For more details on Reqres sources, please see
 * https://reqres.in/
 */
export class RestCollectionViewReqRes extends RestCollectionView {
    _url = 'https://reqres.in/api/';
    _tbl;
    _key;
    _pendingRequest;

    /**
     * Initializes a new instance of the {@link RestCollectionViewReqRes} class.
     *
     * @param tableName Name of the table (entity) to retrieve from the service.
     * @param options JavaScript object containing initialization data (property 
     * values and event handlers) for the {@link ODataCollectionView}.
     */
    constructor(tableName, options) {
        super();
        this._tbl = asString(tableName);
        copy(this, options);

        // this source does not support server-side sorting, or filtering.
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

    // read parameters apply paging
    _getReadParams() {
        let params = {
            page: 1,
            per_page: 1e9
        };

        // paging on server
        if (this.pageOnServer && this.pageSize) {
            params.page = this.pageIndex + 1;
            params.per_page = this.pageSize;
        }

        return params;
    }

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
                data: this._getReadParams(),
                success: async xhr => {
                    let resp = JSON.parse(xhr.responseText, this._jsonReviver),
                        arr = resp.data;
                    this._totalItemCount = resp.total;
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
            let newItem = {};
            for (let k in item) {
                if (k != this.key) {
                    newItem[k] = item[k]
                }
            }
            httpRequest(url, {
                method: 'POST',
                requestHeaders: this.requestHeaders,
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
                success: xhr => resolve(item),
                error: xhr => this._raiseError(xhr.responseText, true)
            });
        });
    }    
}
