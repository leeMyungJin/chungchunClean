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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChartInteraction=__importStar(require("wijmo/wijmo.chart.interaction"));let _wj_ns_exists_6=!0;class WjcFlexChartRangeSelector extends HTMLElement{constructor(){super();this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartRangeSelector.wrappedClass=()=>wjcChartInteraction.RangeSelector;WjcFlexChartRangeSelector.parentInCtor=!0;exports.WjcFlexChartRangeSelector=WjcFlexChartRangeSelector;_wj_ns_exists_6&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-range-selector",WjcFlexChartRangeSelector);class WjcFlexChartGestures extends HTMLElement{constructor(){super();this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,r){this._wjBehaviour.lhAttributeChanged(e,t,r)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartGestures.wrappedClass=()=>wjcChartInteraction.ChartGestures;WjcFlexChartGestures.parentInCtor=!0;exports.WjcFlexChartGestures=WjcFlexChartGestures;_wj_ns_exists_6&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-gestures",WjcFlexChartGestures);