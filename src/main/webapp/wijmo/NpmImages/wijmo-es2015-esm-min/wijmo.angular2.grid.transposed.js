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

var WjTransposedGrid_1,WjTransposedGridRow_1,__decorate=this&&this.__decorate||function(e,o,r,t){var i,n=arguments.length,a=n<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,o,r,t);else for(var d=e.length-1;d>=0;d--)(i=e[d])&&(a=(n<3?i(a):n>3?i(o,r,a):i(o,r))||a);return n>3&&a&&Object.defineProperty(o,r,a),a},__param=this&&this.__param||function(e,o){return function(r,t){o(r,t,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcGridTransposed from"wijmo/wijmo.grid.transposed";var wjTransposedGridMeta={selector:"wj-transposed-grid",template:"<div><ng-content></ng-content></div>",inputs:["wjModelProperty","autoGenerateRows","isDisabled","newRowAtTop","allowAddNew","allowDelete","allowDragging","allowMerging","allowResizing","allowSorting","allowPinning","autoScroll","autoRowHeights","autoSizeMode","autoGenerateColumns","autoSearch","caseSensitiveSearch","quickAutoSize","bigCheckboxes","childItemsPath","groupHeaderFormat","headersVisibility","showSelectedHeaders","showMarquee","showPlaceholders","itemFormatter","isReadOnly","imeEnabled","mergeManager","selectionMode","showGroups","showSort","showDropDown","showAlternatingRows","showErrors","alternatingRowStep","itemValidator","validateEdits","treeIndent","itemsSource","autoClipboard","expandSelectionOnCopyPaste","frozenRows","frozenColumns","cloneFrozenCells","deferResizing","sortRowIndex","editColumnIndex","stickyHeaders","preserveSelectedState","preserveOutlineState","preserveWhiteSpace","keyActionTab","keyActionEnter","rowHeaderPath","virtualizationThreshold","anchorCursor","lazyRender","refreshOnEdit","copyHeaders","columnGroups","rowGroups"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","beginningEditNg: beginningEdit","cellEditEndedNg: cellEditEnded","cellEditEndingNg: cellEditEnding","prepareCellForEditNg: prepareCellForEdit","formatItemNg: formatItem","resizingColumnNg: resizingColumn","resizedColumnNg: resizedColumn","autoSizingColumnNg: autoSizingColumn","autoSizedColumnNg: autoSizedColumn","draggingColumnNg: draggingColumn","draggingColumnOverNg: draggingColumnOver","draggedColumnNg: draggedColumn","sortingColumnNg: sortingColumn","sortedColumnNg: sortedColumn","pinningColumnNg: pinningColumn","pinnedColumnNg: pinnedColumn","resizingRowNg: resizingRow","resizedRowNg: resizedRow","autoSizingRowNg: autoSizingRow","autoSizedRowNg: autoSizedRow","draggingRowNg: draggingRow","draggingRowOverNg: draggingRowOver","draggedRowNg: draggedRow","deletingRowNg: deletingRow","deletedRowNg: deletedRow","loadingRowsNg: loadingRows","loadedRowsNg: loadedRows","rowEditStartingNg: rowEditStarting","rowEditStartedNg: rowEditStarted","rowEditEndingNg: rowEditEnding","rowEditEndedNg: rowEditEnded","rowAddedNg: rowAdded","groupCollapsedChangingNg: groupCollapsedChanging","groupCollapsedChangedNg: groupCollapsedChanged","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","selectionChangingNg: selectionChanging","selectionChangedNg: selectionChanged","scrollPositionChangedNg: scrollPositionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView","updatingLayoutNg: updatingLayout","updatedLayoutNg: updatedLayout","pastingNg: pasting","pastedNg: pasted","pastingCellNg: pastingCell","pastedCellNg: pastedCell","copyingNg: copying","copiedNg: copied"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjTransposedGridMeta};let WjTransposedGrid=WjTransposedGrid_1=class WjTransposedGrid extends wjcGridTransposed.TransposedGrid{constructor(e,o,r){super(WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let i=WjDirectiveBehavior,n=i.getZone(this);n&&i.outsideZoneEvents[o]?n.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjTransposedGrid.meta={outputs:wjTransposedGridMeta.outputs};WjTransposedGrid=WjTransposedGrid_1=__decorate([Component({selector:wjTransposedGridMeta.selector,template:wjTransposedGridMeta.template,inputs:wjTransposedGridMeta.inputs,outputs:wjTransposedGridMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTransposedGrid_1)},...wjTransposedGridMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTransposedGrid);export{WjTransposedGrid};var wjTransposedGridRowMeta={selector:"wj-transposed-grid-row",template:"",inputs:["asyncBindings","wjProperty","name","dataMap","dataType","binding","sortMemberPath","format","cellTemplate","header","width","maxLength","minWidth","maxWidth","align","allowDragging","allowSorting","allowResizing","allowMerging","aggregate","isReadOnly","cssClass","isContentHtml","isSelected","visible","wordWrap","multiLine","mask","inputType","isRequired","showDropDown","dataMapEditor","dropDownCssClass","quickAutoSize","editor"],outputs:["initialized","isSelectedChangePC: isSelectedChange"],providers:[]};export{wjTransposedGridRowMeta};let WjTransposedGridRow=WjTransposedGridRow_1=class WjTransposedGridRow extends wjcGridTransposed.TransposedGridRow{constructor(e,o,r){super();this.isInitialized=!1;this.wjProperty="_rowInfo";let t=(this._wjBehaviour=WjDirectiveBehavior.attach(this,e,o,r)).parentBehavior.directive;if(t.autoGenerateRows){t.autoGenerateRows=!1;t._rowInfo.clear()}this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjTransposedGridRow.meta={outputs:wjTransposedGridRowMeta.outputs,changeEvents:{"grid.selectionChanged":["isSelected"]}};WjTransposedGridRow=WjTransposedGridRow_1=__decorate([Component({selector:wjTransposedGridRowMeta.selector,template:wjTransposedGridRowMeta.template,inputs:wjTransposedGridRowMeta.inputs,outputs:wjTransposedGridRowMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTransposedGridRow_1)},...wjTransposedGridRowMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTransposedGridRow);export{WjTransposedGridRow};let moduleExports=[WjTransposedGrid,WjTransposedGridRow],WjGridTransposedModule=class WjGridTransposedModule{};WjGridTransposedModule=__decorate([NgModule({imports:[CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridTransposedModule);export{WjGridTransposedModule};