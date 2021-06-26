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

"use strict";var __importStar=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var t={};if(null!=r)for(var e in r)Object.hasOwnProperty.call(r,e)&&(t[e]=r[e]);t.default=r;return t};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=__importStar(require("angular")),wjcChartInteraction=__importStar(require("wijmo/wijmo.chart.interaction"));var wjNg=mNg;const wijmoChartInteractionName="wj.chart.interaction";exports.ngModuleName="wj.chart.interaction";var wijmoChartInteraction=wijmo_angular_base_1._registerNgModule("wj.chart.interaction");if(wijmo_angular_base_1.softRefChartInteraction()){wijmoChartInteraction.directive("wjFlexChartRangeSelector",[function(){return new WjFlexChartRangeSelector}]);wijmoChartInteraction.directive("wjFlexChartGestures",[function(){return new WjFlexChartChartGestures}]);wijmoChartInteraction.directive("wjFlexChartChartGestures",[function(){return new WjFlexChartChartGestures}])}class WjFlexChartRangeSelector extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require=["?^wjFlexChart","?^wjFinancialChart"]}get _controlConstructor(){return wjcChartInteraction.RangeSelector}}exports.WjFlexChartRangeSelector=WjFlexChartRangeSelector;class WjFlexChartChartGestures extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require=["?^wjFlexChart","?^wjFinancialChart"]}get _controlConstructor(){return wjcChartInteraction.ChartGestures}}exports.WjFlexChartChartGestures=WjFlexChartChartGestures;