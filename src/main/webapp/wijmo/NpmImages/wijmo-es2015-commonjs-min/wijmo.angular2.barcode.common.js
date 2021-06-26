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

"use strict";var WjBarcodeCodabar_1,WjBarcodeEan8_1,WjBarcodeEan13_1,WjBarcodeCode39_1,WjBarcodeCode128_1,WjBarcodeGs1_128_1,WjBarcodeUpcA_1,WjBarcodeUpcE0_1,WjBarcodeUpcE1_1,WjBarcodeQrCode_1,__decorate=this&&this.__decorate||function(e,o,r,t){var a,i=arguments.length,c=i<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,o,r,t);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(c=(i<3?a(c):i>3?a(o,r,c):a(o,r))||c);return i>3&&c&&Object.defineProperty(o,r,c),c},__param=this&&this.__param||function(e,o){return function(r,t){o(r,t,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(o[r]=e[r]);o.default=e;return o};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcBarcodeCommon=__importStar(require("wijmo/wijmo.barcode.common"));var wjBarcodeCodabarMeta={selector:"wj-barcode-codabar",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","checkDigit","labelPosition","nwRatio"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeCodabarMeta=wjBarcodeCodabarMeta;let WjBarcodeCodabar=WjBarcodeCodabar_1=class WjBarcodeCodabar extends wjcBarcodeCommon.Codabar{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeCodabar.meta={outputs:wjBarcodeCodabarMeta.outputs};WjBarcodeCodabar=WjBarcodeCodabar_1=__decorate([core_1.Component({selector:wjBarcodeCodabarMeta.selector,template:wjBarcodeCodabarMeta.template,inputs:wjBarcodeCodabarMeta.inputs,outputs:wjBarcodeCodabarMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeCodabar_1)},...wjBarcodeCodabarMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeCodabar);exports.WjBarcodeCodabar=WjBarcodeCodabar;var wjBarcodeEan8Meta={selector:"wj-barcode-ean8",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeEan8Meta=wjBarcodeEan8Meta;let WjBarcodeEan8=WjBarcodeEan8_1=class WjBarcodeEan8 extends wjcBarcodeCommon.Ean8{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeEan8.meta={outputs:wjBarcodeEan8Meta.outputs};WjBarcodeEan8=WjBarcodeEan8_1=__decorate([core_1.Component({selector:wjBarcodeEan8Meta.selector,template:wjBarcodeEan8Meta.template,inputs:wjBarcodeEan8Meta.inputs,outputs:wjBarcodeEan8Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeEan8_1)},...wjBarcodeEan8Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeEan8);exports.WjBarcodeEan8=WjBarcodeEan8;var wjBarcodeEan13Meta={selector:"wj-barcode-ean13",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","addOn","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeEan13Meta=wjBarcodeEan13Meta;let WjBarcodeEan13=WjBarcodeEan13_1=class WjBarcodeEan13 extends wjcBarcodeCommon.Ean13{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeEan13.meta={outputs:wjBarcodeEan13Meta.outputs};WjBarcodeEan13=WjBarcodeEan13_1=__decorate([core_1.Component({selector:wjBarcodeEan13Meta.selector,template:wjBarcodeEan13Meta.template,inputs:wjBarcodeEan13Meta.inputs,outputs:wjBarcodeEan13Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeEan13_1)},...wjBarcodeEan13Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeEan13);exports.WjBarcodeEan13=WjBarcodeEan13;var wjBarcodeCode39Meta={selector:"wj-barcode-code39",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","checkDigit","fullAscii","labelPosition","nwRatio","labelWithStartAndStopCharacter"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeCode39Meta=wjBarcodeCode39Meta;let WjBarcodeCode39=WjBarcodeCode39_1=class WjBarcodeCode39 extends wjcBarcodeCommon.Code39{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeCode39.meta={outputs:wjBarcodeCode39Meta.outputs};WjBarcodeCode39=WjBarcodeCode39_1=__decorate([core_1.Component({selector:wjBarcodeCode39Meta.selector,template:wjBarcodeCode39Meta.template,inputs:wjBarcodeCode39Meta.inputs,outputs:wjBarcodeCode39Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeCode39_1)},...wjBarcodeCode39Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeCode39);exports.WjBarcodeCode39=WjBarcodeCode39;var wjBarcodeCode128Meta={selector:"wj-barcode-code128",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","codeSet","labelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeCode128Meta=wjBarcodeCode128Meta;let WjBarcodeCode128=WjBarcodeCode128_1=class WjBarcodeCode128 extends wjcBarcodeCommon.Code128{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeCode128.meta={outputs:wjBarcodeCode128Meta.outputs};WjBarcodeCode128=WjBarcodeCode128_1=__decorate([core_1.Component({selector:wjBarcodeCode128Meta.selector,template:wjBarcodeCode128Meta.template,inputs:wjBarcodeCode128Meta.inputs,outputs:wjBarcodeCode128Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeCode128_1)},...wjBarcodeCode128Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeCode128);exports.WjBarcodeCode128=WjBarcodeCode128;var wjBarcodeGs1_128Meta={selector:"wj-barcode-gs1_128",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","labelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeGs1_128Meta=wjBarcodeGs1_128Meta;let WjBarcodeGs1_128=WjBarcodeGs1_128_1=class WjBarcodeGs1_128 extends wjcBarcodeCommon.Gs1_128{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeGs1_128.meta={outputs:wjBarcodeGs1_128Meta.outputs};WjBarcodeGs1_128=WjBarcodeGs1_128_1=__decorate([core_1.Component({selector:wjBarcodeGs1_128Meta.selector,template:wjBarcodeGs1_128Meta.template,inputs:wjBarcodeGs1_128Meta.inputs,outputs:wjBarcodeGs1_128Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeGs1_128_1)},...wjBarcodeGs1_128Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeGs1_128);exports.WjBarcodeGs1_128=WjBarcodeGs1_128;var wjBarcodeUpcAMeta={selector:"wj-barcode-upc-a",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","addOn","labelPosition","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeUpcAMeta=wjBarcodeUpcAMeta;let WjBarcodeUpcA=WjBarcodeUpcA_1=class WjBarcodeUpcA extends wjcBarcodeCommon.UpcA{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeUpcA.meta={outputs:wjBarcodeUpcAMeta.outputs};WjBarcodeUpcA=WjBarcodeUpcA_1=__decorate([core_1.Component({selector:wjBarcodeUpcAMeta.selector,template:wjBarcodeUpcAMeta.template,inputs:wjBarcodeUpcAMeta.inputs,outputs:wjBarcodeUpcAMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeUpcA_1)},...wjBarcodeUpcAMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeUpcA);exports.WjBarcodeUpcA=WjBarcodeUpcA;var wjBarcodeUpcE0Meta={selector:"wj-barcode-upc-e0",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","addOn","labelPosition","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeUpcE0Meta=wjBarcodeUpcE0Meta;let WjBarcodeUpcE0=WjBarcodeUpcE0_1=class WjBarcodeUpcE0 extends wjcBarcodeCommon.UpcE0{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeUpcE0.meta={outputs:wjBarcodeUpcE0Meta.outputs};WjBarcodeUpcE0=WjBarcodeUpcE0_1=__decorate([core_1.Component({selector:wjBarcodeUpcE0Meta.selector,template:wjBarcodeUpcE0Meta.template,inputs:wjBarcodeUpcE0Meta.inputs,outputs:wjBarcodeUpcE0Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeUpcE0_1)},...wjBarcodeUpcE0Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeUpcE0);exports.WjBarcodeUpcE0=WjBarcodeUpcE0;var wjBarcodeUpcE1Meta={selector:"wj-barcode-upc-e1",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","addOn","labelPosition","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeUpcE1Meta=wjBarcodeUpcE1Meta;let WjBarcodeUpcE1=WjBarcodeUpcE1_1=class WjBarcodeUpcE1 extends wjcBarcodeCommon.UpcE1{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeUpcE1.meta={outputs:wjBarcodeUpcE1Meta.outputs};WjBarcodeUpcE1=WjBarcodeUpcE1_1=__decorate([core_1.Component({selector:wjBarcodeUpcE1Meta.selector,template:wjBarcodeUpcE1Meta.template,inputs:wjBarcodeUpcE1Meta.inputs,outputs:wjBarcodeUpcE1Meta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeUpcE1_1)},...wjBarcodeUpcE1Meta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeUpcE1);exports.WjBarcodeUpcE1=WjBarcodeUpcE1;var wjBarcodeQrCodeMeta={selector:"wj-barcode-qr-code",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","charCode","charset","model","version","errorCorrectionLevel","mask","connection","connectionIndex"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjBarcodeQrCodeMeta=wjBarcodeQrCodeMeta;let WjBarcodeQrCode=WjBarcodeQrCode_1=class WjBarcodeQrCode extends wjcBarcodeCommon.QrCode{constructor(e,o,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,r,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[o]?i.runOutsideAngular(()=>{super.addEventListener(e,o,r,t)}):super.addEventListener(e,o,r,t)}};WjBarcodeQrCode.meta={outputs:wjBarcodeQrCodeMeta.outputs};WjBarcodeQrCode=WjBarcodeQrCode_1=__decorate([core_1.Component({selector:wjBarcodeQrCodeMeta.selector,template:wjBarcodeQrCodeMeta.template,inputs:wjBarcodeQrCodeMeta.inputs,outputs:wjBarcodeQrCodeMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjBarcodeQrCode_1)},...wjBarcodeQrCodeMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjBarcodeQrCode);exports.WjBarcodeQrCode=WjBarcodeQrCode;let moduleExports=[WjBarcodeCodabar,WjBarcodeEan8,WjBarcodeEan13,WjBarcodeCode39,WjBarcodeCode128,WjBarcodeGs1_128,WjBarcodeUpcA,WjBarcodeUpcE0,WjBarcodeUpcE1,WjBarcodeQrCode],WjBarcodeCommonModule=class WjBarcodeCommonModule{};WjBarcodeCommonModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjBarcodeCommonModule);exports.WjBarcodeCommonModule=WjBarcodeCommonModule;