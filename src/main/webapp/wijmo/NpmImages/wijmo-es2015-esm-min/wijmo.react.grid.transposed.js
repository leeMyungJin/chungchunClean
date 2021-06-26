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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcGridTransposed from"wijmo/wijmo.grid.transposed";export class TransposedGrid extends ComponentBase{constructor(o){super(o,wjcGridTransposed.TransposedGrid,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold","columnGroups","rowGroups"]})}}export class TransposedGridRow extends ComponentBase{constructor(o){super(o,wjcGridTransposed.TransposedGridRow,{objectProps:["dataMap","cellTemplate","editor"]});this._parentProp="_rowInfo"}_initParent(){var o=this.parent.control;if(o.autoGenerateRows){o.autoGenerateRows=!1;o._rowInfo.clear()}super._initParent()}}