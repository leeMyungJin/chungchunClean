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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(t,o){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(t,o)};return function(t,o){extendStatics(t,o);function __(){this.constructor=t}t.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}(),__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var o={};if(null!=t)for(var r in t)Object.hasOwnProperty.call(t,r)&&(o[r]=t[r]);o.default=t;return o};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_grid_1=require("wijmo/wijmo.knockout.grid"),mKo=__importStar(require("knockout")),wjcOlap=__importStar(require("wijmo/wijmo.olap")),wjKo=mKo,wjPivotGrid=function(t){__extends(wjPivotGrid,t);function wjPivotGrid(){return null!==t&&t.apply(this,arguments)||this}wjPivotGrid.prototype._getControlConstructor=function(){return wjcOlap.PivotGrid};return wjPivotGrid}(wijmo_knockout_grid_1.wjFlexGrid);exports.wjPivotGrid=wjPivotGrid;var wjPivotChart=function(t){__extends(wjPivotChart,t);function wjPivotChart(){return null!==t&&t.apply(this,arguments)||this}wjPivotChart.prototype._getControlConstructor=function(){return wjcOlap.PivotChart};return wjPivotChart}(wijmo_knockout_base_1.WjBinding);exports.wjPivotChart=wjPivotChart;var wjPivotPanel=function(t){__extends(wjPivotPanel,t);function wjPivotPanel(){return null!==t&&t.apply(this,arguments)||this}wjPivotPanel.prototype._getControlConstructor=function(){return wjcOlap.PivotPanel};return wjPivotPanel}(wijmo_knockout_base_1.WjBinding);exports.wjPivotPanel=wjPivotPanel;var wjSlicer=function(t){__extends(wjSlicer,t);function wjSlicer(){return null!==t&&t.apply(this,arguments)||this}wjSlicer.prototype._getControlConstructor=function(){return wjcOlap.Slicer};return wjSlicer}(wijmo_knockout_base_1.WjBinding);exports.wjSlicer=wjSlicer;wjKo.bindingHandlers.wjPivotGrid=new wjPivotGrid;wjKo.bindingHandlers.wjPivotChart=new wjPivotChart;wjKo.bindingHandlers.wjPivotPanel=new wjPivotPanel;wjKo.bindingHandlers.wjSlicer=new wjSlicer;