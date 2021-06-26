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

import{assert,asType,hasClass,createElement,asBoolean,setChecked,isString,isNumber,copy,closestClass,CollectionView,Event,CancelEventArgs,DataType,_registerModule}from"wijmo/wijmo";import{FlexGrid,Column,GroupRow,CellRange,CellFactory,CellEditEndingEventArgs,SelectionMode,HeadersVisibility}from"wijmo/wijmo.grid";import*as selfModule from"wijmo/wijmo.grid.selector";const _CLS_CB_ITEM="wj-column-selector",_CLS_CB_GROUP="wj-column-selector-group";export class Selector{constructor(e,t){this._col=null;this._grid=null;this._isFixedCol=!1;this._isBound=!1;this._showCheckAll=!0;this._clickBnd=this._click.bind(this);this._mousedownBnd=this._mousedown.bind(this);this.columnChanging=new Event;this.columnChanged=new Event;this.itemChecked=new Event;this._initialize();this.column=this._getColumn(e);copy(this,t)}get column(){return this._col}set column(e){if((e=this._getColumn(e))!=this._col&&this.onColumnChanging(new CancelEventArgs)){let t=this._grid;if(t){let e=t.hostElement;t.formatItem.removeHandler(this._formatItem,this);t.removeEventListener(e,"click",this._clickBnd);t.removeEventListener(e,"mousedown",this._mousedownBnd)}let i=this._col=asType(e,Column,!0);this._grid=t=i?i.grid:null;this._isFixedCol=!!t&&t.columns.indexOf(i)<0;i&&!this._isBound&&(i.allowMerging=!1);t&&!this._isBound&&(t.selectionMode=SelectionMode.Cell);if(t){let e=t.hostElement;t.formatItem.addHandler(this._formatItem,this);t.addEventListener(e,"click",this._clickBnd,!0);t.addEventListener(e,"mousedown",this._mousedownBnd,!0)}this.onColumnChanged()}}get showCheckAll(){return this._showCheckAll}set showCheckAll(e){if(e!=this._showCheckAll){this._showCheckAll=asBoolean(e);this._grid&&this._grid.invalidate()}}onColumnChanging(e){this.columnChanging.raise(this,e);return!e.cancel}onColumnChanged(e){this.columnChanged.raise(this,e)}onItemChecked(e){this.itemChecked.raise(this,e)}_initialize(){}_click(e){if(!e.defaultPrevented&&e.target instanceof HTMLElement){let t=this._grid,i=this._col,s=e.target,l=t.hitTest(s);if(i&&l&&l.getColumn()==i){if(s instanceof HTMLInputElement&&hasClass(s,_CLS_CB_ITEM)){let o,n=l.panel.rows,r=n[l.range.topRow];if(n==t.columnHeaders.rows){o=new CellRange(0,0,t.rows.length-1,0);if(this._isBound){let e=t.selection;e.col=e.col2=i.index;t.select(e)}}else o=this._isGroupRow(r)?r.getCellRange():l.range;if(o.isValid){this._setRangeChecked(s.checked,o);this.onItemChecked()}t.invalidate();e.preventDefault();return}if(hasClass(s,"wj-cell")&&t.bigCheckboxes&&this._isBound&&(this._isFixedCol||this._isGroupRow(l.getRow()))){let t=s.querySelector("input."+_CLS_CB_ITEM);if(t instanceof HTMLInputElement){t.click();e.preventDefault()}}}}}_mousedown(e){let t=this._grid,i=this._col,s=t.editableCollectionView;if(this._isBound&&i&&s&&s.currentEditItem){let s=t.hitTest(e);if(s.getColumn()==i&&this._isGroupRow(s.getRow())){let t=closestClass(e.target,_CLS_CB_GROUP);t instanceof HTMLInputElement&&t.click()}}}_isGroupRow(e){return e instanceof GroupRow&&(!this._grid.childItemsPath||e.getCellRange().rowSpan>1)}_getRowChecked(e,t=e){let i=0,s=0,l=this._col._binding;for(let o=e;o<=t&&(!i||!s);o++){let e=this._grid.rows[o],t=e.dataItem;if(t&&!this._isGroupRow(e)){(this._isBound?l.getValue(t):e.isSelected)?i++:s++}}return!(!i||s)||!(s&&!i)&&null}_setRangeChecked(e,t){let i=this._grid,s=i.rows,l=this._col,o=l?l._binding:null,n=i.selection,r=this._isBound?i.editableCollectionView:null;if(this._isBound&&(i.isReadOnly||!r||!o))return;let d=!1;if(r){let e=!0;r instanceof CollectionView&&!r.refreshOnEdit&&(e=!1);if(e){d=!0;r.beginUpdate()}}i.deferUpdate(()=>{for(let n=t.bottomRow;n>=t.topRow;n--){let t=s[n],d=t.dataItem;if(d)if(this._isGroupRow(t))i.childItemsPath&&!this._isBound&&(t.isSelected=e);else if(this._isBound){if(d[l.binding]!=e){r&&r.editItem(d);let t=new CellRange(n,l.index),s=new CellEditEndingEventArgs(i.cells,t,d[l.binding]);if(i.onCellEditEnding(s)){o.setValue(d,e);i.onCellEditEnded(s)}}}else t.isSelected=e}});if(r){r.commitEdit();d&&r.endUpdate();i.selection=n}}_formatItem(e,t){let i=t.getColumn(),s=e.editRange;if(i&&i==this._col&&(!s||!s.contains(t.row,t.col))&&t.panel.rows!=e.columnFooters.rows){let s,l=t.getRow(),o=t.cell,n="";if(t.panel.rows==e.columnHeaders.rows){if(this._showCheckAll&&t.range.bottomRow==t.panel.rows.length-1){s=this._getRowChecked(0,e.rows.length-1);n=_CLS_CB_ITEM+" "+_CLS_CB_GROUP}}else if(this._isGroupRow(l)){let e=l.getCellRange();s=this._getRowChecked(e.row,e.row2);n=_CLS_CB_ITEM+" "+_CLS_CB_GROUP}else if(l.dataItem&&!this._isBound){s=this._getRowChecked(t.row);n=_CLS_CB_ITEM}if(n){if(this._isFixedCol||this._isBound&&this._isGroupRow(l)&&i.aggregate&&i.index>e.columns.firstVisibleIndex){let e=o.querySelector("."+CellFactory._WJC_COLLAPSE);o.textContent="";e&&o.appendChild(e)}let t=createElement('<label><input type="checkbox" class="'+n+'" tabindex="-1"><span></span></label>'),r=t.querySelector("input");setChecked(r,s);if(this._isBound&&(i.isReadOnly||e.selectionMode==SelectionMode.None)){r.disabled=!0;r.style.cursor="default"}o.insertBefore(t,o.firstChild)}}}_getColumn(e){if(e instanceof FlexGrid){let t=e,i=t.rowHeaders.columns;e=t.headersVisibility&HeadersVisibility.Row&&i.length?i[0]:t.columns[0]}this._grid&&(isString(e)||isNumber(e))&&(e=this._grid.getColumn(e));return e instanceof Column?e:null}}export class BooleanChecker extends Selector{constructor(e,t){super(e,t)}onColumnChanged(e){let t=this.column,i=t?t.dataType:null;assert(!t||null==i||i==DataType.Boolean,"BooleanChecker should be bound to boolean columns");super.onColumnChanged(e)}_initialize(){this._isBound=!0}}_registerModule("wijmo.grid.selector",selfModule);