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

var __extends=this&&this.__extends||function(){var extendStatics=function(r,o){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var t in o)o.hasOwnProperty(t)&&(r[t]=o[t])})(r,o)};return function(r,o){extendStatics(r,o);function __(){this.constructor=r}r.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}();import{_registerNgModule,softRefGridMultirow}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";var wjNg=mNg,wijmoGridMultirowName="wj.grid.multirow";export var ngModuleName=wijmoGridMultirowName;var wijmoGridMultirow=_registerNgModule(wijmoGridMultirowName);softRefGridMultirow()&&wijmoGridMultirow.directive("wjMultiRow",["$compile","$interpolate",function(r,o){return new WjMultiRow(r,o)}]);var WjMultiRow=function(r){__extends(WjMultiRow,r);function WjMultiRow(o,t){return r.call(this,o,t)||this}Object.defineProperty(WjMultiRow.prototype,"_controlConstructor",{get:function(){return wjcGridMultirow.MultiRow},enumerable:!0,configurable:!0});return WjMultiRow}(WjFlexGrid);export{WjMultiRow};