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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcGridMultirow=__importStar(require("wijmo/wijmo.grid.multirow")),wjGrid=__importStar(require("wijmo/wijmo.react.grid"));class MultiRow extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcGridMultirow.MultiRow,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold","columnGroups","layoutDefinition","headerLayoutDefinition"]})}_createControl(){let e=super._createControl();new wjGrid.DirectiveCellFactory(this,e);return e}}exports.MultiRow=MultiRow;class MultiRowCell extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcGridMultirow.MultiRowCell,{objectProps:["dataMap","cellTemplate","editor"]});this._parentProp="cells"}}exports.MultiRowCell=MultiRowCell;class MultiRowCellGroup extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcGridMultirow.MultiRowCellGroup,{objectProps:["dataMap","cellTemplate","editor"]});this._parentProp="layoutDefinition"}}exports.MultiRowCellGroup=MultiRowCellGroup;class MultiRowCellTemplate extends wjGrid.FlexGridCellTemplate{get template(){return this.props[MultiRowCellTemplate._CellRenderFuncProp]}}exports.MultiRowCellTemplate=MultiRowCellTemplate;