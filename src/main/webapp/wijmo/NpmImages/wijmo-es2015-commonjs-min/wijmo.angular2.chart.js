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

"use strict";var WjFlexChart_1,WjFlexPie_1,WjFlexChartAxis_1,WjFlexChartLegend_1,WjFlexChartDataLabel_1,WjFlexPieDataLabel_1,WjFlexChartSeries_1,WjFlexChartLineMarker_1,WjFlexChartDataPoint_1,WjFlexChartPlotArea_1,__decorate=this&&this.__decorate||function(e,t,r,a){var i,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(n=(o<3?i(n):o>3?i(t,r,n):i(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n},__param=this&&this.__param||function(e,t){return function(r,a){t(r,a,e)}},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcChart=__importStar(require("wijmo/wijmo.chart"));var wjFlexChartMeta={selector:"wj-flex-chart",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","renderEngine","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingX","interpolateNulls","legendToggle","symbolSize","options","selection","itemFormatter","labelContent","chartType","rotated","stacking"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","selectionChangePC: selectionChange","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","seriesVisibilityChangedNg: seriesVisibilityChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjFlexChartMeta=wjFlexChartMeta;let WjFlexChart=WjFlexChart_1=class WjFlexChart extends wjcChart.FlexChart{constructor(e,t,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,r,a=!1){let i=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,o=i.getZone(this);o&&i.outsideZoneEvents[t]?o.runOutsideAngular(()=>{super.addEventListener(e,t,r,a)}):super.addEventListener(e,t,r,a)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}get labelContent(){return this.dataLabel.content}set labelContent(e){this.dataLabel.content=e}};WjFlexChart.meta={outputs:wjFlexChartMeta.outputs,changeEvents:{selectionChanged:["selection"]}};WjFlexChart=WjFlexChart_1=__decorate([core_1.Component({selector:wjFlexChartMeta.selector,template:wjFlexChartMeta.template,inputs:wjFlexChartMeta.inputs,outputs:wjFlexChartMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChart_1)},...wjFlexChartMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChart);exports.WjFlexChart=WjFlexChart;var wjFlexPieMeta={selector:"wj-flex-pie",template:"<div><ng-content></ng-content></div>",inputs:["wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingName","innerRadius","isAnimated","offset","reversed","startAngle","selectedIndex","selectedItemPosition","selectedItemOffset","itemFormatter","labelContent","titles","chartsPerLine"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};exports.wjFlexPieMeta=wjFlexPieMeta;let WjFlexPie=WjFlexPie_1=class WjFlexPie extends wjcChart.FlexPie{constructor(e,t,r){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,r,a=!1){let i=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,o=i.getZone(this);o&&i.outsideZoneEvents[t]?o.runOutsideAngular(()=>{super.addEventListener(e,t,r,a)}):super.addEventListener(e,t,r,a)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}get labelContent(){return this.dataLabel.content}set labelContent(e){this.dataLabel.content=e}};WjFlexPie.meta={outputs:wjFlexPieMeta.outputs};WjFlexPie=WjFlexPie_1=__decorate([core_1.Component({selector:wjFlexPieMeta.selector,template:wjFlexPieMeta.template,inputs:wjFlexPieMeta.inputs,outputs:wjFlexPieMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexPie_1)},...wjFlexPieMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexPie);exports.WjFlexPie=WjFlexPie;var wjFlexChartAxisMeta={selector:"wj-flex-chart-axis",template:"",inputs:["wjProperty","axisLine","format","labels","majorGrid","majorTickMarks","majorUnit","max","min","position","reversed","title","labelAngle","minorGrid","minorTickMarks","minorUnit","origin","logBase","plotArea","labelAlign","name","overlappingLabels","labelPadding","itemFormatter","itemsSource","binding"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};exports.wjFlexChartAxisMeta=wjFlexChartAxisMeta;let WjFlexChartAxis=WjFlexChartAxis_1=class WjFlexChartAxis extends wjcChart.Axis{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="axes";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAxis.meta={outputs:wjFlexChartAxisMeta.outputs};WjFlexChartAxis=WjFlexChartAxis_1=__decorate([core_1.Component({selector:wjFlexChartAxisMeta.selector,template:wjFlexChartAxisMeta.template,inputs:wjFlexChartAxisMeta.inputs,outputs:wjFlexChartAxisMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartAxis_1)},...wjFlexChartAxisMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartAxis);exports.WjFlexChartAxis=WjFlexChartAxis;var wjFlexChartLegendMeta={selector:"wj-flex-chart-legend",template:"",inputs:["wjProperty","orientation","position","title","titleAlign","maxSize"],outputs:["initialized"],providers:[]};exports.wjFlexChartLegendMeta=wjFlexChartLegendMeta;let WjFlexChartLegend=WjFlexChartLegend_1=class WjFlexChartLegend extends wjcChart.Legend{constructor(e,t,r){super(r);this.isInitialized=!1;this.wjProperty="legend";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartLegend.meta={outputs:wjFlexChartLegendMeta.outputs};WjFlexChartLegend=WjFlexChartLegend_1=__decorate([core_1.Component({selector:wjFlexChartLegendMeta.selector,template:wjFlexChartLegendMeta.template,inputs:wjFlexChartLegendMeta.inputs,outputs:wjFlexChartLegendMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartLegend_1)},...wjFlexChartLegendMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartLegend);exports.WjFlexChartLegend=WjFlexChartLegend;var wjFlexChartDataLabelMeta={selector:"wj-flex-chart-data-label",template:"",inputs:["wjProperty","content","border","offset","connectingLine","position"],outputs:["initialized","renderingNg: rendering"],providers:[]};exports.wjFlexChartDataLabelMeta=wjFlexChartDataLabelMeta;let WjFlexChartDataLabel=WjFlexChartDataLabel_1=class WjFlexChartDataLabel extends wjcChart.DataLabel{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="dataLabel";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartDataLabel.meta={outputs:wjFlexChartDataLabelMeta.outputs};WjFlexChartDataLabel=WjFlexChartDataLabel_1=__decorate([core_1.Component({selector:wjFlexChartDataLabelMeta.selector,template:wjFlexChartDataLabelMeta.template,inputs:wjFlexChartDataLabelMeta.inputs,outputs:wjFlexChartDataLabelMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartDataLabel_1)},...wjFlexChartDataLabelMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartDataLabel);exports.WjFlexChartDataLabel=WjFlexChartDataLabel;var wjFlexPieDataLabelMeta={selector:"wj-flex-pie-data-label",template:"",inputs:["wjProperty","content","border","offset","connectingLine","position"],outputs:["initialized","renderingNg: rendering"],providers:[]};exports.wjFlexPieDataLabelMeta=wjFlexPieDataLabelMeta;let WjFlexPieDataLabel=WjFlexPieDataLabel_1=class WjFlexPieDataLabel extends wjcChart.PieDataLabel{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="dataLabel";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexPieDataLabel.meta={outputs:wjFlexPieDataLabelMeta.outputs};WjFlexPieDataLabel=WjFlexPieDataLabel_1=__decorate([core_1.Component({selector:wjFlexPieDataLabelMeta.selector,template:wjFlexPieDataLabelMeta.template,inputs:wjFlexPieDataLabelMeta.inputs,outputs:wjFlexPieDataLabelMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexPieDataLabel_1)},...wjFlexPieDataLabelMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexPieDataLabel);exports.WjFlexPieDataLabel=WjFlexPieDataLabel;var wjFlexChartSeriesMeta={selector:"wj-flex-chart-series",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","axisX","axisY","binding","bindingX","cssClass","name","style","altStyle","symbolMarker","symbolSize","symbolStyle","visibility","itemsSource","interpolateNulls","tooltipContent","itemFormatter","chartType"],outputs:["initialized","renderingNg: rendering","renderedNg: rendered","visibilityChangePC: visibilityChange"],providers:[]};exports.wjFlexChartSeriesMeta=wjFlexChartSeriesMeta;let WjFlexChartSeries=WjFlexChartSeries_1=class WjFlexChartSeries extends wjcChart.Series{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="series";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartSeries.meta={outputs:wjFlexChartSeriesMeta.outputs,changeEvents:{"chart.seriesVisibilityChanged":["visibility"]},siblingId:"series"};WjFlexChartSeries=WjFlexChartSeries_1=__decorate([core_1.Component({selector:wjFlexChartSeriesMeta.selector,template:wjFlexChartSeriesMeta.template,inputs:wjFlexChartSeriesMeta.inputs,outputs:wjFlexChartSeriesMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartSeries_1)},...wjFlexChartSeriesMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartSeries);exports.WjFlexChartSeries=WjFlexChartSeries;var wjFlexChartLineMarkerMeta={selector:"wj-flex-line-marker",template:"",inputs:["wjProperty","isVisible","seriesIndex","horizontalPosition","content","verticalPosition","alignment","lines","interaction","dragLines","dragThreshold","dragContent"],outputs:["initialized","positionChangedNg: positionChanged"],providers:[]};exports.wjFlexChartLineMarkerMeta=wjFlexChartLineMarkerMeta;let WjFlexChartLineMarker=WjFlexChartLineMarker_1=class WjFlexChartLineMarker extends wjcChart.LineMarker{constructor(e,t,r){super(r);this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartLineMarker.meta={outputs:wjFlexChartLineMarkerMeta.outputs};WjFlexChartLineMarker=WjFlexChartLineMarker_1=__decorate([core_1.Component({selector:wjFlexChartLineMarkerMeta.selector,template:wjFlexChartLineMarkerMeta.template,inputs:wjFlexChartLineMarkerMeta.inputs,outputs:wjFlexChartLineMarkerMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartLineMarker_1)},...wjFlexChartLineMarkerMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartLineMarker);exports.WjFlexChartLineMarker=WjFlexChartLineMarker;var wjFlexChartDataPointMeta={selector:"wj-flex-chart-data-point",template:"",inputs:["wjProperty","x","y"],outputs:["initialized"],providers:[]};exports.wjFlexChartDataPointMeta=wjFlexChartDataPointMeta;let WjFlexChartDataPoint=WjFlexChartDataPoint_1=class WjFlexChartDataPoint extends wjcChart.DataPoint{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartDataPoint.meta={outputs:wjFlexChartDataPointMeta.outputs};WjFlexChartDataPoint=WjFlexChartDataPoint_1=__decorate([core_1.Component({selector:wjFlexChartDataPointMeta.selector,template:wjFlexChartDataPointMeta.template,inputs:wjFlexChartDataPointMeta.inputs,outputs:wjFlexChartDataPointMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartDataPoint_1)},...wjFlexChartDataPointMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartDataPoint);exports.WjFlexChartDataPoint=WjFlexChartDataPoint;var wjFlexChartPlotAreaMeta={selector:"wj-flex-chart-plot-area",template:"",inputs:["wjProperty","column","height","name","row","style","width"],outputs:["initialized"],providers:[]};exports.wjFlexChartPlotAreaMeta=wjFlexChartPlotAreaMeta;let WjFlexChartPlotArea=WjFlexChartPlotArea_1=class WjFlexChartPlotArea extends wjcChart.PlotArea{constructor(e,t,r){super();this.isInitialized=!1;this.wjProperty="plotAreas";this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartPlotArea.meta={outputs:wjFlexChartPlotAreaMeta.outputs};WjFlexChartPlotArea=WjFlexChartPlotArea_1=__decorate([core_1.Component({selector:wjFlexChartPlotAreaMeta.selector,template:wjFlexChartPlotAreaMeta.template,inputs:wjFlexChartPlotAreaMeta.inputs,outputs:wjFlexChartPlotAreaMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartPlotArea_1)},...wjFlexChartPlotAreaMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartPlotArea);exports.WjFlexChartPlotArea=WjFlexChartPlotArea;let moduleExports=[WjFlexChart,WjFlexPie,WjFlexChartAxis,WjFlexChartLegend,WjFlexChartDataLabel,WjFlexPieDataLabel,WjFlexChartSeries,WjFlexChartLineMarker,WjFlexChartDataPoint,WjFlexChartPlotArea],WjChartModule=class WjChartModule{};WjChartModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartModule);exports.WjChartModule=WjChartModule;