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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}();import{WjDirective,MetaFactory,_registerNgModule,softRefChart}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChart from"wijmo/wijmo.chart";var wjNg=mNg,wijmoChartName="wj.chart";export var ngModuleName=wijmoChartName;var wijmoChart=_registerNgModule(wijmoChartName);if(softRefChart()&&softRefChart().FlexChart){wijmoChart.directive("wjFlexChart",[function(){return new WjFlexChart}]);wijmoChart.directive("wjFlexChartAxis",[function(){return new WjFlexChartAxis}]);wijmoChart.directive("wjFlexChartSeries",[function(){return new WjFlexChartSeries}]);wijmoChart.directive("wjFlexChartLegend",[function(){return new WjFlexChartLegend}]);wijmoChart.directive("wjFlexChartDataLabel",[function(){return new WjFlexChartDataLabel}]);wijmoChart.directive("wjFlexPieDataLabel",[function(){return new WjFlexPieDataLabel}]);wijmoChart.directive("wjFlexChartLineMarker",[function(){return new WjFlexChartLineMarker}]);wijmoChart.directive("wjFlexChartPlotArea",[function(){return new WjFlexChartPlotArea}]);wijmoChart.directive("wjFlexChartDataPoint",[function(){return new WjFlexChartDataPoint}]);wijmoChart.directive("wjFlexPie",[function(){return new WjFlexPie}])}var WjFlexChartBase=function(e){__extends(WjFlexChartBase,e);function WjFlexChartBase(){var t=e.call(this)||this;t.template="<div ng-transclude />";t.transclude=!0;return t}Object.defineProperty(WjFlexChartBase.prototype,"_controlConstructor",{get:function(){return wjcChart.FlexChartBase},enumerable:!0,configurable:!0});WjFlexChartBase.prototype._initProps=function(){e.prototype._initProps.call(this);MetaFactory.findProp("tooltipContent",this._props).customHandler=function(e,t,r,a,n){null!=r&&(t.tooltip.content=r)}};return WjFlexChartBase}(WjDirective);export{WjFlexChartBase};var WjFlexChartCore=function(e){__extends(WjFlexChartCore,e);function WjFlexChartCore(){return null!==e&&e.apply(this,arguments)||this}Object.defineProperty(WjFlexChartCore.prototype,"_controlConstructor",{get:function(){return wjcChart.FlexChartCore},enumerable:!0,configurable:!0});WjFlexChartCore.prototype._initProps=function(){e.prototype._initProps.call(this);MetaFactory.findProp("labelContent",this._props).customHandler=function(e,t,r,a,n){null!=r&&(t.dataLabel.content=r)}};return WjFlexChartCore}(WjFlexChartBase);export{WjFlexChartCore};var WjFlexChart=function(e){__extends(WjFlexChart,e);function WjFlexChart(){return null!==e&&e.apply(this,arguments)||this}Object.defineProperty(WjFlexChart.prototype,"_controlConstructor",{get:function(){return wjcChart.FlexChart},enumerable:!0,configurable:!0});return WjFlexChart}(WjFlexChartCore);export{WjFlexChart};var WjFlexChartAxis=function(e){__extends(WjFlexChartAxis,e);function WjFlexChartAxis(){var t=e.call(this)||this;t.require=["?^wjFlexChartSeries","?^wjFinancialChartSeries","?^wjFlexChart","?^wjFinancialChart","?^wjFlexRadar"];t.template='<div class="wjFlexChartAxis" />';return t}Object.defineProperty(WjFlexChartAxis.prototype,"_controlConstructor",{get:function(){return wjcChart.Axis},enumerable:!0,configurable:!0});WjFlexChartAxis.prototype._initControl=function(t){return e.prototype._initControl.call(this,void 0)};return WjFlexChartAxis}(WjDirective);export{WjFlexChartAxis};var WjFlexChartLegend=function(e){__extends(WjFlexChartLegend,e);function WjFlexChartLegend(){var t=e.call(this)||this;t.require=["?^wjFlexChart","?^wjFlexPie","?^wjSunburst","?^wjFinancialChart","?^wjFlexRadar"];t.template="<div />";return t}Object.defineProperty(WjFlexChartLegend.prototype,"_controlConstructor",{get:function(){return wjcChart.Legend},enumerable:!0,configurable:!0});return WjFlexChartLegend}(WjDirective);export{WjFlexChartLegend};var WjFlexChartDataLabelBase=function(e){__extends(WjFlexChartDataLabelBase,e);function WjFlexChartDataLabelBase(){var t=e.call(this)||this;t.require=["?^wjFlexChart","?^wjFlexPie","?^wjSunburst","?^wjTreeMap"];t.template="<div />";return t}Object.defineProperty(WjFlexChartDataLabelBase.prototype,"_controlConstructor",{get:function(){return wjcChart.DataLabelBase},enumerable:!0,configurable:!0});return WjFlexChartDataLabelBase}(WjDirective);export{WjFlexChartDataLabelBase};var WjFlexChartDataLabel=function(e){__extends(WjFlexChartDataLabel,e);function WjFlexChartDataLabel(){var t=e.call(this)||this;t.require=["^wjFlexChart","?^wjTreeMap"];return t}Object.defineProperty(WjFlexChartDataLabel.prototype,"_controlConstructor",{get:function(){return wjcChart.DataLabel},enumerable:!0,configurable:!0});return WjFlexChartDataLabel}(WjFlexChartDataLabelBase);export{WjFlexChartDataLabel};var WjFlexPieDataLabel=function(e){__extends(WjFlexPieDataLabel,e);function WjFlexPieDataLabel(){var t=e.call(this)||this;t.require=["^wjFlexPie","?^wjSunburst"];return t}Object.defineProperty(WjFlexPieDataLabel.prototype,"_controlConstructor",{get:function(){return wjcChart.PieDataLabel},enumerable:!0,configurable:!0});return WjFlexPieDataLabel}(WjFlexChartDataLabelBase);export{WjFlexPieDataLabel};var WjSeriesBase=function(e){__extends(WjSeriesBase,e);function WjSeriesBase(){var t=e.call(this)||this;t.require=["?^wjFlexChart","?^wjFinancialChart","?^wjFlexRadar"];t.template='<div class="wjSeriesBase" ng-transclude />';t.transclude=!0;return t}Object.defineProperty(WjSeriesBase.prototype,"_controlConstructor",{get:function(){return wjcChart.SeriesBase},enumerable:!0,configurable:!0});WjSeriesBase.prototype._initControl=function(t){return e.prototype._initControl.call(this,void 0)};WjSeriesBase.prototype._getId=function(){return"series"};return WjSeriesBase}(WjDirective);export{WjSeriesBase};var WjFlexChartSeries=function(e){__extends(WjFlexChartSeries,e);function WjFlexChartSeries(){var t=e.call(this)||this;t.require="^wjFlexChart";t.template='<div class="wjFlexChartSeries" ng-transclude />';return t}Object.defineProperty(WjFlexChartSeries.prototype,"_controlConstructor",{get:function(){return wjcChart.Series},enumerable:!0,configurable:!0});return WjFlexChartSeries}(WjSeriesBase);export{WjFlexChartSeries};var WjFlexChartLineMarker=function(e){__extends(WjFlexChartLineMarker,e);function WjFlexChartLineMarker(){var t=e.call(this)||this;t.require=["?^wjFlexChart","?^wjFinancialChart"];return t}Object.defineProperty(WjFlexChartLineMarker.prototype,"_controlConstructor",{get:function(){return wjcChart.LineMarker},enumerable:!0,configurable:!0});return WjFlexChartLineMarker}(WjDirective);export{WjFlexChartLineMarker};var WjFlexChartDataPoint=function(e){__extends(WjFlexChartDataPoint,e);function WjFlexChartDataPoint(){var t=e.call(this)||this;t.require=["?^wjFlexChartAnnotation"];return t}Object.defineProperty(WjFlexChartDataPoint.prototype,"_controlConstructor",{get:function(){return wjcChart.DataPoint},enumerable:!0,configurable:!0});return WjFlexChartDataPoint}(WjDirective);export{WjFlexChartDataPoint};var WjFlexPie=function(e){__extends(WjFlexPie,e);function WjFlexPie(){return null!==e&&e.apply(this,arguments)||this}Object.defineProperty(WjFlexPie.prototype,"_controlConstructor",{get:function(){return wjcChart.FlexPie},enumerable:!0,configurable:!0});WjFlexPie.prototype._initProps=function(){e.prototype._initProps.call(this);MetaFactory.findProp("labelContent",this._props).customHandler=function(e,t,r,a,n){null!=r&&(t.dataLabel.content=r)}};return WjFlexPie}(WjFlexChartBase);export{WjFlexPie};var WjFlexChartPlotArea=function(e){__extends(WjFlexChartPlotArea,e);function WjFlexChartPlotArea(){var t=e.call(this)||this;t.require=["?^wjFlexChartPlotArea","?^wjFlexChart","?^wjFinancialChart"];t.template='<div class="wjFlexChartPlotArea" />';return t}Object.defineProperty(WjFlexChartPlotArea.prototype,"_controlConstructor",{get:function(){return wjcChart.PlotArea},enumerable:!0,configurable:!0});WjFlexChartPlotArea.prototype._initControl=function(t){return e.prototype._initControl.call(this,void 0)};return WjFlexChartPlotArea}(WjDirective);export{WjFlexChartPlotArea};