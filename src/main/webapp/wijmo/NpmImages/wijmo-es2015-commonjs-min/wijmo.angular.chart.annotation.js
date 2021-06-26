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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var a in t)Object.hasOwnProperty.call(t,a)&&(n[a]=t[a]);n.default=t;return n};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=__importStar(require("angular")),wjcChartAnnotation=__importStar(require("wijmo/wijmo.chart.annotation"));var wjNg=mNg;const wijmoChartAnnotationName="wj.chart.annotation";exports.ngModuleName="wj.chart.annotation";var wijmoChartAnnotation=wijmo_angular_base_1._registerNgModule("wj.chart.annotation");if(wijmo_angular_base_1.softRefChartAnnotation()){wijmoChartAnnotation.directive("wjFlexChartAnnotationLayer",[function(){return new WjFlexChartAnnotationLayer}]);wijmoChartAnnotation.directive("wjFlexChartAnnotation",[function(){return new WjFlexChartAnnotation}])}class WjFlexChartAnnotationLayer extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require=["?^wjFlexChart","?^wjFinancialChart"];this.template='<div class="wjFlexChartAnnotationLayer" ng-transclude />';this.transclude=!0}get _controlConstructor(){return wjcChartAnnotation.AnnotationLayer}}exports.WjFlexChartAnnotationLayer=WjFlexChartAnnotationLayer;class WjFlexChartAnnotation extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require="^wjFlexChartAnnotationLayer";this.template='<div class="wjFlexChartAnnotation" ng-transclude />';this.transclude=!0}_createLink(){return new WjFlexChartAnnotationLink}_getMetaDataId(){return"FlexChartAnnotation"}}exports.WjFlexChartAnnotation=WjFlexChartAnnotation;class WjFlexChartAnnotationLink extends wijmo_angular_base_1.WjLink{_initControl(){return new wjcChartAnnotation[this.scope.type]}}exports.WjFlexChartAnnotationLink=WjFlexChartAnnotationLink;