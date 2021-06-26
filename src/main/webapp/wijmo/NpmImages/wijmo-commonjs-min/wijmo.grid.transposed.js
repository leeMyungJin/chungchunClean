﻿/*!
    *
    * Wijmo Library 5.20211.794
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(o,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,e){o.__proto__=e}||function(o,e){for(var r in e)e.hasOwnProperty(r)&&(o[r]=e[r])})(o,e)};return function(o,e){extendStatics(o,e);function __(){this.constructor=o}o.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}}(),__importStar=this&&this.__importStar||function(o){if(o&&o.__esModule)return o;var e={};if(null!=o)for(var r in o)Object.hasOwnProperty.call(o,r)&&(e[r]=o[r]);e.default=o;return e};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_grid_1=require("wijmo/wijmo.grid"),wijmo_1=require("wijmo/wijmo"),selfModule=__importStar(require("wijmo/wijmo.grid.transposed")),_MergeManager=function(o){__extends(_MergeManager,o);function _MergeManager(){return null!==o&&o.apply(this,arguments)||this}_MergeManager.prototype.getMergedRange=function(e,r,t,n){void 0===n&&(n=!0);var i=e.grid;if(e==i.rowHeaders&&i._hasColumnGroups()){if(r<0||r>=e.rows.length||t<0||t>=e.columns.length)return null;var a=i._getColumnGroup(r,t);if(a){var s=a._rng,u=e.rows;if(u.isFrozen(s.row)!=u.isFrozen(s.row2)){s=s.clone();u.isFrozen(r)?s.row2=u.frozen-1:s.row=u.frozen}return s}return null}return o.prototype.getMergedRange.call(this,e,r,t,n)};return _MergeManager}(wijmo_grid_1.MergeManager);exports._MergeManager=_MergeManager;var TransposedGrid=function(o){__extends(TransposedGrid,o);function TransposedGrid(e,r){var t=o.call(this,e,null)||this;t._keyPrefix="item";t._autoGenRows=!0;wijmo_1.addClass(t.hostElement,"wj-transposed-grid");t.allowSorting=wijmo_grid_1.AllowSorting.None;t.headersVisibility=wijmo_grid_1.HeadersVisibility.Row;t._rowInfo=new wijmo_grid_1.ColumnCollection(t,t.columns.defaultSize);t._grpHdl=new _RowGroupHandler(t);t.mergeManager=new _MergeManager;t.initialize(r);t._rowInfo.collectionChanged.addHandler(t._rowInfoChanged,t);t.deferUpdate((function(){var o=t.rowHeaders.columns;if(o.length){o[o.length-1].width=t.columns.defaultSize}}));return t}Object.defineProperty(TransposedGrid.prototype,"autoGenerateRows",{get:function(){return this._autoGenRows},set:function(o){this._autoGenRows=wijmo_1.asBoolean(o)},enumerable:!0,configurable:!0});Object.defineProperty(TransposedGrid.prototype,"rowGroups",{get:function(){return this._grpHdl.getGroupDefinitions()},set:function(o){var e=this;this._rowInfo.deferUpdate((function(){e.autoGenerateRows=!1;e._rowInfo.clear();e._grpHdl.createColumnGroups(wijmo_1.asArray(o))}))},enumerable:!0,configurable:!0});TransposedGrid.prototype.refresh=function(e){var r=this._rowInfo;if(r._dirty){r._dirty=!1;this._rowInfoChanged()}else o.prototype.refresh.call(this,e)};Object.defineProperty(TransposedGrid.prototype,"allowAddNew",{get:function(){return!1},set:function(o){},enumerable:!0,configurable:!0});Object.defineProperty(TransposedGrid.prototype,"allowDelete",{get:function(){return!1},set:function(o){},enumerable:!0,configurable:!0});Object.defineProperty(TransposedGrid.prototype,"allowSorting",{get:function(){return wijmo_grid_1.AllowSorting.None},set:function(o){wijmo_1.assert(o===wijmo_grid_1.AllowSorting.None,"TransposedGrid does not support sorting.");this._alSorting=o},enumerable:!0,configurable:!0});Object.defineProperty(TransposedGrid.prototype,"columnGroups",{get:function(){return null},set:function(o){throw"TransposedGrid does not support columnGroups, use rowGroups instead."},enumerable:!0,configurable:!0});TransposedGrid.prototype.onRowEditEnded=function(e){var r=wijmo_1.tryCast(this._sourceItems,"ICollectionView");if(r){var t=new wijmo_1.NotifyCollectionChangedEventArgs(wijmo_1.NotifyCollectionChangedAction.Change);r.collectionChanged.raise(r,t)}o.prototype.onRowEditEnded.call(this,e)};TransposedGrid.prototype._getCollectionView=function(e){var r=this,t=wijmo_1.tryCast(this._sourceItems,"ICollectionView");t&&t.collectionChanged.removeHandler(this._sourceViewChanged);t=wijmo_1.tryCast(e,"ICollectionView");var n=e;if(wijmo_1.isArray(e))n=this._transposeItemsSource(e);else if(t){t.collectionChanged.addHandler(this._sourceViewChanged,this);n=this._transposeItemsSource(t.items)}this.autoGenerateColumns=!0;var i=o.prototype._getCollectionView.call(this,n),a=null;t instanceof wijmo_1.CollectionView&&(a=t.getError);a&&i instanceof wijmo_1.CollectionView&&(this._supportsProxies()?i.getError=function(o,e){if(null==e)return null;var r=o._keys.indexOf(e);return a(o._arr[r],o._bnd.path)}:i.getError=function(o,e){if(null==e)return null;var t=parseInt(e.substr(r._keyPrefix.length));return a(o._arr[t],o._rowInfo.binding)});this._sourceItems=e;return i};TransposedGrid.prototype._getColumnTypes=function(o){var e,r=this;if(this._sourceItems)if(wijmo_1.isArray(this._sourceItems))e=this._sourceItems;else{var t=wijmo_1.tryCast(this._sourceItems,"ICollectionView");t&&(e=t.items)}return e?e.map((function(o,e){return{binding:r._keyPrefix+e,dataType:wijmo_1.DataType.Object}})):wijmo_1.getTypes(o)};TransposedGrid.prototype._copy=function(e,r){var t=this;if(/rows|columns/.test(e)){wijmo_1.assert(wijmo_1.isArray(r),"Array Expected.");var n=wijmo_1.asArray(r);n.some((function(o){return null!=o.columns}))?this.rowGroups=n:this._rowInfo.deferUpdate((function(){t.autoGenerateRows=!1;t._rowInfo.clear();r.forEach((function(o){var e=new TransposedGridRow(o);t._rowInfo.push(e)}))}));return!0}return o.prototype._copy.call(this,e,r)};TransposedGrid.prototype.onLoadedRows=function(e){for(var r=this,t=this.columns,n=0;n<t.length;n++){var i=t[n];i.align=null;i.dataType=0}var a=this.rowHeaders.columns;for(n=0;n<a.length;n++){a[n].align="left";a[n].width=0}var s=wijmo_grid_1.FlexGrid._getSerializableProperties(wijmo_grid_1.Row);this.rows.forEach((function(o){var e=o.dataItem._rowInfo;if(e){r._copyProps(e,o,s,["showDropDown","width","size"]);if(r._hasColumnGroups())for(var t=0;t<a.length;t++){var n=r._grpHdl.getColumnGroup(o.index,t);n&&r._updateRowHeaders(o.index,t,n)}else a.length&&r._updateRowHeaders(o.index,a.length-1,e)}}));for(n=0;n<a.length;n++)0===a[n].width&&(a[n].width=this.columns.defaultSize);o.prototype.onLoadedRows.call(this,e)};TransposedGrid.prototype._getBindingColumn=function(o,e,r){var t=r;if(o!=this.cells)return t;var n=o.rows[e].dataItem._rowInfo;if(wijmo_1.isUndefined(n))return t;t=new wijmo_grid_1.Column;var i=wijmo_grid_1.FlexGrid._getSerializableProperties(wijmo_grid_1.Column);this._copyProps(n,t,i);t.binding=r.binding;t.header=n.header||wijmo_1.toHeaderCase(n.binding);return t};TransposedGrid.prototype._copyProps=function(o,e,r,t){void 0===t&&(t=[]);for(var n in o)if(r.indexOf(n)>-1&&-1===t.indexOf(n)){var i=o[n];if(!wijmo_1.isUndefined(i))try{e[n]=i}catch(o){}}};TransposedGrid.prototype._updateRowHeaders=function(o,e,r){var t=r.header||wijmo_1.toHeaderCase(r.binding);this.rowHeaders.setCellData(o,e,t);var n=this.rowHeaders.columns,i=r.width;if(wijmo_1.isNumber(i)&&i>0){var a=r._rng;if(a&&a instanceof wijmo_grid_1.CellRange&&a.isValid){var s=a.columnSpan;wijmo_1.assert(s>0,"Column span is negative or equal to 0");i/=s}n[e].width=Math.max(n[e].width,i)}};TransposedGrid.prototype._rowInfoChanged=function(){var o=this;this._toRowInfo&&clearTimeout(this._toRowInfo);this._toRowInfo=setTimeout((function(){var e=o.selection,r=o.itemsSource;o.itemsSource=null;o.itemsSource=r;o.selection=e}),wijmo_1.Control._REFRESH_INTERVAL)};TransposedGrid.prototype._sourceViewChanged=function(o,e){this.activeEditor||this.invalidate()};TransposedGrid.prototype._transposeItemsSource=function(o){var e=this,r=new wijmo_1.ObservableArray,t=wijmo_1.getTypes(o),n=o.map((function(o,r){return e._keyPrefix+r}));(this.autoGenerateRows?this._getRowInfo(o):this._rowInfo).forEach((function(i,a){var s=new wijmo_1.Binding(i.binding);if(null==i.dataType&&o.length){var u=s.getValue(o[0]);i.dataType=null!=u?wijmo_1.getType(u):t[a].dataType}if(e._supportsProxies()){var l=e._createProxy(o,i,n);r.push(l)}else{var _=e._createTransposedObject(o,i,e._keyPrefix);r.push(_)}}));o instanceof wijmo_1.ObservableArray&&o.collectionChanged.addHandler((function(o,t){if(t.action===wijmo_1.NotifyCollectionChangedAction.Change)e.activeEditor||e.invalidate();else{var n=new wijmo_1.NotifyCollectionChangedEventArgs(wijmo_1.NotifyCollectionChangedAction.Reset);r.onCollectionChanged(n);e._rowInfoChanged()}}));return r};TransposedGrid.prototype._supportsProxies=function(){return null!=window.Proxy};TransposedGrid.prototype._createProxy=function(o,e,r){var t={_arr:o,_rowInfo:e,_bnd:new wijmo_1.Binding(e.binding),_keys:r};return new Proxy(t,{ownKeys:function(o){return o._keys},getOwnPropertyDescriptor:function(){return{enumerable:!0,configurable:!0,writable:!0}},get:function(o,e){var r=o._keys.indexOf(e);return r>-1?o._bnd.getValue(o._arr[r]):o[e]},set:function(o,e,r){var t=o._keys.indexOf(e);if(t>-1){var n=o._arr,i=n[t];o._bnd.setValue(i,r);if(n instanceof wijmo_1.ObservableArray){var a=new wijmo_1.NotifyCollectionChangedEventArgs(wijmo_1.NotifyCollectionChangedAction.Change,i,t);n.onCollectionChanged(a)}return!0}return!1}})};TransposedGrid.prototype._createTransposedObject=function(o,e,r){for(var t={_arr:o,_rowInfo:e},n=new wijmo_1.Binding(e.binding),_loop_1=function(e){var i=o[e];Object.defineProperty(t,r+e,{enumerable:!0,get:function(){return n.getValue(i)},set:function(r){n.setValue(i,r);if(o instanceof wijmo_1.ObservableArray){var t=new wijmo_1.NotifyCollectionChangedEventArgs(wijmo_1.NotifyCollectionChangedAction.Change,i,e);o.onCollectionChanged(t)}return!0}})},i=0;i<o.length;i++)_loop_1(i);return t};TransposedGrid.prototype._getRowInfo=function(o){var e=this,r=[];wijmo_1.getTypes(o).forEach((function(o){var t=o.binding,n=o.dataType;if(n!=wijmo_1.DataType.Object&&n!=wijmo_1.DataType.Array){var i={binding:t,header:wijmo_1.toHeaderCase(t),dataType:n},a=wijmo_grid_1.FlexGrid._defTypeWidth[n];if(null!=a){if(wijmo_1.isString(a)){var s=Math.round(parseFloat(a));a=a.indexOf("*")<0?s:s*e.columns.defaultSize}wijmo_1.isNumber(a)&&a>0&&(i.width=a)}r.push(i)}}));return r};return TransposedGrid}(wijmo_grid_1.FlexGrid);exports.TransposedGrid=TransposedGrid;var TransposedGridRow=function(o){__extends(TransposedGridRow,o);function TransposedGridRow(){return null!==o&&o.apply(this,arguments)||this}Object.defineProperty(TransposedGridRow.prototype,"height",{get:function(){return this._height},set:function(o){this._height=o},enumerable:!0,configurable:!0});return TransposedGridRow}(wijmo_grid_1.Column);exports.TransposedGridRow=TransposedGridRow;var _RowGroupHandler=function(o){__extends(_RowGroupHandler,o);function _RowGroupHandler(e){return o.call(this,e)||this}_RowGroupHandler.prototype.createColumnGroups=function(o){this._createRowGroups(o)};_RowGroupHandler.prototype.getColumnGroup=function(o,e){var r=this._grid;if(e<r.rowHeaders.columns.length&&o<r._rowInfo.length)for(var t=this._colGroups;t;){for(var n=t,i=0;i<t.length;i++){var a=t[i],s=a._rng;if(s.containsRow(o)){if(s.containsColumn(e)||0==a.columns.length)return a;t=a.columns;break}}if(t==n)break}return null};_RowGroupHandler.prototype._createRowGroups=function(o){var e=this,r=this._grid;this._groupDefs=wijmo_1.asArray(o);r.autoGenerateRows=!1;r._rowInfo.clear();this._colGroups=[];o.forEach((function(o){e._colGroups.push(new _RowGroup(o,null))}));var t=1;this._colGroups.forEach((function(o){e._addRowGroup(o);t=Math.max(t,o._getMaxLevel())}));this._colGroups.forEach((function(o){o._expandRange(t)}));var n=r.rowHeaders.columns;n.clear();for(var i=0;i<=t;i++){var a=new wijmo_grid_1.Column;n.splice(i,0,a);i<t&&(a.cssClassAll="wj-colgroup")}};_RowGroupHandler.prototype._addRowGroup=function(o){var e=this,r=this._grid;o._grid=r;o._rng.row=r._rowInfo.length;0==o.columns.length?r._rowInfo.push(o):o.columns.forEach((function(o){e._addRowGroup(o)}));o._rng.row2=r._rowInfo.length-1};return _RowGroupHandler}(wijmo_grid_1._ColumnGroupHandler);exports._RowGroupHandler=_RowGroupHandler;var _RowGroup=function(o){__extends(_RowGroup,o);function _RowGroup(e,r){var t=o.call(this,null,r)||this;t._pGrp=r;t._lvl=0;for(var n=r;n;n=n._pGrp)t._lvl++;t._rng=new wijmo_grid_1.CellRange(-1,0);t._rng.col=t._rng.col2=t._lvl;t.allowDragging=!1;wijmo_1.copy(t,e);return t}Object.defineProperty(_RowGroup.prototype,"columns",{get:function(){return this._cols},set:function(o){var e=this,r=this._cols=[];o.forEach((function(o){var t=new _RowGroup(o,e);r.indexOf(t)<0&&r.push(t)}))},enumerable:!0,configurable:!0});Object.defineProperty(_RowGroup.prototype,"rows",{get:function(){return this._cols},enumerable:!0,configurable:!0});Object.defineProperty(_RowGroup.prototype,"height",{get:function(){return this._height},set:function(o){this._height=o},enumerable:!0,configurable:!0});_RowGroup.prototype._copy=function(o,e){if(/rows|columns/.test(o)){var r=wijmo_1.asArray(e);this.columns=r;return!0}return!1};_RowGroup.prototype._updateCollapsedState=function(){var o=this._grid._rowInfo,e=this._rng,r=this._collapsed;this._cols.forEach((function(o){if(o instanceof _RowGroup){o._collapsed=r;o._updateCollapsedState()}}));var t=e.bottomRow;if(this.collapseTo)switch(this.collapseTo){case"$first":t=e.topRow;break;case"$last":t=e.bottomRow;break;default:var n=o.indexOf(this.collapseTo);n>-1&&(t=n)}for(var i=e.topRow;i<=e.bottomRow;i++)o[i].visible=!r||i==t};_RowGroup.prototype._expandRange=function(o){var e=o-this._getMaxLevel();if(e>0){this._rng.col2+=e;this._cols.forEach((function(o){o._shiftRange(e)}))}for(var r=this._grid._rowInfo,t=this._rng,n=t.row;n<=t.row2;n++){r[n]._rng.col2=o}};_RowGroup.prototype._shiftRange=function(o){this._rng.col+=o;this._rng.col2+=o;this._cols.forEach((function(e){e._shiftRange(o)}))};return _RowGroup}(wijmo_grid_1.ColumnGroup);exports._RowGroup=_RowGroup;wijmo_1._registerModule("wijmo.grid.transposed",selfModule);