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

var WjFinancialChart_1,WjFinancialChartSeries_1,__decorate=this&&this.__decorate||function(e,t,i,n){var a,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(o=(r<3?a(o):r>3?a(t,i,o):a(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o},__param=this&&this.__param||function(e,t){return function(i,n){t(i,n,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartFinance from"wijmo/wijmo.chart.finance";var wjFinancialChartMeta={selector:"wj-financial-chart",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","renderEngine","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingX","interpolateNulls","legendToggle","symbolSize","options","selection","itemFormatter","labelContent","chartType"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","refreshingNg: refreshing","refreshedNg: refreshed","invalidInputNg: invalidInput","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","selectionChangePC: selectionChange","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","seriesVisibilityChangedNg: seriesVisibilityChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};export{wjFinancialChartMeta};let WjFinancialChart=WjFinancialChart_1=class WjFinancialChart extends wjcChartFinance.FinancialChart{constructor(e,t,i){super(WjDirectiveBehavior.getHostElement(e,t));this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,i);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,i,n=!1){let a=WjDirectiveBehavior,r=a.getZone(this);r&&a.outsideZoneEvents[t]?r.runOutsideAngular(()=>{super.addEventListener(e,t,i,n)}):super.addEventListener(e,t,i,n)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}get labelContent(){return this.dataLabel.content}set labelContent(e){this.dataLabel.content=e}};WjFinancialChart.meta={outputs:wjFinancialChartMeta.outputs,changeEvents:{selectionChanged:["selection"]}};WjFinancialChart=WjFinancialChart_1=__decorate([Component({selector:wjFinancialChartMeta.selector,template:wjFinancialChartMeta.template,inputs:wjFinancialChartMeta.inputs,outputs:wjFinancialChartMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFinancialChart_1)},...wjFinancialChartMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFinancialChart);export{WjFinancialChart};var wjFinancialChartSeriesMeta={selector:"wj-financial-chart-series",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","axisX","axisY","binding","bindingX","cssClass","name","style","altStyle","symbolMarker","symbolSize","symbolStyle","visibility","itemsSource","interpolateNulls","tooltipContent","itemFormatter","chartType"],outputs:["initialized","renderingNg: rendering","renderedNg: rendered","visibilityChangePC: visibilityChange"],providers:[]};export{wjFinancialChartSeriesMeta};let WjFinancialChartSeries=WjFinancialChartSeries_1=class WjFinancialChartSeries extends wjcChartFinance.FinancialSeries{constructor(e,t,i){super();this.isInitialized=!1;this.wjProperty="series";this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,i);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFinancialChartSeries.meta={outputs:wjFinancialChartSeriesMeta.outputs,changeEvents:{"chart.seriesVisibilityChanged":["visibility"]},siblingId:"series"};WjFinancialChartSeries=WjFinancialChartSeries_1=__decorate([Component({selector:wjFinancialChartSeriesMeta.selector,template:wjFinancialChartSeriesMeta.template,inputs:wjFinancialChartSeriesMeta.inputs,outputs:wjFinancialChartSeriesMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFinancialChartSeries_1)},...wjFinancialChartSeriesMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFinancialChartSeries);export{WjFinancialChartSeries};let moduleExports=[WjFinancialChart,WjFinancialChartSeries],WjChartFinanceModule=class WjChartFinanceModule{};WjChartFinanceModule=__decorate([NgModule({imports:[CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartFinanceModule);export{WjChartFinanceModule};