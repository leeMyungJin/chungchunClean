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

"use strict";var __importStar=this&&this.__importStar||function(o){if(o&&o.__esModule)return o;var t={};if(null!=o)for(var r in o)Object.hasOwnProperty.call(o,r)&&(t[r]=o[r]);t.default=o;return t};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_grid_1=require("wijmo/wijmo.knockout.grid"),mKo=__importStar(require("knockout")),wjcOlap=__importStar(require("wijmo/wijmo.olap"));var wjKo=mKo;class wjPivotGrid extends wijmo_knockout_grid_1.wjFlexGrid{_getControlConstructor(){return wjcOlap.PivotGrid}}exports.wjPivotGrid=wjPivotGrid;class wjPivotChart extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcOlap.PivotChart}}exports.wjPivotChart=wjPivotChart;class wjPivotPanel extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcOlap.PivotPanel}}exports.wjPivotPanel=wjPivotPanel;class wjSlicer extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcOlap.Slicer}}exports.wjSlicer=wjSlicer;wjKo.bindingHandlers.wjPivotGrid=new wjPivotGrid;wjKo.bindingHandlers.wjPivotChart=new wjPivotChart;wjKo.bindingHandlers.wjPivotPanel=new wjPivotPanel;wjKo.bindingHandlers.wjSlicer=new wjSlicer;