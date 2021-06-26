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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(e,o){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var r in o)o.hasOwnProperty(r)&&(e[r]=o[r])})(e,o)};return function(e,o){extendStatics(e,o);function __(){this.constructor=e}e.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}(),__decorate=this&&this.__decorate||function(e,o,r,t){var n,i=arguments.length,a=i<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,o,r,t);else for(var d=e.length-1;d>=0;d--)(n=e[d])&&(a=(i<3?n(a):i>3?n(o,r,a):n(o,r))||a);return i>3&&a&&Object.defineProperty(o,r,a),a},__param=this&&this.__param||function(e,o){return function(r,t){o(r,t,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(o[r]=e[r]);o.default=e;return o};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcViewer=__importStar(require("wijmo/wijmo.viewer")),wjReportViewerMeta={selector:"wj-report-viewer",template:"",inputs:["asyncBindings","wjModelProperty","isDisabled","serviceUrl","filePath","fullScreen","zoomFactor","zoomMode","mouseMode","viewMode","requestHeaders","parameters","paginated","reportName"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","pageIndexChangedNg: pageIndexChanged","viewModeChangedNg: viewModeChanged","viewModeChangePC: viewModeChange","mouseModeChangedNg: mouseModeChanged","mouseModeChangePC: mouseModeChange","fullScreenChangedNg: fullScreenChanged","fullScreenChangePC: fullScreenChange","zoomFactorChangedNg: zoomFactorChanged","zoomFactorChangePC: zoomFactorChange","zoomModeChangedNg: zoomModeChanged","zoomModeChangePC: zoomModeChange","queryLoadingDataNg: queryLoadingData","beforeSendRequestNg: beforeSendRequest"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjReportViewerMeta=wjReportViewerMeta;var WjReportViewer=function(e){__extends(WjReportViewer,e);function WjReportViewer(o,r,t){var n=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(o,r))||this;n.isInitialized=!1;n._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(n,o,r,t);n.created();return n}o=WjReportViewer;WjReportViewer.prototype.created=function(){};WjReportViewer.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()};WjReportViewer.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()};WjReportViewer.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()};WjReportViewer.prototype.addEventListener=function(o,r,t,n){var i=this;void 0===n&&(n=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,d=a.getZone(this);d&&a.outsideZoneEvents[r]?d.runOutsideAngular((function(){e.prototype.addEventListener.call(i,o,r,t,n)})):e.prototype.addEventListener.call(this,o,r,t,n)};var o;WjReportViewer.meta={outputs:wjReportViewerMeta.outputs,changeEvents:{viewModeChanged:["viewMode"],mouseModeChanged:["mouseMode"],fullScreenChanged:["fullScreen"],zoomFactorChanged:["zoomFactor"],zoomModeChanged:["zoomMode"]}};return WjReportViewer=o=__decorate([core_1.Component({selector:wjReportViewerMeta.selector,template:wjReportViewerMeta.template,inputs:wjReportViewerMeta.inputs,outputs:wjReportViewerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef((function(){return o}))}].concat(wjReportViewerMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjReportViewer)}(wjcViewer.ReportViewer);exports.WjReportViewer=WjReportViewer;var wjPdfViewerMeta={selector:"wj-pdf-viewer",template:"",inputs:["asyncBindings","wjModelProperty","isDisabled","serviceUrl","filePath","fullScreen","zoomFactor","zoomMode","mouseMode","viewMode","requestHeaders"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","pageIndexChangedNg: pageIndexChanged","viewModeChangedNg: viewModeChanged","viewModeChangePC: viewModeChange","mouseModeChangedNg: mouseModeChanged","mouseModeChangePC: mouseModeChange","fullScreenChangedNg: fullScreenChanged","fullScreenChangePC: fullScreenChange","zoomFactorChangedNg: zoomFactorChanged","zoomFactorChangePC: zoomFactorChange","zoomModeChangedNg: zoomModeChanged","zoomModeChangePC: zoomModeChange","queryLoadingDataNg: queryLoadingData","beforeSendRequestNg: beforeSendRequest"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjPdfViewerMeta=wjPdfViewerMeta;var WjPdfViewer=function(e){__extends(WjPdfViewer,e);function WjPdfViewer(o,r,t){var n=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(o,r))||this;n.isInitialized=!1;n._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(n,o,r,t);n.created();return n}o=WjPdfViewer;WjPdfViewer.prototype.created=function(){};WjPdfViewer.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()};WjPdfViewer.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()};WjPdfViewer.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()};WjPdfViewer.prototype.addEventListener=function(o,r,t,n){var i=this;void 0===n&&(n=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,d=a.getZone(this);d&&a.outsideZoneEvents[r]?d.runOutsideAngular((function(){e.prototype.addEventListener.call(i,o,r,t,n)})):e.prototype.addEventListener.call(this,o,r,t,n)};var o;WjPdfViewer.meta={outputs:wjPdfViewerMeta.outputs,changeEvents:{viewModeChanged:["viewMode"],mouseModeChanged:["mouseMode"],fullScreenChanged:["fullScreen"],zoomFactorChanged:["zoomFactor"],zoomModeChanged:["zoomMode"]}};return WjPdfViewer=o=__decorate([core_1.Component({selector:wjPdfViewerMeta.selector,template:wjPdfViewerMeta.template,inputs:wjPdfViewerMeta.inputs,outputs:wjPdfViewerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef((function(){return o}))}].concat(wjPdfViewerMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjPdfViewer)}(wjcViewer.PdfViewer);exports.WjPdfViewer=WjPdfViewer;var moduleExports=[WjReportViewer,WjPdfViewer],WjViewerModule=function(){function WjViewerModule(){}return WjViewerModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],WjViewerModule)}();exports.WjViewerModule=WjViewerModule;