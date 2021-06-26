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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";import*as wjGrid from"wijmo/wijmo.react.grid";export class MultiRow extends ComponentBase{constructor(e){super(e,wjcGridMultirow.MultiRow,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold","columnGroups","layoutDefinition","headerLayoutDefinition"]})}_createControl(){let e=super._createControl();new wjGrid.DirectiveCellFactory(this,e);return e}}export class MultiRowCell extends ComponentBase{constructor(e){super(e,wjcGridMultirow.MultiRowCell,{objectProps:["dataMap","cellTemplate","editor"]});this._parentProp="cells"}}export class MultiRowCellGroup extends ComponentBase{constructor(e){super(e,wjcGridMultirow.MultiRowCellGroup,{objectProps:["dataMap","cellTemplate","editor"]});this._parentProp="layoutDefinition"}}export class MultiRowCellTemplate extends wjGrid.FlexGridCellTemplate{get template(){return this.props[MultiRowCellTemplate._CellRenderFuncProp]}}