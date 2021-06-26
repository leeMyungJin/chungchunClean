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

var __extends=this&&this.__extends||function(){var extendStatics=function(t,o){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(t,o)};return function(t,o){extendStatics(t,o);function __(){this.constructor=t}t.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}();import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcGridTransposedmultirow from"wijmo/wijmo.grid.transposedmultirow";var _wj_ns_exists_16=!0,WjcTransposedMultiRow=function(t){__extends(WjcTransposedMultiRow,t);function WjcTransposedMultiRow(){var o=t.call(this,document.createElement("div"))||this;o._wjBehaviour=WjComponentBehavior._attach(o);return o}Object.defineProperty(WjcTransposedMultiRow,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcTransposedMultiRow.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcTransposedMultiRow.prototype.attributeChangedCallback=function(t,o,e){this._wjBehaviour.lhAttributeChanged(t,o,e)};WjcTransposedMultiRow.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcTransposedMultiRow.prototype.addEventListener=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];"string"==typeof o[0]?HTMLElement.prototype.addEventListener.apply(this,o):t.prototype.addEventListener.apply(this,o)};return WjcTransposedMultiRow}(wjcGridTransposedmultirow.TransposedMultiRow);export{WjcTransposedMultiRow};_wj_ns_exists_16&&WjComponentBehavior.register("wjc-transposed-multi-row",WjcTransposedMultiRow);