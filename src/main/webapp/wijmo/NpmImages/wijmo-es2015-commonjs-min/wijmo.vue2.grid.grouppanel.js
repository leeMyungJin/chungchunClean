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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var o in e)Object.hasOwnProperty.call(e,o)&&(r[o]=e[o]);r.default=e;return r};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),wjcGridGrouppanel=__importStar(require("wijmo/wijmo.grid.grouppanel"));class WjGroupPanelBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjGroupPanelBehavior.tag="wj-group-panel";WjGroupPanelBehavior.props=["isDisabled","hideGroupedColumns","showDragGlyphs","maxGroups","placeholder","filter","grid"];WjGroupPanelBehavior.events=["initialized","gotFocus","lostFocus","refreshing","refreshed","invalidInput"];WjGroupPanelBehavior.classCtor=function(){return wjcGridGrouppanel.GroupPanel};exports.WjGroupPanel=WjGroupPanelBehavior.register();function registerV3WjGroupPanel(e){e.component(WjGroupPanelBehavior.tag,exports.WjGroupPanel)}function registerGridGrouppanel(e){wijmo_vue2_base_1.VueApi.isV3Plus&&registerV3WjGroupPanel(e)}exports.registerGridGrouppanel=registerGridGrouppanel;