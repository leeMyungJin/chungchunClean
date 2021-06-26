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

"use strict";var WjBarcodeGs1DataBarOmnidirectional_1,WjBarcodeGs1DataBarTruncated_1,WjBarcodeGs1DataBarStacked_1,WjBarcodeGs1DataBarStackedOmnidirectional_1,WjBarcodeGs1DataBarLimited_1,WjBarcodeGs1DataBarExpanded_1,WjBarcodeGs1DataBarExpandedStacked_1,WjBarcodePdf417_1,WjBarcodeMicroPdf417_1,__decorate=this&&this.__decorate||function(e,a,t,r){var o,i=arguments.length,d=i<3?a:null===r?r=Object.getOwnPropertyDescriptor(a,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,a,t,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(d=(i<3?o(d):i>3?o(a,t,d):o(a,t))||d);return i>3&&d&&Object.defineProperty(a,t,d),d},__param=this&&this.__param||function(e,a){return function(t,r){a(t,r,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(a[t]=e[t]);a.default=e;return a};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcBarcodeComposite=__importStar(require("wijmo/wijmo.barcode.composite"));var wjBarcodeGs1DataBarOmnidirectionalMeta={selector:"wj-barcode-gs1-data-bar-omnidirectional",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarOmnidirectionalMeta=wjBarcodeGs1DataBarOmnidirectionalMeta;let WjBarcodeGs1DataBarOmnidirectional=WjBarcodeGs1DataBarOmnidirectional_1=class WjBarcodeGs1DataBarOmnidirectional extends wjcBarcodeComposite.Gs1DataBarOmnidirectional{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarOmnidirectional.meta={outputs:wjBarcodeGs1DataBarOmnidirectionalMeta.outputs};WjBarcodeGs1DataBarOmnidirectional=WjBarcodeGs1DataBarOmnidirectional_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarOmnidirectionalMeta.selector,template:wjBarcodeGs1DataBarOmnidirectionalMeta.template,inputs:wjBarcodeGs1DataBarOmnidirectionalMeta.inputs,outputs:wjBarcodeGs1DataBarOmnidirectionalMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarOmnidirectional_1)},...wjBarcodeGs1DataBarOmnidirectionalMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarOmnidirectional);exports.WjBarcodeGs1DataBarOmnidirectional=WjBarcodeGs1DataBarOmnidirectional;var wjBarcodeGs1DataBarTruncatedMeta={selector:"wj-barcode-gs1-data-bar-truncated",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarTruncatedMeta=wjBarcodeGs1DataBarTruncatedMeta;let WjBarcodeGs1DataBarTruncated=WjBarcodeGs1DataBarTruncated_1=class WjBarcodeGs1DataBarTruncated extends wjcBarcodeComposite.Gs1DataBarTruncated{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarTruncated.meta={outputs:wjBarcodeGs1DataBarTruncatedMeta.outputs};WjBarcodeGs1DataBarTruncated=WjBarcodeGs1DataBarTruncated_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarTruncatedMeta.selector,template:wjBarcodeGs1DataBarTruncatedMeta.template,inputs:wjBarcodeGs1DataBarTruncatedMeta.inputs,outputs:wjBarcodeGs1DataBarTruncatedMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarTruncated_1)},...wjBarcodeGs1DataBarTruncatedMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarTruncated);exports.WjBarcodeGs1DataBarTruncated=WjBarcodeGs1DataBarTruncated;var wjBarcodeGs1DataBarStackedMeta={selector:"wj-barcode-gs1-data-bar-stacked",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText","ratio"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarStackedMeta=wjBarcodeGs1DataBarStackedMeta;let WjBarcodeGs1DataBarStacked=WjBarcodeGs1DataBarStacked_1=class WjBarcodeGs1DataBarStacked extends wjcBarcodeComposite.Gs1DataBarStacked{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarStacked.meta={outputs:wjBarcodeGs1DataBarStackedMeta.outputs};WjBarcodeGs1DataBarStacked=WjBarcodeGs1DataBarStacked_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarStackedMeta.selector,template:wjBarcodeGs1DataBarStackedMeta.template,inputs:wjBarcodeGs1DataBarStackedMeta.inputs,outputs:wjBarcodeGs1DataBarStackedMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarStacked_1)},...wjBarcodeGs1DataBarStackedMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarStacked);exports.WjBarcodeGs1DataBarStacked=WjBarcodeGs1DataBarStacked;var wjBarcodeGs1DataBarStackedOmnidirectionalMeta={selector:"wj-barcode-gs1-data-bar-stacked-omnidirectional",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText","ratio"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarStackedOmnidirectionalMeta=wjBarcodeGs1DataBarStackedOmnidirectionalMeta;let WjBarcodeGs1DataBarStackedOmnidirectional=WjBarcodeGs1DataBarStackedOmnidirectional_1=class WjBarcodeGs1DataBarStackedOmnidirectional extends wjcBarcodeComposite.Gs1DataBarStackedOmnidirectional{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarStackedOmnidirectional.meta={outputs:wjBarcodeGs1DataBarStackedOmnidirectionalMeta.outputs};WjBarcodeGs1DataBarStackedOmnidirectional=WjBarcodeGs1DataBarStackedOmnidirectional_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarStackedOmnidirectionalMeta.selector,template:wjBarcodeGs1DataBarStackedOmnidirectionalMeta.template,inputs:wjBarcodeGs1DataBarStackedOmnidirectionalMeta.inputs,outputs:wjBarcodeGs1DataBarStackedOmnidirectionalMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarStackedOmnidirectional_1)},...wjBarcodeGs1DataBarStackedOmnidirectionalMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarStackedOmnidirectional);exports.WjBarcodeGs1DataBarStackedOmnidirectional=WjBarcodeGs1DataBarStackedOmnidirectional;var wjBarcodeGs1DataBarLimitedMeta={selector:"wj-barcode-gs1-data-bar-limited",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarLimitedMeta=wjBarcodeGs1DataBarLimitedMeta;let WjBarcodeGs1DataBarLimited=WjBarcodeGs1DataBarLimited_1=class WjBarcodeGs1DataBarLimited extends wjcBarcodeComposite.Gs1DataBarLimited{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarLimited.meta={outputs:wjBarcodeGs1DataBarLimitedMeta.outputs};WjBarcodeGs1DataBarLimited=WjBarcodeGs1DataBarLimited_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarLimitedMeta.selector,template:wjBarcodeGs1DataBarLimitedMeta.template,inputs:wjBarcodeGs1DataBarLimitedMeta.inputs,outputs:wjBarcodeGs1DataBarLimitedMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarLimited_1)},...wjBarcodeGs1DataBarLimitedMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarLimited);exports.WjBarcodeGs1DataBarLimited=WjBarcodeGs1DataBarLimited;var wjBarcodeGs1DataBarExpandedMeta={selector:"wj-barcode-gs1-data-bar-expanded",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText","autoWidth","autoWidthZoom"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarExpandedMeta=wjBarcodeGs1DataBarExpandedMeta;let WjBarcodeGs1DataBarExpanded=WjBarcodeGs1DataBarExpanded_1=class WjBarcodeGs1DataBarExpanded extends wjcBarcodeComposite.Gs1DataBarExpanded{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarExpanded.meta={outputs:wjBarcodeGs1DataBarExpandedMeta.outputs};WjBarcodeGs1DataBarExpanded=WjBarcodeGs1DataBarExpanded_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarExpandedMeta.selector,template:wjBarcodeGs1DataBarExpandedMeta.template,inputs:wjBarcodeGs1DataBarExpandedMeta.inputs,outputs:wjBarcodeGs1DataBarExpandedMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarExpanded_1)},...wjBarcodeGs1DataBarExpandedMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarExpanded);exports.WjBarcodeGs1DataBarExpanded=WjBarcodeGs1DataBarExpanded;var wjBarcodeGs1DataBarExpandedStackedMeta={selector:"wj-barcode-gs1-data-bar-expanded-stacked",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","linkage","linkageVersion","linkageHeight","hideLinkageText","hideAiText","autoWidth","autoWidthZoom","rowCount"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1DataBarExpandedStackedMeta=wjBarcodeGs1DataBarExpandedStackedMeta;let WjBarcodeGs1DataBarExpandedStacked=WjBarcodeGs1DataBarExpandedStacked_1=class WjBarcodeGs1DataBarExpandedStacked extends wjcBarcodeComposite.Gs1DataBarExpandedStacked{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeGs1DataBarExpandedStacked.meta={outputs:wjBarcodeGs1DataBarExpandedStackedMeta.outputs};WjBarcodeGs1DataBarExpandedStacked=WjBarcodeGs1DataBarExpandedStacked_1=__decorate([core_1.Component({selector:wjBarcodeGs1DataBarExpandedStackedMeta.selector,template:wjBarcodeGs1DataBarExpandedStackedMeta.template,inputs:wjBarcodeGs1DataBarExpandedStackedMeta.inputs,outputs:wjBarcodeGs1DataBarExpandedStackedMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1DataBarExpandedStacked_1)},...wjBarcodeGs1DataBarExpandedStackedMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1DataBarExpandedStacked);exports.WjBarcodeGs1DataBarExpandedStacked=WjBarcodeGs1DataBarExpandedStacked;var wjBarcodePdf417Meta={selector:"wj-barcode-pdf417",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","errorCorrectionLevel","columns","rows","compact"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodePdf417Meta=wjBarcodePdf417Meta;let WjBarcodePdf417=WjBarcodePdf417_1=class WjBarcodePdf417 extends wjcBarcodeComposite.Pdf417{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodePdf417.meta={outputs:wjBarcodePdf417Meta.outputs};WjBarcodePdf417=WjBarcodePdf417_1=__decorate([core_1.Component({selector:wjBarcodePdf417Meta.selector,template:wjBarcodePdf417Meta.template,inputs:wjBarcodePdf417Meta.inputs,outputs:wjBarcodePdf417Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodePdf417_1)},...wjBarcodePdf417Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodePdf417);exports.WjBarcodePdf417=WjBarcodePdf417;var wjBarcodeMicroPdf417Meta={selector:"wj-barcode-micro-pdf417",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","dimensions","compactionMode","structuredAppend","segmentIndex","fileId","optionalFields"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeMicroPdf417Meta=wjBarcodeMicroPdf417Meta;let WjBarcodeMicroPdf417=WjBarcodeMicroPdf417_1=class WjBarcodeMicroPdf417 extends wjcBarcodeComposite.MicroPdf417{constructor(e,a,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,a));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,a,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,a,t,r=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[a]?i.runOutsideAngular(()=>{super.addEventListener(e,a,t,r)}):super.addEventListener(e,a,t,r)}};WjBarcodeMicroPdf417.meta={outputs:wjBarcodeMicroPdf417Meta.outputs};WjBarcodeMicroPdf417=WjBarcodeMicroPdf417_1=__decorate([core_1.Component({selector:wjBarcodeMicroPdf417Meta.selector,template:wjBarcodeMicroPdf417Meta.template,inputs:wjBarcodeMicroPdf417Meta.inputs,outputs:wjBarcodeMicroPdf417Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeMicroPdf417_1)},...wjBarcodeMicroPdf417Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeMicroPdf417);exports.WjBarcodeMicroPdf417=WjBarcodeMicroPdf417;let moduleExports=[WjBarcodeGs1DataBarOmnidirectional,WjBarcodeGs1DataBarTruncated,WjBarcodeGs1DataBarStacked,WjBarcodeGs1DataBarStackedOmnidirectional,WjBarcodeGs1DataBarLimited,WjBarcodeGs1DataBarExpanded,WjBarcodeGs1DataBarExpandedStacked,WjBarcodePdf417,WjBarcodeMicroPdf417],WjBarcodeCompositeModule=class WjBarcodeCompositeModule{};WjBarcodeCompositeModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjBarcodeCompositeModule);exports.WjBarcodeCompositeModule=WjBarcodeCompositeModule;