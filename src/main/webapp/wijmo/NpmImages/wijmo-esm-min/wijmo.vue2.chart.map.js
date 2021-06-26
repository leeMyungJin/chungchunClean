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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,r){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var a in r)r.hasOwnProperty(a)&&(e[a]=r[a])})(e,r)};return function(e,r){extendStatics(e,r);function __(){this.constructor=e}e.prototype=null===r?Object.create(r):(__.prototype=r.prototype,new __)}}();import{VueApi,WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as wjcChartMap from"wijmo/wijmo.chart.map";var WjFlexMapBehavior=function(e){__extends(WjFlexMapBehavior,e);function WjFlexMapBehavior(){return null!==e&&e.apply(this,arguments)||this}WjFlexMapBehavior.prototype._updateControl=function(r,a){switch(r){case"tooltipContent":this.control.tooltip.content=a;break;default:e.prototype._updateControl.call(this,r,a)}};WjFlexMapBehavior.tag="wj-flex-map";WjFlexMapBehavior.props=["isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","center","zoom"];WjFlexMapBehavior.events=["initialized","gotFocus","lostFocus","refreshing","refreshed","invalidInput","rendering","rendered","selectionChanged","itemsSourceChanging","itemsSourceChanged"];WjFlexMapBehavior.classCtor=function(){return wjcChartMap.FlexMap};return WjFlexMapBehavior}(WjComponentBehavior);export var WjFlexMap=WjFlexMapBehavior.register();function registerV3WjFlexMap(e){e.component(WjFlexMapBehavior.tag,WjFlexMap)}var WjScatterMapLayerBehavior=function(e){__extends(WjScatterMapLayerBehavior,e);function WjScatterMapLayerBehavior(){return null!==e&&e.apply(this,arguments)||this}WjScatterMapLayerBehavior.tag="wj-scatter-map-layer";WjScatterMapLayerBehavior.parentProp="layers";WjScatterMapLayerBehavior.siblingId="layers";WjScatterMapLayerBehavior.props=["wjProperty","itemsSource","url","symbolSize","symbolMinSize","symbolMaxSize","binding"];WjScatterMapLayerBehavior.events=["initialized"];WjScatterMapLayerBehavior.changeEvents={itemsSourceChanged:["itemsSource"]};WjScatterMapLayerBehavior.classCtor=function(){return wjcChartMap.ScatterMapLayer};return WjScatterMapLayerBehavior}(WjComponentBehavior);export var WjScatterMapLayer=WjScatterMapLayerBehavior.register();function registerV3WjScatterMapLayer(e){e.component(WjScatterMapLayerBehavior.tag,WjScatterMapLayer)}var WjGeoMapLayerBehavior=function(e){__extends(WjGeoMapLayerBehavior,e);function WjGeoMapLayerBehavior(){return null!==e&&e.apply(this,arguments)||this}WjGeoMapLayerBehavior.tag="wj-geo-map-layer";WjGeoMapLayerBehavior.parentProp="layers";WjGeoMapLayerBehavior.siblingId="layers";WjGeoMapLayerBehavior.props=["wjProperty","itemsSource","url","itemFormatter"];WjGeoMapLayerBehavior.events=["initialized"];WjGeoMapLayerBehavior.changeEvents={itemsSourceChanged:["itemsSource"]};WjGeoMapLayerBehavior.classCtor=function(){return wjcChartMap.GeoMapLayer};return WjGeoMapLayerBehavior}(WjComponentBehavior);export var WjGeoMapLayer=WjGeoMapLayerBehavior.register();function registerV3WjGeoMapLayer(e){e.component(WjGeoMapLayerBehavior.tag,WjGeoMapLayer)}var WjGeoGridLayerBehavior=function(e){__extends(WjGeoGridLayerBehavior,e);function WjGeoGridLayerBehavior(){return null!==e&&e.apply(this,arguments)||this}WjGeoGridLayerBehavior.tag="wj-geo-grid-layer";WjGeoGridLayerBehavior.parentProp="layers";WjGeoGridLayerBehavior.siblingId="layers";WjGeoGridLayerBehavior.props=["wjProperty","itemsSource","url"];WjGeoGridLayerBehavior.events=["initialized"];WjGeoGridLayerBehavior.changeEvents={itemsSourceChanged:["itemsSource"]};WjGeoGridLayerBehavior.classCtor=function(){return wjcChartMap.GeoGridLayer};return WjGeoGridLayerBehavior}(WjComponentBehavior);export var WjGeoGridLayer=WjGeoGridLayerBehavior.register();function registerV3WjGeoGridLayer(e){e.component(WjGeoGridLayerBehavior.tag,WjGeoGridLayer)}var WjColorScaleBehavior=function(e){__extends(WjColorScaleBehavior,e);function WjColorScaleBehavior(){return null!==e&&e.apply(this,arguments)||this}WjColorScaleBehavior.tag="wj-color-scale";WjColorScaleBehavior.parentProp="colorScale";WjColorScaleBehavior.props=["wjProperty","scale","binding","colorUnknown","colors","format"];WjColorScaleBehavior.events=["initialized"];WjColorScaleBehavior.classCtor=function(){return wjcChartMap.ColorScale};return WjColorScaleBehavior}(WjComponentBehavior);export var WjColorScale=WjColorScaleBehavior.register();function registerV3WjColorScale(e){e.component(WjColorScaleBehavior.tag,WjColorScale)}export function registerChartMap(e){if(VueApi.isV3Plus){registerV3WjFlexMap(e);registerV3WjScatterMapLayer(e);registerV3WjGeoMapLayer(e);registerV3WjGeoGridLayer(e);registerV3WjColorScale(e)}}