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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(t,n){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i])})(t,n)};return function(t,n){extendStatics(t,n);function __(){this.constructor=t}t.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(n[i]=t[i]);n.default=t;return n};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_chart_1=require("wijmo/wijmo.knockout.chart"),mKo=__importStar(require("knockout")),wjcChartFin=__importStar(require("wijmo/wijmo.chart.finance")),wjKo=mKo,wjFinancialChart=function(t){__extends(wjFinancialChart,t);function wjFinancialChart(){return null!==t&&t.apply(this,arguments)||this}wjFinancialChart.prototype._getControlConstructor=function(){return wjcChartFin.FinancialChart};wjFinancialChart.prototype._initialize=function(){t.prototype._initialize.call(this);wijmo_knockout_base_1.MetaFactory.findProp("labelContent",this._metaData.props).updateControl=function(t,n,i,r,a){null!=a&&(i.dataLabel.content=a);return!0}};return wjFinancialChart}(wijmo_knockout_chart_1.WjFlexChartBaseBinding);exports.wjFinancialChart=wjFinancialChart;var wjFinancialChartSeries=function(t){__extends(wjFinancialChartSeries,t);function wjFinancialChartSeries(){return null!==t&&t.apply(this,arguments)||this}wjFinancialChartSeries.prototype._getControlConstructor=function(){return wjcChartFin.FinancialSeries};wjFinancialChartSeries.prototype._createWijmoContext=function(){return new WjFinancialChartSeriesContext(this)};return wjFinancialChartSeries}(wijmo_knockout_base_1.WjBinding);exports.wjFinancialChartSeries=wjFinancialChartSeries;var WjFinancialChartSeriesContext=function(t){__extends(WjFinancialChartSeriesContext,t);function WjFinancialChartSeriesContext(){return null!==t&&t.apply(this,arguments)||this}WjFinancialChartSeriesContext.prototype._initControl=function(){var n=this;t.prototype._initControl.call(this);var i=this.parentWjContext.control;i instanceof wjcChartFin.FinancialChart&&i.seriesVisibilityChanged.addHandler((function(t,i){n._updateSource()}))};return WjFinancialChartSeriesContext}(wijmo_knockout_base_1.WjContext);exports.WjFinancialChartSeriesContext=WjFinancialChartSeriesContext;wjKo.bindingHandlers.wjFinancialChart=new wjFinancialChart;wjKo.bindingHandlers.wjFinancialChartSeries=new wjFinancialChartSeries;