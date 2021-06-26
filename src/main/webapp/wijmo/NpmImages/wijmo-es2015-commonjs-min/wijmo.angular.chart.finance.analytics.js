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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var e in t)Object.hasOwnProperty.call(t,e)&&(r[e]=t[e]);r.default=t;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=__importStar(require("angular")),wjcChartFinAn=__importStar(require("wijmo/wijmo.chart.finance.analytics"));var wjNg=mNg;const wijmoChartFinAnName="wj.chart.finance.analytics";exports.ngModuleName=wijmoChartFinAnName;var wijmoChartFinAn=wijmo_angular_base_1._registerNgModule(wijmoChartFinAnName);if(wijmo_angular_base_1.softRefChartFinanceAnalytics()){wijmoChartFinAn.directive("wjFlexChartFibonacci",[function(){return new WjFlexChartFibonacci}]);wijmoChartFinAn.directive("wjFlexChartFibonacciArcs",[function(){return new WjFlexChartFibonacciArcs}]);wijmoChartFinAn.directive("wjFlexChartFibonacciFans",[function(){return new WjFlexChartFibonacciFans}]);wijmoChartFinAn.directive("wjFlexChartFibonacciTimeZones",[function(){return new WjFlexChartFibonacciTimeZones}]);wijmoChartFinAn.directive("wjFlexChartAtr",[function(){return new WjFlexChartAtr}]);wijmoChartFinAn.directive("wjFlexChartCci",[function(){return new WjFlexChartCci}]);wijmoChartFinAn.directive("wjFlexChartRsi",[function(){return new WjFlexChartRsi}]);wijmoChartFinAn.directive("wjFlexChartWilliamsR",[function(){return new WjFlexChartWilliamsR}]);wijmoChartFinAn.directive("wjFlexChartMacd",[function(){return new WjFlexChartMacd}]);wijmoChartFinAn.directive("wjFlexChartMacdHistogram",[function(){return new WjFlexChartMacdHistogram}]);wijmoChartFinAn.directive("wjFlexChartStochastic",[function(){return new WjFlexChartStochastic}]);wijmoChartFinAn.directive("wjFlexChartBollingerBands",[function(){return new WjFlexChartBollingerBands}]);wijmoChartFinAn.directive("wjFlexChartEnvelopes",[function(){return new WjFlexChartEnvelopes}])}class WjBaseOverlayIndicator extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super();this.require="^wjFinancialChart";this.template='<div class="wjBaseOverlayIndicator" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.OverlayIndicatorBase}}exports.WjBaseOverlayIndicator=WjBaseOverlayIndicator;class WjBaseSingleOverlayIndicator extends WjBaseOverlayIndicator{constructor(){super();this.template='<div class="wjBaseSingleOverlayIndicator" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.SingleOverlayIndicatorBase}}exports.WjBaseSingleOverlayIndicator=WjBaseSingleOverlayIndicator;class WjFlexChartFibonacci extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super();this.require=["?^wjFinancialChart"];this.template='<div class="wjFlexChartFibonacci" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.Fibonacci}_initControl(t){return super._initControl(void 0)}}exports.WjFlexChartFibonacci=WjFlexChartFibonacci;class WjFlexChartFibonacciArcs extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super();this.require=["?^wjFinancialChart"];this.template='<div class="wjFlexChartFibonacciArcs" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.FibonacciArcs}_initControl(t){return super._initControl(void 0)}}exports.WjFlexChartFibonacciArcs=WjFlexChartFibonacciArcs;class WjFlexChartFibonacciFans extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super();this.require=["?^wjFinancialChart"];this.template='<div class="wjFlexChartFibonacciFans" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.FibonacciFans}_initControl(t){return super._initControl(void 0)}}exports.WjFlexChartFibonacciFans=WjFlexChartFibonacciFans;class WjFlexChartFibonacciTimeZones extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super();this.require=["?^wjFinancialChart"];this.template='<div class="wjFlexChartFibonacciTimeZones" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.FibonacciTimeZones}_initControl(t){return super._initControl(void 0)}}exports.WjFlexChartFibonacciTimeZones=WjFlexChartFibonacciTimeZones;class WjFlexChartAtr extends WjBaseSingleOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartAtr" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.ATR}}exports.WjFlexChartAtr=WjFlexChartAtr;class WjFlexChartCci extends WjBaseSingleOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartCci" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.CCI}}exports.WjFlexChartCci=WjFlexChartCci;class WjFlexChartRsi extends WjBaseSingleOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartRsi" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.RSI}}exports.WjFlexChartRsi=WjFlexChartRsi;class WjFlexChartWilliamsR extends WjBaseSingleOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartWilliamsR" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.WilliamsR}}exports.WjFlexChartWilliamsR=WjFlexChartWilliamsR;class WjFlexChartMacdBase extends WjBaseOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartBaseMacd" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.MacdBase}}exports.WjFlexChartMacdBase=WjFlexChartMacdBase;class WjFlexChartMacd extends WjFlexChartMacdBase{constructor(){super();this.template='<div class="wjFlexChartMacd" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.Macd}}exports.WjFlexChartMacd=WjFlexChartMacd;class WjFlexChartMacdHistogram extends WjFlexChartMacdBase{constructor(){super();this.template='<div class="wjFlexChartMacdHistogram" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.MacdHistogram}}exports.WjFlexChartMacdHistogram=WjFlexChartMacdHistogram;class WjFlexChartStochastic extends WjBaseOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartStochastic" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.Stochastic}}exports.WjFlexChartStochastic=WjFlexChartStochastic;class WjFlexChartBollingerBands extends WjBaseOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartBollingerBands" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.BollingerBands}}exports.WjFlexChartBollingerBands=WjFlexChartBollingerBands;class WjFlexChartEnvelopes extends WjBaseOverlayIndicator{constructor(){super();this.template='<div class="wjFlexChartEnvelopes" ng-transclude />'}get _controlConstructor(){return wjcChartFinAn.Envelopes}}exports.WjFlexChartEnvelopes=WjFlexChartEnvelopes;