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

var __extends=this&&this.__extends||function(){var extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)};return function(t,e){extendStatics(t,e);function __(){this.constructor=t}t.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}}();import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcSheet from"wijmo/wijmo.grid.sheet";var wjKo=mKo,wjFlexSheet=function(t){__extends(wjFlexSheet,t);function wjFlexSheet(){return null!==t&&t.apply(this,arguments)||this}wjFlexSheet.prototype._getControlConstructor=function(){return wjcSheet.FlexSheet};return wjFlexSheet}(wjFlexGrid);export{wjFlexSheet};var wjSheet=function(t){__extends(wjSheet,t);function wjSheet(){return null!==t&&t.apply(this,arguments)||this}wjSheet.prototype._getControlConstructor=function(){return wjcSheet.Sheet};wjSheet.prototype._createWijmoContext=function(){return new WjSheetContext(this)};return wjSheet}(WjBinding);export{wjSheet};var WjSheetContext=function(t){__extends(WjSheetContext,t);function WjSheetContext(){return null!==t&&t.apply(this,arguments)||this}WjSheetContext.prototype._initControl=function(){t.prototype._initControl.call(this);var e=this.valueAccessor(),o=this.parentWjContext.control,n=wjKo.unwrap(e.itemsSource),r=wjKo.unwrap(e.name);return n?o.addBoundSheet(r,n):o.addUnboundSheet(r,+wjKo.unwrap(e.rowCount),+wjKo.unwrap(e.columnCount))};return WjSheetContext}(WjContext);export{WjSheetContext};wjKo.bindingHandlers.wjFlexSheet=new wjFlexSheet;wjKo.bindingHandlers.wjSheet=new wjSheet;