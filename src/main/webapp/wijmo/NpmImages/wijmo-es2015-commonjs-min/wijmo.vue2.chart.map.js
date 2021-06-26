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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(r[a]=e[a]);r.default=e;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),wjcChartMap=__importStar(require("wijmo/wijmo.chart.map"));class WjFlexMapBehavior extends wijmo_vue2_base_1.WjComponentBehavior{_updateControl(e,r){switch(e){case"tooltipContent":this.control.tooltip.content=r;break;default:super._updateControl(e,r)}}}WjFlexMapBehavior.tag="wj-flex-map";WjFlexMapBehavior.props=["isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","center","zoom"];WjFlexMapBehavior.events=["initialized","gotFocus","lostFocus","refreshing","refreshed","invalidInput","rendering","rendered","selectionChanged","itemsSourceChanging","itemsSourceChanged"];WjFlexMapBehavior.classCtor=function(){return wjcChartMap.FlexMap};exports.WjFlexMap=WjFlexMapBehavior.register();function registerV3WjFlexMap(e){e.component(WjFlexMapBehavior.tag,exports.WjFlexMap)}class WjScatterMapLayerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjScatterMapLayerBehavior.tag="wj-scatter-map-layer";WjScatterMapLayerBehavior.parentProp="layers";WjScatterMapLayerBehavior.siblingId="layers";WjScatterMapLayerBehavior.props=["wjProperty","itemsSource","url","symbolSize","symbolMinSize","symbolMaxSize","binding"];WjScatterMapLayerBehavior.events=["initialized"];WjScatterMapLayerBehavior.changeEvents={itemsSourceChanged:["itemsSource"]};WjScatterMapLayerBehavior.classCtor=function(){return wjcChartMap.ScatterMapLayer};exports.WjScatterMapLayer=WjScatterMapLayerBehavior.register();function registerV3WjScatterMapLayer(e){e.component(WjScatterMapLayerBehavior.tag,exports.WjScatterMapLayer)}class WjGeoMapLayerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjGeoMapLayerBehavior.tag="wj-geo-map-layer";WjGeoMapLayerBehavior.parentProp="layers";WjGeoMapLayerBehavior.siblingId="layers";WjGeoMapLayerBehavior.props=["wjProperty","itemsSource","url","itemFormatter"];WjGeoMapLayerBehavior.events=["initialized"];WjGeoMapLayerBehavior.changeEvents={itemsSourceChanged:["itemsSource"]};WjGeoMapLayerBehavior.classCtor=function(){return wjcChartMap.GeoMapLayer};exports.WjGeoMapLayer=WjGeoMapLayerBehavior.register();function registerV3WjGeoMapLayer(e){e.component(WjGeoMapLayerBehavior.tag,exports.WjGeoMapLayer)}class WjGeoGridLayerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjGeoGridLayerBehavior.tag="wj-geo-grid-layer";WjGeoGridLayerBehavior.parentProp="layers";WjGeoGridLayerBehavior.siblingId="layers";WjGeoGridLayerBehavior.props=["wjProperty","itemsSource","url"];WjGeoGridLayerBehavior.events=["initialized"];WjGeoGridLayerBehavior.changeEvents={itemsSourceChanged:["itemsSource"]};WjGeoGridLayerBehavior.classCtor=function(){return wjcChartMap.GeoGridLayer};exports.WjGeoGridLayer=WjGeoGridLayerBehavior.register();function registerV3WjGeoGridLayer(e){e.component(WjGeoGridLayerBehavior.tag,exports.WjGeoGridLayer)}class WjColorScaleBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjColorScaleBehavior.tag="wj-color-scale";WjColorScaleBehavior.parentProp="colorScale";WjColorScaleBehavior.props=["wjProperty","scale","binding","colorUnknown","colors","format"];WjColorScaleBehavior.events=["initialized"];WjColorScaleBehavior.classCtor=function(){return wjcChartMap.ColorScale};exports.WjColorScale=WjColorScaleBehavior.register();function registerV3WjColorScale(e){e.component(WjColorScaleBehavior.tag,exports.WjColorScale)}function registerChartMap(e){if(wijmo_vue2_base_1.VueApi.isV3Plus){registerV3WjFlexMap(e);registerV3WjScatterMapLayer(e);registerV3WjGeoMapLayer(e);registerV3WjGeoGridLayer(e);registerV3WjColorScale(e)}}exports.registerChartMap=registerChartMap;