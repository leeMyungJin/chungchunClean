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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var o in e)Object.hasOwnProperty.call(e,o)&&(r[o]=e[o]);r.default=e;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=__importStar(require("knockout")),wjcNav=__importStar(require("wijmo/wijmo.nav"));var wjKo=mKo;class wjTreeView extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcNav.TreeView}}exports.wjTreeView=wjTreeView;wjKo.bindingHandlers.wjTreeView=new wjTreeView;