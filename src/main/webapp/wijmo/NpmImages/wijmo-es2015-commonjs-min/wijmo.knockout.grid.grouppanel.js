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

"use strict";var __importStar=this&&this.__importStar||function(r){if(r&&r.__esModule)return r;var o={};if(null!=r)for(var e in r)Object.hasOwnProperty.call(r,e)&&(o[e]=r[e]);o.default=r;return o};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=__importStar(require("knockout")),wjcGroup=__importStar(require("wijmo/wijmo.grid.grouppanel"));var wjKo=mKo;class wjGroupPanel extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcGroup.GroupPanel}}exports.wjGroupPanel=wjGroupPanel;wjKo.bindingHandlers.wjGroupPanel=new wjGroupPanel;