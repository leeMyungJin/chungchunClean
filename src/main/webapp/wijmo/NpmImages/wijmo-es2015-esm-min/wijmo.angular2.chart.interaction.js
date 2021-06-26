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

var WjFlexChartRangeSelector_1,WjFlexChartGestures_1,__decorate=this&&this.__decorate||function(e,t,r,a){var o,n=arguments.length,s=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,a);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,a){t(r,a,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{WjDirectiveBehavior}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartInteraction from"wijmo/wijmo.chart.interaction";var wjFlexChartRangeSelectorMeta={selector:"wj-flex-chart-range-selector",template:"",inputs:["wjProperty","isVisible","min","max","orientation","seamless","minScale","maxScale"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};export{wjFlexChartRangeSelectorMeta};let WjFlexChartRangeSelector=WjFlexChartRangeSelector_1=class WjFlexChartRangeSelector extends wjcChartInteraction.RangeSelector{constructor(e,t,r){super(r);this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartRangeSelector.meta={outputs:wjFlexChartRangeSelectorMeta.outputs};WjFlexChartRangeSelector=WjFlexChartRangeSelector_1=__decorate([Component({selector:wjFlexChartRangeSelectorMeta.selector,template:wjFlexChartRangeSelectorMeta.template,inputs:wjFlexChartRangeSelectorMeta.inputs,outputs:wjFlexChartRangeSelectorMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartRangeSelector_1)},...wjFlexChartRangeSelectorMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartRangeSelector);export{WjFlexChartRangeSelector};var wjFlexChartGesturesMeta={selector:"wj-flex-chart-gestures",template:"",inputs:["wjProperty","mouseAction","interactiveAxes","enable","scaleX","scaleY","posX","posY"],outputs:["initialized"],providers:[]};export{wjFlexChartGesturesMeta};let WjFlexChartGestures=WjFlexChartGestures_1=class WjFlexChartGestures extends wjcChartInteraction.ChartGestures{constructor(e,t,r){super(r);this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartGestures.meta={outputs:wjFlexChartGesturesMeta.outputs};WjFlexChartGestures=WjFlexChartGestures_1=__decorate([Component({selector:wjFlexChartGesturesMeta.selector,template:wjFlexChartGesturesMeta.template,inputs:wjFlexChartGesturesMeta.inputs,outputs:wjFlexChartGesturesMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartGestures_1)},...wjFlexChartGesturesMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartGestures);export{WjFlexChartGestures};let moduleExports=[WjFlexChartRangeSelector,WjFlexChartGestures],WjChartInteractionModule=class WjChartInteractionModule{};WjChartInteractionModule=__decorate([NgModule({imports:[CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartInteractionModule);export{WjChartInteractionModule};