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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}(),__decorate=this&&this.__decorate||function(e,t,o,i){var r,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,o,a):r(t,o))||a);return n>3&&a&&Object.defineProperty(t,o,a),a},__param=this&&this.__param||function(e,t){return function(o,i){t(o,i,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.hasOwnProperty.call(e,o)&&(t[o]=e[o]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcOlap=__importStar(require("wijmo/wijmo.olap")),wjPivotGridMeta={selector:"wj-pivot-grid",template:"",inputs:["wjModelProperty","isDisabled","newRowAtTop","allowAddNew","allowDelete","allowDragging","allowMerging","allowResizing","allowSorting","allowPinning","autoScroll","autoRowHeights","autoSizeMode","autoGenerateColumns","autoSearch","caseSensitiveSearch","quickAutoSize","bigCheckboxes","childItemsPath","groupHeaderFormat","headersVisibility","showSelectedHeaders","showMarquee","showPlaceholders","itemFormatter","isReadOnly","imeEnabled","mergeManager","selectionMode","showGroups","showSort","showDropDown","showAlternatingRows","showErrors","alternatingRowStep","itemValidator","validateEdits","treeIndent","itemsSource","autoClipboard","expandSelectionOnCopyPaste","frozenRows","frozenColumns","cloneFrozenCells","deferResizing","sortRowIndex","editColumnIndex","stickyHeaders","preserveSelectedState","preserveOutlineState","preserveWhiteSpace","keyActionTab","keyActionEnter","rowHeaderPath","virtualizationThreshold","anchorCursor","lazyRender","refreshOnEdit","copyHeaders","columnGroups","showDetailOnDoubleClick","customContextMenu","collapsibleSubtotals","centerHeadersVertically","showColumnFieldHeaders","showRowFieldHeaders","showValueFieldHeaders","outlineMode"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","beginningEditNg: beginningEdit","cellEditEndedNg: cellEditEnded","cellEditEndingNg: cellEditEnding","prepareCellForEditNg: prepareCellForEdit","formatItemNg: formatItem","resizingColumnNg: resizingColumn","resizedColumnNg: resizedColumn","autoSizingColumnNg: autoSizingColumn","autoSizedColumnNg: autoSizedColumn","draggingColumnNg: draggingColumn","draggingColumnOverNg: draggingColumnOver","draggedColumnNg: draggedColumn","sortingColumnNg: sortingColumn","sortedColumnNg: sortedColumn","pinningColumnNg: pinningColumn","pinnedColumnNg: pinnedColumn","resizingRowNg: resizingRow","resizedRowNg: resizedRow","autoSizingRowNg: autoSizingRow","autoSizedRowNg: autoSizedRow","draggingRowNg: draggingRow","draggingRowOverNg: draggingRowOver","draggedRowNg: draggedRow","deletingRowNg: deletingRow","deletedRowNg: deletedRow","loadingRowsNg: loadingRows","loadedRowsNg: loadedRows","rowEditStartingNg: rowEditStarting","rowEditStartedNg: rowEditStarted","rowEditEndingNg: rowEditEnding","rowEditEndedNg: rowEditEnded","rowAddedNg: rowAdded","groupCollapsedChangingNg: groupCollapsedChanging","groupCollapsedChangedNg: groupCollapsedChanged","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","selectionChangingNg: selectionChanging","selectionChangedNg: selectionChanged","scrollPositionChangedNg: scrollPositionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView","updatingLayoutNg: updatingLayout","updatedLayoutNg: updatedLayout","pastingNg: pasting","pastedNg: pasted","pastingCellNg: pastingCell","pastedCellNg: pastedCell","copyingNg: copying","copiedNg: copied"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjPivotGridMeta=wjPivotGridMeta;var WjPivotGrid=function(e){__extends(WjPivotGrid,e);function WjPivotGrid(t,o,i){var r=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(t,o))||this;r.isInitialized=!1;r._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(r,t,o,i);r.created();return r}t=WjPivotGrid;WjPivotGrid.prototype.created=function(){};WjPivotGrid.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()};WjPivotGrid.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()};WjPivotGrid.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()};WjPivotGrid.prototype.addEventListener=function(t,o,i,r){var n=this;void 0===r&&(r=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,s=a.getZone(this);s&&a.outsideZoneEvents[o]?s.runOutsideAngular((function(){e.prototype.addEventListener.call(n,t,o,i,r)})):e.prototype.addEventListener.call(this,t,o,i,r)};var t;WjPivotGrid.meta={outputs:wjPivotGridMeta.outputs};return WjPivotGrid=t=__decorate([core_1.Component({selector:wjPivotGridMeta.selector,template:wjPivotGridMeta.template,inputs:wjPivotGridMeta.inputs,outputs:wjPivotGridMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef((function(){return t}))}].concat(wjPivotGridMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjPivotGrid)}(wjcOlap.PivotGrid);exports.WjPivotGrid=WjPivotGrid;var wjPivotChartMeta={selector:"wj-pivot-chart",template:"",inputs:["wjModelProperty","isDisabled","chartType","showHierarchicalAxes","showTotals","showTitle","showLegend","legendPosition","stacking","maxSeries","maxPoints","itemsSource","header","footer","headerStyle","footerStyle"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjPivotChartMeta=wjPivotChartMeta;var WjPivotChart=function(e){__extends(WjPivotChart,e);function WjPivotChart(t,o,i){var r=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(t,o))||this;r.isInitialized=!1;r._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(r,t,o,i);r.created();return r}t=WjPivotChart;WjPivotChart.prototype.created=function(){};WjPivotChart.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()};WjPivotChart.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()};WjPivotChart.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()};WjPivotChart.prototype.addEventListener=function(t,o,i,r){var n=this;void 0===r&&(r=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,s=a.getZone(this);s&&a.outsideZoneEvents[o]?s.runOutsideAngular((function(){e.prototype.addEventListener.call(n,t,o,i,r)})):e.prototype.addEventListener.call(this,t,o,i,r)};var t;WjPivotChart.meta={outputs:wjPivotChartMeta.outputs};return WjPivotChart=t=__decorate([core_1.Component({selector:wjPivotChartMeta.selector,template:wjPivotChartMeta.template,inputs:wjPivotChartMeta.inputs,outputs:wjPivotChartMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef((function(){return t}))}].concat(wjPivotChartMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjPivotChart)}(wjcOlap.PivotChart);exports.WjPivotChart=WjPivotChart;var wjPivotPanelMeta={selector:"wj-pivot-panel",template:"",inputs:["wjModelProperty","isDisabled","autoGenerateFields","viewDefinition","engine","itemsSource","showFieldIcons","restrictDragging"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","itemsSourceChangedNg: itemsSourceChanged","viewDefinitionChangedNg: viewDefinitionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjPivotPanelMeta=wjPivotPanelMeta;var WjPivotPanel=function(e){__extends(WjPivotPanel,e);function WjPivotPanel(t,o,i){var r=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(t,o))||this;r.isInitialized=!1;r._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(r,t,o,i);r.created();return r}t=WjPivotPanel;WjPivotPanel.prototype.created=function(){};WjPivotPanel.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()};WjPivotPanel.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()};WjPivotPanel.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()};WjPivotPanel.prototype.addEventListener=function(t,o,i,r){var n=this;void 0===r&&(r=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,s=a.getZone(this);s&&a.outsideZoneEvents[o]?s.runOutsideAngular((function(){e.prototype.addEventListener.call(n,t,o,i,r)})):e.prototype.addEventListener.call(this,t,o,i,r)};var t;WjPivotPanel.meta={outputs:wjPivotPanelMeta.outputs};return WjPivotPanel=t=__decorate([core_1.Component({selector:wjPivotPanelMeta.selector,template:wjPivotPanelMeta.template,inputs:wjPivotPanelMeta.inputs,outputs:wjPivotPanelMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef((function(){return t}))}].concat(wjPivotPanelMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjPivotPanel)}(wjcOlap.PivotPanel);exports.WjPivotPanel=WjPivotPanel;var wjSlicerMeta={selector:"wj-slicer",template:"",inputs:["wjModelProperty","isDisabled","field","showHeader","header","showCheckboxes","multiSelect"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjSlicerMeta=wjSlicerMeta;var WjSlicer=function(e){__extends(WjSlicer,e);function WjSlicer(t,o,i){var r=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(t,o))||this;r.isInitialized=!1;r._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(r,t,o,i);r.created();return r}t=WjSlicer;WjSlicer.prototype.created=function(){};WjSlicer.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()};WjSlicer.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()};WjSlicer.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()};WjSlicer.prototype.addEventListener=function(t,o,i,r){var n=this;void 0===r&&(r=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,s=a.getZone(this);s&&a.outsideZoneEvents[o]?s.runOutsideAngular((function(){e.prototype.addEventListener.call(n,t,o,i,r)})):e.prototype.addEventListener.call(this,t,o,i,r)};var t;WjSlicer.meta={outputs:wjSlicerMeta.outputs};return WjSlicer=t=__decorate([core_1.Component({selector:wjSlicerMeta.selector,template:wjSlicerMeta.template,inputs:wjSlicerMeta.inputs,outputs:wjSlicerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef((function(){return t}))}].concat(wjSlicerMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjSlicer)}(wjcOlap.Slicer);exports.WjSlicer=WjSlicer;var moduleExports=[WjPivotGrid,WjPivotChart,WjPivotPanel,WjSlicer],WjOlapModule=function(){function WjOlapModule(){}return WjOlapModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],WjOlapModule)}();exports.WjOlapModule=WjOlapModule;