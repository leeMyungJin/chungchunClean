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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";export class Sunburst extends ComponentBase{constructor(t){super(t,wjcChartHierarchical.Sunburst,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","bindingName","childItemsPath"]})}componentDidMount(){let t=super.componentDidMount();this._setExtra(this.props);return t}componentDidUpdate(t){super.componentDidUpdate(t);this._setExtra(this.props)}_setExtra(t){"tooltipContent"in t&&(this.control.tooltip.content=t.tooltipContent);"labelContent"in t&&(this.control.dataLabel.content=t.labelContent)}}export class TreeMap extends ComponentBase{constructor(t){super(t,wjcChartHierarchical.TreeMap,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","bindingName","childItemsPath"]})}componentDidMount(){let t=super.componentDidMount();this._setExtra(this.props);return t}componentDidUpdate(t){super.componentDidUpdate(t);this._setExtra(this.props)}_setExtra(t){"tooltipContent"in t&&(this.control.tooltip.content=t.tooltipContent);"labelContent"in t&&(this.control.dataLabel.content=t.labelContent)}}