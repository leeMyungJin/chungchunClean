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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var i in e)Object.hasOwnProperty.call(e,i)&&(r[i]=e[i]);r.default=e;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),wjcGridSearch=__importStar(require("wijmo/wijmo.grid.search"));class WjFlexGridSearchBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexGridSearchBehavior.tag="wj-flex-grid-search";WjFlexGridSearchBehavior.props=["isDisabled","text","delay","searchAllColumns","placeholder","cssMatch","grid"];WjFlexGridSearchBehavior.events=["initialized","gotFocus","lostFocus","refreshing","refreshed","invalidInput"];WjFlexGridSearchBehavior.classCtor=function(){return wjcGridSearch.FlexGridSearch};exports.WjFlexGridSearch=WjFlexGridSearchBehavior.register();function registerV3WjFlexGridSearch(e){e.component(WjFlexGridSearchBehavior.tag,exports.WjFlexGridSearch)}function registerGridSearch(e){wijmo_vue2_base_1.VueApi.isV3Plus&&registerV3WjFlexGridSearch(e)}exports.registerGridSearch=registerGridSearch;