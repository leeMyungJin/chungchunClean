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

import{_registerNgModule,MetaFactory,softRefChartAnalytics}from"wijmo/wijmo.angular.base";import{WjSeriesBase,WjFlexChartSeries}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartAnalytics from"wijmo/wijmo.chart.analytics";var wjNg=mNg;const wijmoChartAnalyticsName="wj.chart.analytics";export const ngModuleName="wj.chart.analytics";var wijmoChartAnalytics=_registerNgModule("wj.chart.analytics");if(softRefChartAnalytics()){wijmoChartAnalytics.directive("wjFlexChartTrendLine",[function(){return new WjFlexChartTrendLine}]);wijmoChartAnalytics.directive("wjFlexChartMovingAverage",[function(){return new WjFlexChartMovingAverage}]);wijmoChartAnalytics.directive("wjFlexChartYFunctionSeries",[function(){return new WjFlexChartYFunctionSeries}]);wijmoChartAnalytics.directive("wjFlexChartParametricFunctionSeries",[function(){return new WjFlexChartParametricFunctionSeries}]);wijmoChartAnalytics.directive("wjFlexChartWaterfall",[function(){return new WjFlexChartWaterfall}]);wijmoChartAnalytics.directive("wjFlexChartBoxWhisker",[function(){return new WjFlexChartBoxWhisker}]);wijmoChartAnalytics.directive("wjFlexChartErrorBar",[function(){return new WjFlexChartErrorBar}])}export class WjTrendLineBase extends WjSeriesBase{constructor(){super();this.require=["?^wjFlexChart","?^wjFinancialChart"];this.template='<div class="wjTrendLineBase" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.TrendLineBase}}export class WjFlexChartTrendLine extends WjTrendLineBase{constructor(){super();this.template='<div class="wjTrendLine" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.TrendLine}}export class WjFlexChartMovingAverage extends WjTrendLineBase{constructor(){super();this.template='<div class="wjMovingAverage" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.MovingAverage}}export class WjFlexChartYFunctionSeries extends WjTrendLineBase{constructor(){super();this.template='<div class="wjYFunctionSeries" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.YFunctionSeries}}export class WjFlexChartParametricFunctionSeries extends WjTrendLineBase{constructor(){super();this.template='<div class="wjParametricFunctionSeries" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.ParametricFunctionSeries}_initProps(){super._initProps();MetaFactory.findProp("func",this._props).customHandler=function(r,t,e,a,n){null!=e&&(t.xFunc=e)}}}export class WjFlexChartWaterfall extends WjSeriesBase{constructor(){super();this.require=["?^wjFlexChart","?^wjFinancialChart"];this.template='<div class="wjWaterfall" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.Waterfall}}export class WjFlexChartBoxWhisker extends WjSeriesBase{constructor(){super();this.require=["?^wjFlexChart","?^wjFinancialChart"];this.template='<div class="wjBoxWhisker" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.BoxWhisker}}export class WjFlexChartErrorBar extends WjFlexChartSeries{constructor(){super();this.require=["?^wjFlexChart"];this.template='<div class="wjErrorBar" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.ErrorBar}}