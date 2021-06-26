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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}();import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcGrid from"wijmo/wijmo.grid";var _wj_ns_exists_17=!0,WjcFlexGrid=function(e){__extends(WjcFlexGrid,e);function WjcFlexGrid(){var t=e.call(this,document.createElement("div"))||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexGrid,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexGrid.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexGrid.prototype.attributeChangedCallback=function(e,t,n){this._wjBehaviour.lhAttributeChanged(e,t,n)};WjcFlexGrid.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexGrid.prototype.addEventListener=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];"string"==typeof t[0]?HTMLElement.prototype.addEventListener.apply(this,t):e.prototype.addEventListener.apply(this,t)};return WjcFlexGrid}(wjcGrid.FlexGrid);export{WjcFlexGrid};_wj_ns_exists_17&&WjComponentBehavior.register("wjc-flex-grid",WjcFlexGrid);var WjcFlexGridColumn=function(e){__extends(WjcFlexGridColumn,e);function WjcFlexGridColumn(){var t=e.call(this)||this;t._wjBehaviour=WjComponentBehavior._attach(t);return t}Object.defineProperty(WjcFlexGridColumn,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0});WjcFlexGridColumn.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()};WjcFlexGridColumn.prototype.attributeChangedCallback=function(e,t,n){this._wjBehaviour.lhAttributeChanged(e,t,n)};WjcFlexGridColumn.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()};WjcFlexGridColumn.prototype._beforeInitParent=function(){var e=this.parentElement.control;if(e.autoGenerateColumns){e.autoGenerateColumns=!1;e.columns.clear()}};WjcFlexGridColumn.wrappedClass=function(){return wjcGrid.Column};WjcFlexGridColumn.parentProp="columns";return WjcFlexGridColumn}(HTMLElement);export{WjcFlexGridColumn};_wj_ns_exists_17&&WjComponentBehavior.register("wjc-flex-grid-column",WjcFlexGridColumn);