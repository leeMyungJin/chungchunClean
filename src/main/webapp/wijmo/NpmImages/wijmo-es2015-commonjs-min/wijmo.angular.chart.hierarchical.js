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

"use strict";var __importStar=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var a={};if(null!=r)for(var e in r)Object.hasOwnProperty.call(r,e)&&(a[e]=r[e]);a.default=r;return a};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=__importStar(require("angular")),wjcChartHierarchical=__importStar(require("wijmo/wijmo.chart.hierarchical"));var wjNg=mNg;const wijmoChartHierarchicalName="wj.chart.hierarchical";exports.ngModuleName="wj.chart.hierarchical";var wijmoChartHierarchical=wijmo_angular_base_1._registerNgModule("wj.chart.hierarchical");if(wijmo_angular_base_1.softRefChartHierarchical){wijmoChartHierarchical.directive("wjSunburst",[function(){return new WjSunburst}]);wijmoChartHierarchical.directive("wjTreeMap",[function(){return new WjTreeMap}])}class WjSunburst extends wijmo_angular_chart_1.WjFlexPie{get _controlConstructor(){return wjcChartHierarchical.Sunburst}}exports.WjSunburst=WjSunburst;class WjTreeMap extends wijmo_angular_chart_1.WjFlexChartBase{get _controlConstructor(){return wjcChartHierarchical.TreeMap}_initProps(){super._initProps();wijmo_angular_base_1.MetaFactory.findProp("labelContent",this._props).customHandler=function(r,a,e,t,i){null!=e&&(a.dataLabel.content=e)}}}exports.WjTreeMap=WjTreeMap;