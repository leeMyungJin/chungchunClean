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

var WjFlexGridSearch_1,__decorate=this&&this.__decorate||function(e,r,t,o){var i,a=arguments.length,c=a<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,r,t,o);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(c=(a<3?i(c):a>3?i(r,t,c):i(r,t))||c);return a>3&&c&&Object.defineProperty(r,t,c),c},__param=this&&this.__param||function(e,r){return function(t,o){r(t,o,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcGridSearch from"wijmo/wijmo.grid.search";var wjFlexGridSearchMeta={selector:"wj-flex-grid-search",template:"",inputs:["wjModelProperty","isDisabled","text","delay","searchAllColumns","placeholder","cssMatch","grid"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjFlexGridSearchMeta};let WjFlexGridSearch=WjFlexGridSearch_1=class WjFlexGridSearch extends wjcGridSearch.FlexGridSearch{constructor(e,r,t){super(WjDirectiveBehavior.getHostElement(e,r));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,r,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,r,t,o=!1){let i=WjDirectiveBehavior,a=i.getZone(this);a&&i.outsideZoneEvents[r]?a.runOutsideAngular(()=>{super.addEventListener(e,r,t,o)}):super.addEventListener(e,r,t,o)}};WjFlexGridSearch.meta={outputs:wjFlexGridSearchMeta.outputs};WjFlexGridSearch=WjFlexGridSearch_1=__decorate([Component({selector:wjFlexGridSearchMeta.selector,template:wjFlexGridSearchMeta.template,inputs:wjFlexGridSearchMeta.inputs,outputs:wjFlexGridSearchMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexGridSearch_1)},...wjFlexGridSearchMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexGridSearch);export{WjFlexGridSearch};let moduleExports=[WjFlexGridSearch],WjGridSearchModule=class WjGridSearchModule{};WjGridSearchModule=__decorate([NgModule({imports:[CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridSearchModule);export{WjGridSearchModule};