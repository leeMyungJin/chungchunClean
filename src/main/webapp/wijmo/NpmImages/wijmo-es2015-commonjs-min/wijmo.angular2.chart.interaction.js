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

"use strict";var WjFlexChartRangeSelector_1,WjFlexChartGestures_1,__decorate=this&&this.__decorate||function(e,t,r,a){var o,n=arguments.length,s=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,a);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,a){t(r,a,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcChartInteraction=__importStar(require("wijmo/wijmo.chart.interaction"));var wjFlexChartRangeSelectorMeta={selector:"wj-flex-chart-range-selector",template:"",inputs:["wjProperty","isVisible","min","max","orientation","seamless","minScale","maxScale"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};exports.wjFlexChartRangeSelectorMeta=wjFlexChartRangeSelectorMeta;let WjFlexChartRangeSelector=WjFlexChartRangeSelector_1=class WjFlexChartRangeSelector extends wjcChartInteraction.RangeSelector{constructor(e,t,r){super(r);this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartRangeSelector.meta={outputs:wjFlexChartRangeSelectorMeta.outputs};WjFlexChartRangeSelector=WjFlexChartRangeSelector_1=__decorate([core_1.Component({selector:wjFlexChartRangeSelectorMeta.selector,template:wjFlexChartRangeSelectorMeta.template,inputs:wjFlexChartRangeSelectorMeta.inputs,outputs:wjFlexChartRangeSelectorMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartRangeSelector_1)},...wjFlexChartRangeSelectorMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartRangeSelector);exports.WjFlexChartRangeSelector=WjFlexChartRangeSelector;var wjFlexChartGesturesMeta={selector:"wj-flex-chart-gestures",template:"",inputs:["wjProperty","mouseAction","interactiveAxes","enable","scaleX","scaleY","posX","posY"],outputs:["initialized"],providers:[]};exports.wjFlexChartGesturesMeta=wjFlexChartGesturesMeta;let WjFlexChartGestures=WjFlexChartGestures_1=class WjFlexChartGestures extends wjcChartInteraction.ChartGestures{constructor(e,t,r){super(r);this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartGestures.meta={outputs:wjFlexChartGesturesMeta.outputs};WjFlexChartGestures=WjFlexChartGestures_1=__decorate([core_1.Component({selector:wjFlexChartGesturesMeta.selector,template:wjFlexChartGesturesMeta.template,inputs:wjFlexChartGesturesMeta.inputs,outputs:wjFlexChartGesturesMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartGestures_1)},...wjFlexChartGesturesMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartGestures);exports.WjFlexChartGestures=WjFlexChartGestures;let moduleExports=[WjFlexChartRangeSelector,WjFlexChartGestures],WjChartInteractionModule=class WjChartInteractionModule{};WjChartInteractionModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartInteractionModule);exports.WjChartInteractionModule=WjChartInteractionModule;