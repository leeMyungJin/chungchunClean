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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);r.default=e;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=__importStar(require("knockout")),wjcChartInter=__importStar(require("wijmo/wijmo.chart.interaction"));var wjKo=mKo;class wjFlexChartRangeSelector extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartInter.RangeSelector}}exports.wjFlexChartRangeSelector=wjFlexChartRangeSelector;class wjFlexChartGestures extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartInter.ChartGestures}}exports.wjFlexChartGestures=wjFlexChartGestures;wjKo.bindingHandlers.wjFlexChartRangeSelector=new wjFlexChartRangeSelector;wjKo.bindingHandlers.wjFlexChartGestures=new wjFlexChartGestures;