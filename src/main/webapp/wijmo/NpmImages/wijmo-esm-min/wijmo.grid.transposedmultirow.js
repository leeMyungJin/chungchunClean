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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}();import{assert,copy,asInt,addClass,asArray,hasItems,isArray,toggleClass,toHeaderCase,tryCast,Binding,CollectionView,ObservableArray,NotifyCollectionChangedEventArgs,NotifyCollectionChangedAction,getType,_registerModule}from"wijmo/wijmo";import{MergeManager,CellRange,CellType,Column,Row,AllowDragging,AllowSorting,ColumnCollection,FlexGrid}from"wijmo/wijmo.grid";import*as selfModule from"wijmo/wijmo.grid.transposedmultirow";var _MultiRow=function(e){__extends(_MultiRow,e);function _MultiRow(t,o){var n=e.call(this,t)||this;n._idxData=o;return n}return _MultiRow}(Row);export{_MultiRow};var _Cell=function(e){__extends(_Cell,e);function _Cell(t){var o=e.call(this)||this;o._row=o._col=0;o._rowspan=o._colspan=1;copy(o,t);return o}Object.defineProperty(_Cell.prototype,"row",{get:function(){return this._row},set:function(e){this._row=asInt(e,!1,!0)},enumerable:!0,configurable:!0});Object.defineProperty(_Cell.prototype,"col",{get:function(){return this._col},set:function(e){this._col=asInt(e,!1,!0)},enumerable:!0,configurable:!0});Object.defineProperty(_Cell.prototype,"colspan",{get:function(){return this._colspan},set:function(e){this._colspan=asInt(e,!1,!0);assert(this._colspan>0,"colspan must be >= 1")},enumerable:!0,configurable:!0});Object.defineProperty(_Cell.prototype,"rowspan",{get:function(){return this._rowspan},set:function(e){this._rowspan=asInt(e,!1,!0);assert(this._rowspan>0,"colspan must be >= 1")},enumerable:!0,configurable:!0});return _Cell}(Column);export{_Cell};var _CellGroup=function(e){__extends(_CellGroup,e);function _CellGroup(t,o){var n=e.call(this)||this;n._colstart=0;n._rowstart=0;n._layout=t;n._g=t._grid;copy(n,o);if(!n._cells)throw"Cell group with no cells?";var r=0,l=0;n._cells.forEach((function(e,t){for(;!n._cellFits(e,t,r,l);)0==(l=(l+1)%n.colspan)&&r++;e.row=r;e.col=l}));var i=1,s=1;n._cells.forEach((function(e){i=Math.max(i,e.row+e.rowspan);s=Math.max(s,e.col+e.colspan)}));n.rowspan=i;n.colspan=s;return n}_CellGroup.prototype._copy=function(e,t){var o=this;if("cells"==e){this._cells=[];isArray(t)&&t.forEach((function(e){var t=new _Cell(e);t.binding&&!t.header&&(t.header=toHeaderCase(t.binding));o._cells.push(t);o.colspan=Math.max(o.colspan,t.colspan)}));return!0}return!1};Object.defineProperty(_CellGroup.prototype,"cells",{get:function(){return this._cells},enumerable:!0,configurable:!0});_CellGroup.prototype.closeGroup=function(e){var t=this;if(e>this.colspan){this._cells.forEach((function(o){o.col==t.colspan-1&&(o.colspan=e-o.col)}));this.colspan=e}this._cells.forEach((function(e){for(;e.col+e.colspan<t.colspan&&!t._slotTaken(e.row,e.col+e.colspan);)e.colspan++}));this._cells.forEach((function(e){for(;e.row+e.rowspan<t.rowspan&&!t._slotTaken(e.row+e.rowspan,e.col);)e.rowspan++}));for(var o=0;o<this.rowspan;o++)for(var n=0;n<this.colspan;n++)assert(this._slotTaken(o,n),"Invalid layout (empty cells).");this._cols=new ColumnCollection(this._g,this._g.columns.defaultSize);this._rng=new Array(e*this.rowspan);this._cells.forEach((function(e){for(var o=0;o<e.rowspan;o++)for(var n=0;n<e.colspan;n++){var r=(e.row+o)*t.colspan+(e.col+n);t._cols.setAt(r,e);var l=new CellRange(e.row,e.col,e.row+e.rowspan-1,e.col+e.colspan-1);l.isSingleCell||(t._rng[r]=l)}}));this._rng[-1]=new CellRange(this._rowstart,this._colstart,this._rowstart+this._rowspan-1,this._colstart)};_CellGroup.prototype.getMergedRange=function(e,t,o){if(o<0)return this._rng[-1];var n=t-this._rowstart,r=o%this.colspan,l=this._rng[n*this.colspan+r];e.cellType==CellType.RowHeader&&o++;var i=t-n,s=o-r;return l?new CellRange(i+l.row,s+l.col,i+l.row2,s+l.col2):null};_CellGroup.prototype.getBindingColumn=function(e,t,o){if(o<0)return this;var n=t-this._rowstart,r=o%this.colspan;return this._cols[n*this.colspan+r]};_CellGroup.prototype._cellFits=function(e,t,o,n){if(n>0&&n+e.colspan>this.colspan)return!1;for(var r=0;r<e.colspan;r++)if(this._slotTaken(o,n+r,t))return!1;this.colspan=Math.max(this.colspan,n+e.colspan-1);return!0};_CellGroup.prototype._slotTaken=function(e,t,o){void 0===o&&(o=this._cells.length);for(var n=0;n<o;n++){var r=this._cells[n];if(e>=r.row&&e<=r.row+r.rowspan-1&&t>=r.col&&t<=r.col+r.colspan-1)return!0}return!1};_CellGroup.prototype._updateCellTypes=function(e){this._cols.forEach((function(t){var o=t;null==o.dataType&&o._binding&&(o.dataType=getType(o._binding.getValue(e)))}))};return _CellGroup}(_Cell);export{_CellGroup};var _MergeManager=function(e){__extends(_MergeManager,e);function _MergeManager(){return null!==e&&e.apply(this,arguments)||this}_MergeManager.prototype.getMergedRange=function(e,t,o,n){void 0===n&&(n=!0);var r=e.grid;if(t<0||t>=e.rows.length||o<0||o>=e.columns.length)return null;switch(e.cellType){case CellType.Cell:case CellType.RowHeader:var l=e.rows[t].dataItem._rowInfo.index,i=o;e.cellType==CellType.RowHeader&&i--;var s=r._getGroupByRow(t);assert(s instanceof _CellGroup,"Failed to get the group!");var a=s.getMergedRange(e,l,i);if(a){var u=l,c=t;if(t>0){u=e.rows[t-1].dataItem._rowInfo.index;c=t-1}a.row<=u?a.row=c:a.row=t;var p=l,_=t;if(t<e.rows.length-1){p=e.rows[t+1].dataItem._rowInfo.index;_=t+1}a.row2>=p?a.row2=_:a.row2=t}assert(!a||a.contains(t,o),"Merged range must contain source cell");return a;case CellType.ColumnHeader:var h=r.columnsPerItem,g=o-o%h,f=Math.min(g+h-1,e.columns.length-1);return new CellRange(0,g,e.rows.length-1,f);case CellType.TopLeft:return new CellRange(0,0,e.rows.length-1,e.columns.length-1)}return null};return _MergeManager}(MergeManager);export{_MergeManager};var _MultiRowLayout=function(){function _MultiRowLayout(e,t){this._columnsPerItem=1;this._bindingGroups=[];this._groupsByRow={};this._grid=e;this._bindingGroups=this._parseCellGroups(t)}Object.defineProperty(_MultiRowLayout.prototype,"totalRowSpan",{get:function(){var e=this._bindingGroups;if(e&&e.length){var t=e[e.length-1];return t._rowstart+t.rowspan}return 0},enumerable:!0,configurable:!0});_MultiRowLayout.prototype._parseCellGroups=function(e){var t=[],o=1;if(e){for(var n=0,r=0;n<e.length;n++){var l=new _CellGroup(this,e[n]);l._rowstart=r;r+=l._rowspan;o=Math.max(o,l._colspan);t.push(l)}t.forEach((function(e){e.closeGroup(o)}));this._columnsPerItem=o}return t};_MultiRowLayout.prototype._getGroupByRow=function(e){var t=this._getGroupIndexByRow(e);return t>-1?this._bindingGroups[t]:null};_MultiRowLayout.prototype._getGroupIndexByRow=function(e){var t=this._groupsByRow[e];if(t)return t;for(var o=this._bindingGroups,n=0;n<o.length;n++){var r=o[n];if(e>=r._rowstart&&e<=r._rowstart+r._rowspan-1){this._groupsByRow[e]=n;return n}}return-1};_MultiRowLayout.prototype._updateCellTypes=function(e){this._bindingGroups.forEach((function(t){t._updateCellTypes(e)}))};return _MultiRowLayout}();export{_MultiRowLayout};var TransposedMultiRow=function(e){__extends(TransposedMultiRow,e);function TransposedMultiRow(t,o){var n=e.call(this,t)||this;n._currentPos=-1;n._bindingColumns={};n._keyPrefix="item";addClass(n.hostElement,"wj-transposed-multirow");n._layout=new _MultiRowLayout(n,null);n.allowDragging=AllowDragging.None;n.allowSorting=AllowSorting.None;n.mergeManager=new _MergeManager;n.formatItem.addHandler(n._formatItem,n);n._rowInfo=new ColumnCollection(n,n.columns.defaultSize);n.initialize(o);n._rowInfo.collectionChanged.addHandler(n._rowInfoChanged,n);return n}Object.defineProperty(TransposedMultiRow.prototype,"layoutDefinition",{get:function(){return this._layoutDef},set:function(e){this._layoutDef=asArray(e);this._layout=new _MultiRowLayout(this,e);this._rowInfoChanged()},enumerable:!0,configurable:!0});TransposedMultiRow.prototype.getBindingColumn=function(e,t,o){if(e.cellType!=CellType.Cell)return null;var n=e.rows[t].dataItem._rowInfo.index,r=n+"_"+o,l=this._bindingColumns[r];if(l)return l;var i=this._getGroupByRow(t).getBindingColumn(e,n,o);if(i){l=new Column;FlexGrid._getSerializableProperties(Column).forEach((function(e){null!=i[e]&&(l[e]=i[e])}));var s=Math.floor(o/this.columnsPerItem),a=o%this.columnsPerItem;l.binding=this._keyPrefix+s+"_"+a;this._bindingColumns[r]=l}return l};Object.defineProperty(TransposedMultiRow.prototype,"columnsPerItem",{get:function(){return this._layout._columnsPerItem},enumerable:!0,configurable:!0});Object.defineProperty(TransposedMultiRow.prototype,"allowAddNew",{get:function(){return!1},set:function(e){assert(!e,"TransposedMultiRow does not support items addition.")},enumerable:!0,configurable:!0});Object.defineProperty(TransposedMultiRow.prototype,"allowDelete",{get:function(){return!1},set:function(e){assert(!e,"TransposedMultiRow does not support items deletion.")},enumerable:!0,configurable:!0});Object.defineProperty(TransposedMultiRow.prototype,"allowDragging",{get:function(){return AllowDragging.None},set:function(e){assert(e===AllowDragging.None,"TransposedMultiRow does not support dragging.");if(e!==this._alDragging){this._alDragging=e;this.invalidate()}},enumerable:!0,configurable:!0});Object.defineProperty(TransposedMultiRow.prototype,"allowPinning",{get:function(){return!1},set:function(e){assert(!e,"TransposedMultiRow does not support pinning.")},enumerable:!0,configurable:!0});Object.defineProperty(TransposedMultiRow.prototype,"allowSorting",{get:function(){return AllowSorting.None},set:function(e){assert(e===AllowSorting.None,"TransposedMultiRow does not support sorting.");this._alSorting=e},enumerable:!0,configurable:!0});Object.defineProperty(TransposedMultiRow.prototype,"columnLayout",{get:function(){throw"TransposedMultiRow does not support column layout."},set:function(e){throw"TransposedMultiRow does not support column layout."},enumerable:!0,configurable:!0});TransposedMultiRow.prototype.refresh=function(t){var o=this._rowInfo;if(o._dirty){o._dirty=!1;this._rowInfoChanged()}else e.prototype.refresh.call(this,t)};TransposedMultiRow.prototype.onLoadedRows=function(t){for(var o=this,n=this.columnHeaders.columns,r=0;r<n.length;r++)this.columnHeaders.setCellData(0,r,"");var l=this.columns;for(r=0;r<l.length;r++){var i=l[r];i.align=null;i.dataType=0}var s=this.rowHeaders.columns;this.rows.forEach((function(e){var t=e.dataItem._rowInfo;if(t)for(var n=s.length-2;n>=0;n--){var r=t.headers[n]||toHeaderCase(t.bindings[n]);o.rowHeaders.setCellData(e.index,n+1,r)}}));s[0].visible=!1;for(r=1;r<s.length;r++){s[r].align="left";s[r].visible=!0;s[r].width=this.columns.defaultSize}e.prototype.onLoadedRows.call(this,t)};TransposedMultiRow.prototype._getGroupByRow=function(e){var t=this.cells.rows[e].dataItem._rowInfo.index,o=this._layout._getGroupByRow(t);assert(o instanceof _CellGroup,"Failed to get the group!");return o};TransposedMultiRow.prototype._addBoundRow=function(e,t){var o=e[t];this.rows.push(new _MultiRow(o,t))};TransposedMultiRow.prototype._updateColumnTypes=function(){e.prototype._updateColumnTypes.call(this);var t=this.collectionView;if(hasItems(t)&&this._layout){var o=t.items[0]._arr;o&&o.length>0&&this._layout._updateCellTypes(o[0])}};TransposedMultiRow.prototype._getBindingColumn=function(t,o,n){if(this._layout){t==this.cells&&(n=this.getBindingColumn(t,o,n.index));return n}return e.prototype._getBindingColumn.call(this,t,o,n)};TransposedMultiRow.prototype.onRowEditEnded=function(t){if(null!=this._view){var o=new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Change);this._view.collectionChanged.raise(this._view,o)}e.prototype.onRowEditEnded.call(this,t)};TransposedMultiRow.prototype._getCollectionView=function(t){var o=null;null!=this._view&&this._view.collectionChanged.removeHandler(this._sourceViewChanged);if(isArray(t))t=this._transposeItemsSource(t);else if(t){this._view&&this._view.collectionChanged.removeHandler(this._sourceViewChanged);this._view=tryCast(t,"ICollectionView");if(this._view){this._view.collectionChanged.addHandler(this._sourceViewChanged,this);t instanceof CollectionView&&(o=t.getError);t=this._transposeItemsSource(this._view.items)}}this.autoGenerateColumns=!0;var n=e.prototype._getCollectionView.call(this,t);n&&this._currentPos>=0&&(n.currentPosition=Math.min(n.items.length-1,this._currentPos));o&&n instanceof CollectionView&&(n.getError=function(e,t){if(null==t)return null;var n=e._keys.indexOf(t),r=n%e._bnd.length,l=Math.floor(n/e._bnd.length);return o(e._arr[l],e._bnd[r].path)});return n};TransposedMultiRow.prototype._rowInfoChanged=function(){try{var e=this.collectionView;this._currentPos=e?e.currentPosition:-1;var t=this.selection;this._bindingColumns={};var o=this.itemsSource;this.itemsSource=null;this.itemsSource=o;t&&t.isValid&&(this.selection=t)}finally{this._currentPos=-1}};TransposedMultiRow.prototype._formatItem=function(e,t){var o=this.columnsPerItem,n=t.panel,r=n.cellType,l=n.rows[t.range.row],i=(n.rows[t.range.row2],t.cell);r==CellType.RowHeader&&toggleClass(i,"wj-group-header",0==t.range.row);if(r==CellType.Cell||r==CellType.RowHeader){var s=this._getGroupByRow(t.row);toggleClass(i,"wj-group-start",s._rowstart==t.range.row);toggleClass(i,"wj-group-end",s._rowstart+s._rowspan-1==t.range.row2)}if(o>1&&(r==CellType.Cell||r==CellType.ColumnHeader)){toggleClass(i,"wj-record-start",t.range.col%o==0);toggleClass(i,"wj-record-end",t.range.col2%o==o-1)}var a=this.alternatingRowStep;if(a&&r==CellType.Cell){var u=this._layout.totalRowSpan,c=this._layout._bindingGroups.length,p=Math.floor(l.dataIndex/u)*c,_=l.dataIndex%u;p+=this._layout._getGroupIndexByRow(_)+1;toggleClass(i,"wj-alt",p%(a+1)==0)}};TransposedMultiRow.prototype._sourceViewChanged=function(e,t){this.activeEditor||this.invalidate()};TransposedMultiRow.prototype._transposeItemsSource=function(e){var t=this,o=new ObservableArray;if(this._layout&&this._layout._bindingGroups.length){this._getRowInfo(e).forEach((function(n,r){var l=t._createKeys(e);if(t._supportsProxies()){var i=t._createProxy(e,n,l);o.push(i)}else{var s=t._createTransposedObject(e,n,l);o.push(s)}}));e instanceof ObservableArray&&e.collectionChanged.addHandler((function(e,n){if(n.action===NotifyCollectionChangedAction.Change)t.activeEditor||t.invalidate();else{var r=new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset);o.onCollectionChanged(r);t._rowInfoChanged()}}))}return o};TransposedMultiRow.prototype._createKeys=function(e){var t=this,o=Array.apply(null,{length:this.columnsPerItem}),n=e.map((function(e,n){return o.map((function(e,o){return t._keyPrefix+n+"_"+o}))}));return[].concat.apply([],n)};TransposedMultiRow.prototype._supportsProxies=function(){return null!=window.Proxy};TransposedMultiRow.prototype._createProxy=function(e,t,o){var n={_arr:e,_rowInfo:t,_bnd:t.bindings.map((function(e){return new Binding(e)})),_keys:o};return new Proxy(n,{ownKeys:function(e){return e._keys},getOwnPropertyDescriptor:function(){return{enumerable:!0,configurable:!0,writable:!0}},get:function(e,t){var o=e._keys.indexOf(t);if(o>-1){var n=e._bnd,r=e._arr,l=n.length,i=o%l,s=Math.floor(o/l);return n[i].getValue(r[s])}return e[t]},set:function(e,t,o){var n=e._keys.indexOf(t);if(n>-1){var r=e._bnd,l=e._arr,i=r.length,s=n%i,a=Math.floor(n/i);r[s].setValue(l[a],o);if(l instanceof ObservableArray||l instanceof CollectionView){var u=new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Change,l[a],a);l.onCollectionChanged(u)}return!0}return!1}})};TransposedMultiRow.prototype._createTransposedObject=function(e,t,o){for(var n={_arr:e,_rowInfo:t,_bnd:t.bindings.map((function(e){return new Binding(e)})),_keys:o},_loop_1=function(t){var r=o[t];Object.defineProperty(n,r,{enumerable:!0,get:function(){var o=n._bnd,r=o.length,l=t%r,i=Math.floor(t/r);return o[l].getValue(e[i])},set:function(o){var r=n._bnd,l=r.length,i=t%l,s=Math.floor(t/l);r[i].setValue(e[s],o);if(e instanceof ObservableArray){var a=new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Change,e[s],s);e.onCollectionChanged(a)}return!0}})},r=0;r<o.length;r++)_loop_1(r);return n};TransposedMultiRow.prototype._getRowInfo=function(e){var t=[];if(this._layout){for(var o=this.rowHeaders.columns,n=this.columnsPerItem+1;o.length>n;)o.removeAt(o.length-1);for(;o.length<n;)o.push(new Column);this._layout._bindingGroups.forEach((function(e){for(var o=0;o<e.rowspan;o++){for(var n={index:e._rowstart+o,bindings:[],headers:[]},r=0;r<e.colspan;r++)for(var l=0;l<e.cells.length;l++){var i=e.cells[l];if(o>=i.row&&o<i.row+i.rowspan&&r>=i.col&&r<i.col+i.colspan){n.bindings.push(i.binding);n.headers.push(i.header);break}}t.push(n)}}))}return t};return TransposedMultiRow}(FlexGrid);export{TransposedMultiRow};_registerModule("wijmo.grid.transposedmultirow",selfModule);