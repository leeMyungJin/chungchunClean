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

import{VueApi,WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";class WjFlexChartAnimationBehavior extends WjComponentBehavior{}WjFlexChartAnimationBehavior.tag="wj-flex-chart-animation";WjFlexChartAnimationBehavior.parentInCtor=!0;WjFlexChartAnimationBehavior.props=["animationMode","easing","duration","axisAnimation"];WjFlexChartAnimationBehavior.events=["initialized"];WjFlexChartAnimationBehavior.classCtor=function(){return wjcChartAnimation.ChartAnimation};export var WjFlexChartAnimation=WjFlexChartAnimationBehavior.register();function registerV3WjFlexChartAnimation(i){i.component(WjFlexChartAnimationBehavior.tag,WjFlexChartAnimation)}export function registerChartAnimation(i){VueApi.isV3Plus&&registerV3WjFlexChartAnimation(i)}