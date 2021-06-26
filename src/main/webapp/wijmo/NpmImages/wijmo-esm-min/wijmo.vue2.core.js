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

import{VueApi}from"wijmo/wijmo.vue2.base";import*as wjcCore from"wijmo/wijmo";var tooltip,WjIncludeDefinition={render:function(i){return VueApi.isV3Plus?VueApi.h("div"):i("div")},props:["src"],mounted:function(){var i=this;wjcCore.httpRequest(this.src,{success:function(o){i.$el.innerHTML=o.response}})}},WjIncludeTag="wj-include";export var WjInclude=VueApi.isV3Plus?WjIncludeDefinition:VueApi.component(WjIncludeTag,WjIncludeDefinition);function registerV3WjInclude(i){i.component(WjIncludeTag,WjInclude)}export var wjFormat=function(i,o){return wjcCore.Globalize.format(i,o)};export var WjFormat=VueApi.isV3Plus?null:VueApi.filter("wj-format",(function(i,o){return wjFormat(i,o)}));function registerV3WjFormat(i){}var tooltipDirectiveDefinition=function(i,o){tooltip||(tooltip=new wjcCore.Tooltip);if(o.oldValue!==o.value){var e=o.value;wjcCore.isObject(e)?tooltip.setTooltip(i,e.tooltip,wjcCore.asEnum(e.position,wjcCore.PopupPosition)):tooltip.setTooltip(i,e)}},WjTooltipTag="wjTooltip";export var WjTooltip=VueApi.isV3Plus?tooltipDirectiveDefinition:VueApi.directive(WjTooltipTag,tooltipDirectiveDefinition);function registerV3WjTooltip(i){i.directive(WjTooltipTag,WjTooltip)}export function registerCore(i){if(VueApi.isV3Plus){registerV3WjInclude(i);registerV3WjFormat(i);registerV3WjTooltip(i)}}