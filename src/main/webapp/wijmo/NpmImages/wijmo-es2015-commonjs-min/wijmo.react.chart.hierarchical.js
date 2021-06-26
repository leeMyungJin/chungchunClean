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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.hasOwnProperty.call(t,o)&&(e[o]=t[o]);e.default=t;return e};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcChartHierarchical=__importStar(require("wijmo/wijmo.chart.hierarchical"));class Sunburst extends wijmo_react_base_1.ComponentBase{constructor(t){super(t,wjcChartHierarchical.Sunburst,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","bindingName","childItemsPath"]})}componentDidMount(){let t=super.componentDidMount();this._setExtra(this.props);return t}componentDidUpdate(t){super.componentDidUpdate(t);this._setExtra(this.props)}_setExtra(t){"tooltipContent"in t&&(this.control.tooltip.content=t.tooltipContent);"labelContent"in t&&(this.control.dataLabel.content=t.labelContent)}}exports.Sunburst=Sunburst;class TreeMap extends wijmo_react_base_1.ComponentBase{constructor(t){super(t,wjcChartHierarchical.TreeMap,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","bindingName","childItemsPath"]})}componentDidMount(){let t=super.componentDidMount();this._setExtra(this.props);return t}componentDidUpdate(t){super.componentDidUpdate(t);this._setExtra(this.props)}_setExtra(t){"tooltipContent"in t&&(this.control.tooltip.content=t.tooltipContent);"labelContent"in t&&(this.control.dataLabel.content=t.labelContent)}}exports.TreeMap=TreeMap;