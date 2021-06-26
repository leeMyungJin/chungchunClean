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

var WjBarcodeCodabar_1,WjBarcodeEan8_1,WjBarcodeEan13_1,WjBarcodeCode39_1,WjBarcodeCode128_1,WjBarcodeGs1_128_1,WjBarcodeUpcA_1,WjBarcodeUpcE0_1,WjBarcodeUpcE1_1,WjBarcodeQrCode_1,__decorate=this&&this.__decorate||function(e,t,o,r){var a,i=arguments.length,n=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var d=e.length-1;d>=0;d--)(a=e[d])&&(n=(i<3?a(n):i>3?a(t,o,n):a(t,o))||n);return i>3&&n&&Object.defineProperty(t,o,n),n},__param=this&&this.__param||function(e,t){return function(o,r){t(o,r,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcBarcodeCommon from"wijmo/wijmo.barcode.common";var wjBarcodeCodabarMeta={selector:"wj-barcode-codabar",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","checkDigit","labelPosition","nwRatio"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeCodabarMeta};let WjBarcodeCodabar=WjBarcodeCodabar_1=class WjBarcodeCodabar extends wjcBarcodeCommon.Codabar{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeCodabar.meta={outputs:wjBarcodeCodabarMeta.outputs};WjBarcodeCodabar=WjBarcodeCodabar_1=__decorate([Component({selector:wjBarcodeCodabarMeta.selector,template:wjBarcodeCodabarMeta.template,inputs:wjBarcodeCodabarMeta.inputs,outputs:wjBarcodeCodabarMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeCodabar_1)},...wjBarcodeCodabarMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeCodabar);export{WjBarcodeCodabar};var wjBarcodeEan8Meta={selector:"wj-barcode-ean8",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeEan8Meta};let WjBarcodeEan8=WjBarcodeEan8_1=class WjBarcodeEan8 extends wjcBarcodeCommon.Ean8{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeEan8.meta={outputs:wjBarcodeEan8Meta.outputs};WjBarcodeEan8=WjBarcodeEan8_1=__decorate([Component({selector:wjBarcodeEan8Meta.selector,template:wjBarcodeEan8Meta.template,inputs:wjBarcodeEan8Meta.inputs,outputs:wjBarcodeEan8Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeEan8_1)},...wjBarcodeEan8Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeEan8);export{WjBarcodeEan8};var wjBarcodeEan13Meta={selector:"wj-barcode-ean13",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","labelPosition","addOn","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeEan13Meta};let WjBarcodeEan13=WjBarcodeEan13_1=class WjBarcodeEan13 extends wjcBarcodeCommon.Ean13{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeEan13.meta={outputs:wjBarcodeEan13Meta.outputs};WjBarcodeEan13=WjBarcodeEan13_1=__decorate([Component({selector:wjBarcodeEan13Meta.selector,template:wjBarcodeEan13Meta.template,inputs:wjBarcodeEan13Meta.inputs,outputs:wjBarcodeEan13Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeEan13_1)},...wjBarcodeEan13Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeEan13);export{WjBarcodeEan13};var wjBarcodeCode39Meta={selector:"wj-barcode-code39",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","checkDigit","fullAscii","labelPosition","nwRatio","labelWithStartAndStopCharacter"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeCode39Meta};let WjBarcodeCode39=WjBarcodeCode39_1=class WjBarcodeCode39 extends wjcBarcodeCommon.Code39{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeCode39.meta={outputs:wjBarcodeCode39Meta.outputs};WjBarcodeCode39=WjBarcodeCode39_1=__decorate([Component({selector:wjBarcodeCode39Meta.selector,template:wjBarcodeCode39Meta.template,inputs:wjBarcodeCode39Meta.inputs,outputs:wjBarcodeCode39Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeCode39_1)},...wjBarcodeCode39Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeCode39);export{WjBarcodeCode39};var wjBarcodeCode128Meta={selector:"wj-barcode-code128",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","codeSet","labelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeCode128Meta};let WjBarcodeCode128=WjBarcodeCode128_1=class WjBarcodeCode128 extends wjcBarcodeCommon.Code128{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeCode128.meta={outputs:wjBarcodeCode128Meta.outputs};WjBarcodeCode128=WjBarcodeCode128_1=__decorate([Component({selector:wjBarcodeCode128Meta.selector,template:wjBarcodeCode128Meta.template,inputs:wjBarcodeCode128Meta.inputs,outputs:wjBarcodeCode128Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeCode128_1)},...wjBarcodeCode128Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeCode128);export{WjBarcodeCode128};var wjBarcodeGs1_128Meta={selector:"wj-barcode-gs1_128",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","autoWidth","autoWidthZoom","showLabel","labelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeGs1_128Meta};let WjBarcodeGs1_128=WjBarcodeGs1_128_1=class WjBarcodeGs1_128 extends wjcBarcodeCommon.Gs1_128{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeGs1_128.meta={outputs:wjBarcodeGs1_128Meta.outputs};WjBarcodeGs1_128=WjBarcodeGs1_128_1=__decorate([Component({selector:wjBarcodeGs1_128Meta.selector,template:wjBarcodeGs1_128Meta.template,inputs:wjBarcodeGs1_128Meta.inputs,outputs:wjBarcodeGs1_128Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeGs1_128_1)},...wjBarcodeGs1_128Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeGs1_128);export{WjBarcodeGs1_128};var wjBarcodeUpcAMeta={selector:"wj-barcode-upc-a",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","addOn","labelPosition","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeUpcAMeta};let WjBarcodeUpcA=WjBarcodeUpcA_1=class WjBarcodeUpcA extends wjcBarcodeCommon.UpcA{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeUpcA.meta={outputs:wjBarcodeUpcAMeta.outputs};WjBarcodeUpcA=WjBarcodeUpcA_1=__decorate([Component({selector:wjBarcodeUpcAMeta.selector,template:wjBarcodeUpcAMeta.template,inputs:wjBarcodeUpcAMeta.inputs,outputs:wjBarcodeUpcAMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeUpcA_1)},...wjBarcodeUpcAMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeUpcA);export{WjBarcodeUpcA};var wjBarcodeUpcE0Meta={selector:"wj-barcode-upc-e0",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","addOn","labelPosition","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeUpcE0Meta};let WjBarcodeUpcE0=WjBarcodeUpcE0_1=class WjBarcodeUpcE0 extends wjcBarcodeCommon.UpcE0{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeUpcE0.meta={outputs:wjBarcodeUpcE0Meta.outputs};WjBarcodeUpcE0=WjBarcodeUpcE0_1=__decorate([Component({selector:wjBarcodeUpcE0Meta.selector,template:wjBarcodeUpcE0Meta.template,inputs:wjBarcodeUpcE0Meta.inputs,outputs:wjBarcodeUpcE0Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeUpcE0_1)},...wjBarcodeUpcE0Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeUpcE0);export{WjBarcodeUpcE0};var wjBarcodeUpcE1Meta={selector:"wj-barcode-upc-e1",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","showLabel","addOn","labelPosition","addOnHeight","addOnLabelPosition"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeUpcE1Meta};let WjBarcodeUpcE1=WjBarcodeUpcE1_1=class WjBarcodeUpcE1 extends wjcBarcodeCommon.UpcE1{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeUpcE1.meta={outputs:wjBarcodeUpcE1Meta.outputs};WjBarcodeUpcE1=WjBarcodeUpcE1_1=__decorate([Component({selector:wjBarcodeUpcE1Meta.selector,template:wjBarcodeUpcE1Meta.template,inputs:wjBarcodeUpcE1Meta.inputs,outputs:wjBarcodeUpcE1Meta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeUpcE1_1)},...wjBarcodeUpcE1Meta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeUpcE1);export{WjBarcodeUpcE1};var wjBarcodeQrCodeMeta={selector:"wj-barcode-qr-code",template:"",inputs:["wjModelProperty","isDisabled","value","quietZone","renderType","color","backgroundColor","hideExtraChecksum","font","charCode","charset","model","version","errorCorrectionLevel","mask","connection","connectionIndex"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","isValidChangedNg: isValidChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjBarcodeQrCodeMeta};let WjBarcodeQrCode=WjBarcodeQrCode_1=class WjBarcodeQrCode extends wjcBarcodeCommon.QrCode{constructor(e,t,o){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,o,r=!1){let a=WjDirectiveBehavior,i=a.getZone(this);i&&a.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,o,r)}):super.addEventListener(e,t,o,r)}};WjBarcodeQrCode.meta={outputs:wjBarcodeQrCodeMeta.outputs};WjBarcodeQrCode=WjBarcodeQrCode_1=__decorate([Component({selector:wjBarcodeQrCodeMeta.selector,template:wjBarcodeQrCodeMeta.template,inputs:wjBarcodeQrCodeMeta.inputs,outputs:wjBarcodeQrCodeMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjBarcodeQrCode_1)},...wjBarcodeQrCodeMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjBarcodeQrCode);export{WjBarcodeQrCode};let moduleExports=[WjBarcodeCodabar,WjBarcodeEan8,WjBarcodeEan13,WjBarcodeCode39,WjBarcodeCode128,WjBarcodeGs1_128,WjBarcodeUpcA,WjBarcodeUpcE0,WjBarcodeUpcE1,WjBarcodeQrCode],WjBarcodeCommonModule=class WjBarcodeCommonModule{};WjBarcodeCommonModule=__decorate([NgModule({imports:[CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjBarcodeCommonModule);export{WjBarcodeCommonModule};