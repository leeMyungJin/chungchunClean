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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}();import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcChart from"wijmo/wijmo.chart";var _wj_ns_exists_8=!0,WjcFlexChart=function(e){__extends(WjcFlexChart,e);function WjcFlexChart(){var t=e.call(this,document.createElement("div"))||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChart,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChart.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChart.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChart.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChart.prototype.addEventListener=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];"string"==typeof t[0]?HTMLElement.prototype.addEventListener.apply(this,t):e.prototype.addEventListener.apply(this,t)};return WjcFlexChart}(wjcChart.FlexChart);export{WjcFlexChart};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart",WjcFlexChart);var WjcFlexPie=function(e){__extends(WjcFlexPie,e);function WjcFlexPie(){var t=e.call(this,document.createElement("div"))||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexPie,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexPie.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexPie.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexPie.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexPie.prototype.addEventListener=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];"string"==typeof t[0]?HTMLElement.prototype.addEventListener.apply(this,t):e.prototype.addEventListener.apply(this,t)};return WjcFlexPie}(wjcChart.FlexPie);export{WjcFlexPie};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-pie",WjcFlexPie);var WjcFlexChartAxis=function(e){__extends(WjcFlexChartAxis,e);function WjcFlexChartAxis(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartAxis,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartAxis.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartAxis.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartAxis.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartAxis.wrappedClass=function(){return wjcChart.Axis};WjcFlexChartAxis.parentProp="axes";return WjcFlexChartAxis}(HTMLElement);export{WjcFlexChartAxis};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-axis",WjcFlexChartAxis);var WjcFlexChartLegend=function(e){__extends(WjcFlexChartLegend,e);function WjcFlexChartLegend(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartLegend,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartLegend.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartLegend.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartLegend.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartLegend.wrappedClass=function(){return wjcChart.Legend};WjcFlexChartLegend.parentProp="legend";WjcFlexChartLegend.parentInCtor=!0;return WjcFlexChartLegend}(HTMLElement);export{WjcFlexChartLegend};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-legend",WjcFlexChartLegend);var WjcFlexChartDataLabel=function(e){__extends(WjcFlexChartDataLabel,e);function WjcFlexChartDataLabel(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartDataLabel,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartDataLabel.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartDataLabel.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartDataLabel.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartDataLabel.wrappedClass=function(){return wjcChart.DataLabel};WjcFlexChartDataLabel.parentProp="dataLabel";return WjcFlexChartDataLabel}(HTMLElement);export{WjcFlexChartDataLabel};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-data-label",WjcFlexChartDataLabel);var WjcFlexPieDataLabel=function(e){__extends(WjcFlexPieDataLabel,e);function WjcFlexPieDataLabel(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexPieDataLabel,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexPieDataLabel.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexPieDataLabel.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexPieDataLabel.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexPieDataLabel.wrappedClass=function(){return wjcChart.PieDataLabel};WjcFlexPieDataLabel.parentProp="dataLabel";return WjcFlexPieDataLabel}(HTMLElement);export{WjcFlexPieDataLabel};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-pie-data-label",WjcFlexPieDataLabel);var WjcFlexChartSeries=function(e){__extends(WjcFlexChartSeries,e);function WjcFlexChartSeries(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartSeries,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartSeries.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartSeries.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartSeries.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartSeries.wrappedClass=function(){return wjcChart.Series};WjcFlexChartSeries.parentProp="series";WjcFlexChartSeries.siblingId="series";return WjcFlexChartSeries}(HTMLElement);export{WjcFlexChartSeries};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-series",WjcFlexChartSeries);var WjcFlexChartLineMarker=function(e){__extends(WjcFlexChartLineMarker,e);function WjcFlexChartLineMarker(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartLineMarker,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartLineMarker.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartLineMarker.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartLineMarker.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartLineMarker.wrappedClass=function(){return wjcChart.LineMarker};WjcFlexChartLineMarker.parentInCtor=!0;return WjcFlexChartLineMarker}(HTMLElement);export{WjcFlexChartLineMarker};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-line-marker",WjcFlexChartLineMarker);var WjcFlexChartDataPoint=function(e){__extends(WjcFlexChartDataPoint,e);function WjcFlexChartDataPoint(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartDataPoint,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartDataPoint.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartDataPoint.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartDataPoint.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartDataPoint.wrappedClass=function(){return wjcChart.DataPoint};WjcFlexChartDataPoint.parentProp="";return WjcFlexChartDataPoint}(HTMLElement);export{WjcFlexChartDataPoint};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-data-point",WjcFlexChartDataPoint);var WjcFlexChartPlotArea=function(e){__extends(WjcFlexChartPlotArea,e);function WjcFlexChartPlotArea(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexChartPlotArea,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexChartPlotArea.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexChartPlotArea.prototype.attributeChangedCallback=function(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)};WjcFlexChartPlotArea.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexChartPlotArea.wrappedClass=function(){return wjcChart.PlotArea};WjcFlexChartPlotArea.parentProp="plotAreas";return WjcFlexChartPlotArea}(HTMLElement);export{WjcFlexChartPlotArea};_wj_ns_exists_8&&WjComponentBehavior.register("wjc-flex-chart-plot-area",WjcFlexChartPlotArea);