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

"use strict";var __importStar=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var i in r)Object.hasOwnProperty.call(r,i)&&(e[i]=r[i]);e.default=r;return e};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=__importStar(require("angular")),wjcGridFilter=__importStar(require("wijmo/wijmo.grid.filter"));var wjNg=mNg;const wijmoGridFilterName="wj.grid.filter";exports.ngModuleName="wj.grid.filter";var wijmoGridFilter=wijmo_angular_base_1._registerNgModule("wj.grid.filter");wijmo_angular_base_1.softRefGridFilter()&&wijmoGridFilter.directive("wjFlexGridFilter",[function(){return new WjFlexGridFilter}]);class WjFlexGridFilter extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require="^wjFlexGrid";this.template="<div />"}get _controlConstructor(){return wjcGridFilter.FlexGridFilter}}exports.WjFlexGridFilter=WjFlexGridFilter;