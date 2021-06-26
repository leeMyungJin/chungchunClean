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

var WjMultiRow_1,WjMultiRowCell_1,WjMultiRowCellGroup_1,WjMultiRowCellTemplate_1,__decorate=this&&this.__decorate||function(e,t,o,i){var l,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(l=e[n])&&(a=(r<3?l(a):r>3?l(t,o,a):l(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a},__param=this&&this.__param||function(e,t){return function(o,i){t(o,i,e)}};import{Component,NgModule,ElementRef,Injector,Directive,ViewContainerRef,TemplateRef,Optional,forwardRef,Inject,ChangeDetectorRef,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";import*as wjGrid from"wijmo/wijmo.angular2.grid";var wjMultiRowMeta={selector:"wj-multi-row",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","newRowAtTop","allowAddNew","allowDelete","allowDragging","allowMerging","allowResizing","allowSorting","allowPinning","autoScroll","autoRowHeights","autoSizeMode","autoGenerateColumns","autoSearch","caseSensitiveSearch","quickAutoSize","bigCheckboxes","childItemsPath","groupHeaderFormat","headersVisibility","showSelectedHeaders","showMarquee","showPlaceholders","itemFormatter","isReadOnly","imeEnabled","mergeManager","selectionMode","showGroups","showSort","showDropDown","showAlternatingRows","showErrors","alternatingRowStep","itemValidator","validateEdits","treeIndent","itemsSource","autoClipboard","expandSelectionOnCopyPaste","frozenRows","frozenColumns","cloneFrozenCells","deferResizing","sortRowIndex","editColumnIndex","stickyHeaders","preserveSelectedState","preserveOutlineState","preserveWhiteSpace","keyActionTab","keyActionEnter","rowHeaderPath","virtualizationThreshold","anchorCursor","lazyRender","refreshOnEdit","copyHeaders","columnGroups","layoutDefinition","headerLayoutDefinition","centerHeadersVertically","collapsedHeaders","showHeaderCollapseButton","multiRowGroupHeaders"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","beginningEditNg: beginningEdit","cellEditEndedNg: cellEditEnded","cellEditEndingNg: cellEditEnding","prepareCellForEditNg: prepareCellForEdit","formatItemNg: formatItem","resizingColumnNg: resizingColumn","resizedColumnNg: resizedColumn","autoSizingColumnNg: autoSizingColumn","autoSizedColumnNg: autoSizedColumn","draggingColumnNg: draggingColumn","draggingColumnOverNg: draggingColumnOver","draggedColumnNg: draggedColumn","sortingColumnNg: sortingColumn","sortedColumnNg: sortedColumn","pinningColumnNg: pinningColumn","pinnedColumnNg: pinnedColumn","resizingRowNg: resizingRow","resizedRowNg: resizedRow","autoSizingRowNg: autoSizingRow","autoSizedRowNg: autoSizedRow","draggingRowNg: draggingRow","draggingRowOverNg: draggingRowOver","draggedRowNg: draggedRow","deletingRowNg: deletingRow","deletedRowNg: deletedRow","loadingRowsNg: loadingRows","loadedRowsNg: loadedRows","rowEditStartingNg: rowEditStarting","rowEditStartedNg: rowEditStarted","rowEditEndingNg: rowEditEnding","rowEditEndedNg: rowEditEnded","rowAddedNg: rowAdded","groupCollapsedChangingNg: groupCollapsedChanging","groupCollapsedChangedNg: groupCollapsedChanged","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","selectionChangingNg: selectionChanging","selectionChangedNg: selectionChanged","scrollPositionChangedNg: scrollPositionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView","updatingLayoutNg: updatingLayout","updatedLayoutNg: updatedLayout","pastingNg: pasting","pastedNg: pasted","pastingCellNg: pastingCell","pastedCellNg: pastedCell","copyingNg: copying","copiedNg: copied","collapsedHeadersChangingNg: collapsedHeadersChanging","collapsedHeadersChangedNg: collapsedHeadersChanged","collapsedHeadersChangePC: collapsedHeadersChange"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjMultiRowMeta};let WjMultiRow=WjMultiRow_1=class WjMultiRow extends wjcGridMultirow.MultiRow{constructor(e,t,o,i){super(WjDirectiveBehavior.getHostElement(e,t));this.cdRef=i;this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);new wjGrid.DirectiveCellFactory(this,i);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,i=!1){let l=WjDirectiveBehavior,r=l.getZone(this);r&&l.outsideZoneEvents[t]?r.runOutsideAngular(()=>{super.addEventListener(e,t,o,i)}):super.addEventListener(e,t,o,i)}startEditing(e=!0,t,o,i,l){this._edtFocus=null;let r=super.startEditing(e,t,o,i,l);r&&(this._edtFocus=i||null==i);return r}onCellEditEnding(e){this._edtFocus=null;return super.onCellEditEnding(e)}};WjMultiRow.meta={outputs:wjMultiRowMeta.outputs,changeEvents:{collapsedHeadersChanged:["collapsedHeaders"]}};WjMultiRow=WjMultiRow_1=__decorate([Component({selector:wjMultiRowMeta.selector,template:wjMultiRowMeta.template,inputs:wjMultiRowMeta.inputs,outputs:wjMultiRowMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjMultiRow_1)},...wjMultiRowMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional()),__param(3,Inject(ChangeDetectorRef))],WjMultiRow);export{WjMultiRow};var wjMultiRowCellMeta={selector:"wj-multi-row-cell",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","name","dataMap","dataType","binding","sortMemberPath","format","cellTemplate","header","width","maxLength","minWidth","maxWidth","align","allowDragging","allowSorting","allowResizing","allowMerging","aggregate","isReadOnly","cssClass","isContentHtml","visible","wordWrap","multiLine","mask","inputType","isRequired","showDropDown","dataMapEditor","dropDownCssClass","quickAutoSize","editor","colspan","rowspan"],outputs:["initialized"],providers:[]};export{wjMultiRowCellMeta};let WjMultiRowCell=WjMultiRowCell_1=class WjMultiRowCell extends wjcGridMultirow.MultiRowCell{constructor(e,t,o,i){super();this.cdRef=i;this.isInitialized=!1;this.wjProperty="cells";this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjMultiRowCell.meta={outputs:wjMultiRowCellMeta.outputs};WjMultiRowCell=WjMultiRowCell_1=__decorate([Component({selector:wjMultiRowCellMeta.selector,template:wjMultiRowCellMeta.template,inputs:wjMultiRowCellMeta.inputs,outputs:wjMultiRowCellMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjMultiRowCell_1)},...wjMultiRowCellMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional()),__param(3,Inject(ChangeDetectorRef))],WjMultiRowCell);export{WjMultiRowCell};var wjMultiRowCellGroupMeta={selector:"wj-multi-row-cell-group",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","name","dataMap","dataType","binding","sortMemberPath","format","cellTemplate","header","width","maxLength","minWidth","maxWidth","align","allowDragging","allowSorting","allowResizing","allowMerging","aggregate","isReadOnly","cssClass","isContentHtml","visible","wordWrap","multiLine","mask","inputType","isRequired","showDropDown","dataMapEditor","dropDownCssClass","quickAutoSize","editor","colspan","rowspan"],outputs:["initialized"],providers:[]};export{wjMultiRowCellGroupMeta};let WjMultiRowCellGroup=WjMultiRowCellGroup_1=class WjMultiRowCellGroup extends wjcGridMultirow.MultiRowCellGroup{constructor(e,t,o,i){super();this.cdRef=i;this.isInitialized=!1;this.wjProperty="layoutDefinition";this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjMultiRowCellGroup.meta={outputs:wjMultiRowCellGroupMeta.outputs};WjMultiRowCellGroup=WjMultiRowCellGroup_1=__decorate([Component({selector:wjMultiRowCellGroupMeta.selector,template:wjMultiRowCellGroupMeta.template,inputs:wjMultiRowCellGroupMeta.inputs,outputs:wjMultiRowCellGroupMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjMultiRowCellGroup_1)},...wjMultiRowCellGroupMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional()),__param(3,Inject(ChangeDetectorRef))],WjMultiRowCellGroup);export{WjMultiRowCellGroup};let WjMultiRowCellTemplate=WjMultiRowCellTemplate_1=class WjMultiRowCellTemplate extends wjGrid.WjFlexGridCellTemplate{constructor(e,t,o,i,l,r){super(e,t,o,i,l,r)}};WjMultiRowCellTemplate=WjMultiRowCellTemplate_1=__decorate([Directive({selector:"[wjMultiRowCellTemplate]",inputs:["wjMultiRowCellTemplate","cellTypeStr: cellType","cellOverflow","valuePaths","autoSizeRows","forceFullEdit"],exportAs:"wjMultiRowCellTemplate",providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjMultiRowCellTemplate_1)}]}),__param(0,Inject(ViewContainerRef)),__param(1,Inject(TemplateRef)),__param(1,Optional()),__param(2,Inject(ElementRef)),__param(3,Inject("WjComponent")),__param(3,SkipSelf()),__param(3,Optional()),__param(4,Inject(Injector)),__param(5,Inject(ChangeDetectorRef))],WjMultiRowCellTemplate);export{WjMultiRowCellTemplate};let moduleExports=[WjMultiRow,WjMultiRowCell,WjMultiRowCellGroup,WjMultiRowCellTemplate],WjGridMultirowModule=class WjGridMultirowModule{};WjGridMultirowModule=__decorate([NgModule({imports:[CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridMultirowModule);export{WjGridMultirowModule};