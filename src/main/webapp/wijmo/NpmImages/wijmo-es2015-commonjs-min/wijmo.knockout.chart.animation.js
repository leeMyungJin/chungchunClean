/*!
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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var o in t)Object.hasOwnProperty.call(t,o)&&(r[o]=t[o]);r.default=t;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=__importStar(require("knockout")),wjcChartAnim=__importStar(require("wijmo/wijmo.chart.animation"));var wjKo=mKo;class wjFlexChartAnimation extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartAnim.ChartAnimation}}exports.wjFlexChartAnimation=wjFlexChartAnimation;wjKo.bindingHandlers.wjFlexChartAnimation=new wjFlexChartAnimation;