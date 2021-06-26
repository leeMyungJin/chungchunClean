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

var __extends=this&&this.__extends||function(){var extendStatics=function(r,o){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var e in o)o.hasOwnProperty(e)&&(r[e]=o[e])})(r,o)};return function(r,o){extendStatics(r,o);function __(){this.constructor=r}r.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}();import{VueApi,WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as wjcGridGrouppanel from"wijmo/wijmo.grid.grouppanel";var WjGroupPanelBehavior=function(r){__extends(WjGroupPanelBehavior,r);function WjGroupPanelBehavior(){return null!==r&&r.apply(this,arguments)||this}WjGroupPanelBehavior.tag="wj-group-panel";WjGroupPanelBehavior.props=["isDisabled","hideGroupedColumns","showDragGlyphs","maxGroups","placeholder","filter","grid"];WjGroupPanelBehavior.events=["initialized","gotFocus","lostFocus","refreshing","refreshed","invalidInput"];WjGroupPanelBehavior.classCtor=function(){return wjcGridGrouppanel.GroupPanel};return WjGroupPanelBehavior}(WjComponentBehavior);export var WjGroupPanel=WjGroupPanelBehavior.register();function registerV3WjGroupPanel(r){r.component(WjGroupPanelBehavior.tag,WjGroupPanel)}export function registerGridGrouppanel(r){VueApi.isV3Plus&&registerV3WjGroupPanel(r)}