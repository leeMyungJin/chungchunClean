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

"use strict";var WjFlexMap_1,WjScatterMapLayer_1,WjGeoMapLayer_1,WjGeoGridLayer_1,WjColorScale_1,__decorate=this&&this.__decorate||function(e,t,r,a){var o,i=arguments.length,n=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n},__param=this&&this.__param||function(e,t){return function(r,a){t(r,a,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcChartMap=__importStar(require("wijmo/wijmo.chart.map"));var wjFlexMapMeta={selector:"wj-flex-map",template:"<div><ng-content></ng-content></div>",inputs:["wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","center","zoom"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjFlexMapMeta=wjFlexMapMeta;let WjFlexMap=WjFlexMap_1=class WjFlexMap extends wjcChartMap.FlexMap{constructor(e,t,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,r,a=!1){let o=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=o.getZone(this);i&&o.outsideZoneEvents[t]?i.runOutsideAngular(()=>{super.addEventListener(e,t,r,a)}):super.addEventListener(e,t,r,a)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}};WjFlexMap.meta={outputs:wjFlexMapMeta.outputs};WjFlexMap=WjFlexMap_1=__decorate([core_1.Component({selector:wjFlexMapMeta.selector,template:wjFlexMapMeta.template,inputs:wjFlexMapMeta.inputs,outputs:wjFlexMapMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexMap_1)},...wjFlexMapMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexMap);exports.WjFlexMap=WjFlexMap;var wjScatterMapLayerMeta={selector:"wj-scatter-map-layer",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","style","itemsSource","url","symbolSize","symbolMinSize","symbolMaxSize","binding"],outputs:["initialized","itemsSourceChangedNg: itemsSourceChanged","itemsSourceChangePC: itemsSourceChange"],providers:[]};exports.wjScatterMapLayerMeta=wjScatterMapLayerMeta;let WjScatterMapLayer=WjScatterMapLayer_1=class WjScatterMapLayer extends wjcChartMap.ScatterMapLayer{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="layers";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjScatterMapLayer.meta={outputs:wjScatterMapLayerMeta.outputs,changeEvents:{itemsSourceChanged:["itemsSource"]},siblingId:"layers"};WjScatterMapLayer=WjScatterMapLayer_1=__decorate([core_1.Component({selector:wjScatterMapLayerMeta.selector,template:wjScatterMapLayerMeta.template,inputs:wjScatterMapLayerMeta.inputs,outputs:wjScatterMapLayerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjScatterMapLayer_1)},...wjScatterMapLayerMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjScatterMapLayer);exports.WjScatterMapLayer=WjScatterMapLayer;var wjGeoMapLayerMeta={selector:"wj-geo-map-layer",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","style","itemsSource","url","itemFormatter"],outputs:["initialized","itemsSourceChangedNg: itemsSourceChanged","itemsSourceChangePC: itemsSourceChange"],providers:[]};exports.wjGeoMapLayerMeta=wjGeoMapLayerMeta;let WjGeoMapLayer=WjGeoMapLayer_1=class WjGeoMapLayer extends wjcChartMap.GeoMapLayer{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="layers";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjGeoMapLayer.meta={outputs:wjGeoMapLayerMeta.outputs,changeEvents:{itemsSourceChanged:["itemsSource"]},siblingId:"layers"};WjGeoMapLayer=WjGeoMapLayer_1=__decorate([core_1.Component({selector:wjGeoMapLayerMeta.selector,template:wjGeoMapLayerMeta.template,inputs:wjGeoMapLayerMeta.inputs,outputs:wjGeoMapLayerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjGeoMapLayer_1)},...wjGeoMapLayerMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjGeoMapLayer);exports.WjGeoMapLayer=WjGeoMapLayer;var wjGeoGridLayerMeta={selector:"wj-geo-grid-layer",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","style","itemsSource","url"],outputs:["initialized","itemsSourceChangedNg: itemsSourceChanged","itemsSourceChangePC: itemsSourceChange"],providers:[]};exports.wjGeoGridLayerMeta=wjGeoGridLayerMeta;let WjGeoGridLayer=WjGeoGridLayer_1=class WjGeoGridLayer extends wjcChartMap.GeoGridLayer{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="layers";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjGeoGridLayer.meta={outputs:wjGeoGridLayerMeta.outputs,changeEvents:{itemsSourceChanged:["itemsSource"]},siblingId:"layers"};WjGeoGridLayer=WjGeoGridLayer_1=__decorate([core_1.Component({selector:wjGeoGridLayerMeta.selector,template:wjGeoGridLayerMeta.template,inputs:wjGeoGridLayerMeta.inputs,outputs:wjGeoGridLayerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjGeoGridLayer_1)},...wjGeoGridLayerMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjGeoGridLayer);exports.WjGeoGridLayer=WjGeoGridLayer;var wjColorScaleMeta={selector:"wj-color-scale",template:"",inputs:["wjProperty","scale","binding","colorUnknown","colors","format"],outputs:["initialized"],providers:[]};exports.wjColorScaleMeta=wjColorScaleMeta;let WjColorScale=WjColorScale_1=class WjColorScale extends wjcChartMap.ColorScale{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="colorScale";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjColorScale.meta={outputs:wjColorScaleMeta.outputs};WjColorScale=WjColorScale_1=__decorate([core_1.Component({selector:wjColorScaleMeta.selector,template:wjColorScaleMeta.template,inputs:wjColorScaleMeta.inputs,outputs:wjColorScaleMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjColorScale_1)},...wjColorScaleMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjColorScale);exports.WjColorScale=WjColorScale;let moduleExports=[WjFlexMap,WjScatterMapLayer,WjGeoMapLayer,WjGeoGridLayer,WjColorScale],WjChartMapModule=class WjChartMapModule{};WjChartMapModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartMapModule);exports.WjChartMapModule=WjChartMapModule;