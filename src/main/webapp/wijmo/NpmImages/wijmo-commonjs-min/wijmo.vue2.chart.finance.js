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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(e,i){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var a in i)i.hasOwnProperty(a)&&(e[a]=i[a])})(e,i)};return function(e,i){extendStatics(e,i);function __(){this.constructor=e}e.prototype=null===i?Object.create(i):(__.prototype=i.prototype,new __)}}(),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(i[a]=e[a]);i.default=e;return i};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),wjcChartFinance=__importStar(require("wijmo/wijmo.chart.finance")),WjFinancialChartBehavior=function(e){__extends(WjFinancialChartBehavior,e);function WjFinancialChartBehavior(){return null!==e&&e.apply(this,arguments)||this}WjFinancialChartBehavior.prototype._updateControl=function(i,a){switch(i){case"tooltipContent":this.control.tooltip.content=a;break;case"labelContent":this.control.dataLabel.content=a;break;default:e.prototype._updateControl.call(this,i,a)}};WjFinancialChartBehavior.tag="wj-financial-chart";WjFinancialChartBehavior.props=["renderEngine","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingX","interpolateNulls","legendToggle","symbolSize","options","selection","itemFormatter","labelContent","chartType"];WjFinancialChartBehavior.events=["initialized","gotFocus","lostFocus","refreshing","refreshed","invalidInput","rendering","rendered","itemsSourceChanging","itemsSourceChanged","seriesVisibilityChanged"];WjFinancialChartBehavior.changeEvents={selectionChanged:["selection"]};WjFinancialChartBehavior.classCtor=function(){return wjcChartFinance.FinancialChart};return WjFinancialChartBehavior}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFinancialChart=WjFinancialChartBehavior.register();function registerV3WjFinancialChart(e){e.component(WjFinancialChartBehavior.tag,exports.WjFinancialChart)}var WjFinancialChartSeriesBehavior=function(e){__extends(WjFinancialChartSeriesBehavior,e);function WjFinancialChartSeriesBehavior(){return null!==e&&e.apply(this,arguments)||this}WjFinancialChartSeriesBehavior.tag="wj-financial-chart-series";WjFinancialChartSeriesBehavior.parentProp="series";WjFinancialChartSeriesBehavior.siblingId="series";WjFinancialChartSeriesBehavior.props=["wjProperty","axisX","axisY","binding","bindingX","cssClass","name","altStyle","symbolMarker","symbolSize","symbolStyle","visibility","itemsSource","interpolateNulls","tooltipContent","itemFormatter","chartType"];WjFinancialChartSeriesBehavior.events=["initialized","rendering","rendered"];WjFinancialChartSeriesBehavior.changeEvents={"chart.seriesVisibilityChanged":["visibility"]};WjFinancialChartSeriesBehavior.classCtor=function(){return wjcChartFinance.FinancialSeries};return WjFinancialChartSeriesBehavior}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFinancialChartSeries=WjFinancialChartSeriesBehavior.register();function registerV3WjFinancialChartSeries(e){e.component(WjFinancialChartSeriesBehavior.tag,exports.WjFinancialChartSeries)}function registerChartFinance(e){if(wijmo_vue2_base_1.VueApi.isV3Plus){registerV3WjFinancialChart(e);registerV3WjFinancialChartSeries(e)}}exports.registerChartFinance=registerChartFinance;