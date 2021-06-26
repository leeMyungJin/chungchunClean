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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(r,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(r,e)};return function(r,e){extendStatics(r,e);function __(){this.constructor=r}r.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}}(),__importStar=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var t in r)Object.hasOwnProperty.call(r,t)&&(e[t]=r[t]);e.default=r;return e};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=__importStar(require("angular")),wjcGridFilter=__importStar(require("wijmo/wijmo.grid.filter")),wjNg=mNg,wijmoGridFilterName="wj.grid.filter";exports.ngModuleName=wijmoGridFilterName;var wijmoGridFilter=wijmo_angular_base_1._registerNgModule(wijmoGridFilterName);wijmo_angular_base_1.softRefGridFilter()&&wijmoGridFilter.directive("wjFlexGridFilter",[function(){return new WjFlexGridFilter}]);var WjFlexGridFilter=function(r){__extends(WjFlexGridFilter,r);function WjFlexGridFilter(){var e=r.call(this)||this;e.require="^wjFlexGrid";e.template="<div />";return e}Object.defineProperty(WjFlexGridFilter.prototype,"_controlConstructor",{get:function(){return wjcGridFilter.FlexGridFilter},enumerable:!0,configurable:!0});return WjFlexGridFilter}(wijmo_angular_base_1.WjDirective);exports.WjFlexGridFilter=WjFlexGridFilter;