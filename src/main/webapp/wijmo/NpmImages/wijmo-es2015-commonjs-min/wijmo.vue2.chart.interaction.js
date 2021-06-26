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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);r.default=e;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),wjcChartInteraction=__importStar(require("wijmo/wijmo.chart.interaction"));class WjFlexChartRangeSelectorBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartRangeSelectorBehavior.tag="wj-flex-chart-range-selector";WjFlexChartRangeSelectorBehavior.parentInCtor=!0;WjFlexChartRangeSelectorBehavior.props=["isVisible","min","max","orientation","seamless","minScale","maxScale"];WjFlexChartRangeSelectorBehavior.events=["initialized","rangeChanged"];WjFlexChartRangeSelectorBehavior.classCtor=function(){return wjcChartInteraction.RangeSelector};exports.WjFlexChartRangeSelector=WjFlexChartRangeSelectorBehavior.register();function registerV3WjFlexChartRangeSelector(e){e.component(WjFlexChartRangeSelectorBehavior.tag,exports.WjFlexChartRangeSelector)}class WjFlexChartGesturesBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartGesturesBehavior.tag="wj-flex-chart-gestures";WjFlexChartGesturesBehavior.parentInCtor=!0;WjFlexChartGesturesBehavior.props=["mouseAction","interactiveAxes","enable","scaleX","scaleY","posX","posY"];WjFlexChartGesturesBehavior.events=["initialized"];WjFlexChartGesturesBehavior.classCtor=function(){return wjcChartInteraction.ChartGestures};exports.WjFlexChartGestures=WjFlexChartGesturesBehavior.register();function registerV3WjFlexChartGestures(e){e.component(WjFlexChartGesturesBehavior.tag,exports.WjFlexChartGestures)}function registerChartInteraction(e){if(wijmo_vue2_base_1.VueApi.isV3Plus){registerV3WjFlexChartRangeSelector(e);registerV3WjFlexChartGestures(e)}}exports.registerChartInteraction=registerChartInteraction;