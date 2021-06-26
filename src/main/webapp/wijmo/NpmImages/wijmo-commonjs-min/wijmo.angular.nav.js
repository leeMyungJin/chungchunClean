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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(e,n){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)};return function(e,n){extendStatics(e,n);function __(){this.constructor=e}e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(n[t]=e[t]);n.default=e;return n};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=__importStar(require("angular")),wjcNav=__importStar(require("wijmo/wijmo.nav")),wjNg=mNg,wijmoNavName="wj.nav";exports.ngModuleName=wijmoNavName;var wijmoNav=wijmo_angular_base_1._registerNgModule(wijmoNavName);if(wijmo_angular_base_1.softRefNav()){wijmoNav.directive("wjTreeView",[function(){return new WjTreeView}]);wijmoNav.directive("wjTabPanel",[function(){return new WjTabPanel}]);wijmoNav.directive("wjTab",[function(){return new WjTab}])}var WjTreeView=function(e){__extends(WjTreeView,e);function WjTreeView(){var n=e.call(this)||this;n.transclude=!0;n.template="<div ng-transclude />";return n}Object.defineProperty(WjTreeView.prototype,"_controlConstructor",{get:function(){return wjcNav.TreeView},enumerable:!0,configurable:!0});return WjTreeView}(wijmo_angular_base_1.WjDirective);exports.WjTreeView=WjTreeView;var WjTabPanel=function(e){__extends(WjTabPanel,e);function WjTabPanel(){var n=e.call(this)||this;n.transclude=!0;n.template="<div ng-transclude />";return n}Object.defineProperty(WjTabPanel.prototype,"_controlConstructor",{get:function(){return wjcNav.TabPanel},enumerable:!0,configurable:!0});WjTabPanel.prototype._initControl=function(e){var n=new wjcNav.TabPanel(e,null,!0);n.tabs.beginUpdate();return n};WjTabPanel.prototype._createLink=function(){return new WjTabPanelLink};return WjTabPanel}(wijmo_angular_base_1.WjDirective);exports.WjTabPanel=WjTabPanel;var WjTabPanelLink=function(e){__extends(WjTabPanelLink,e);function WjTabPanelLink(){return null!==e&&e.apply(this,arguments)||this}WjTabPanelLink.prototype._onChildrenReady=function(){e.prototype._onChildrenReady.call(this);var n=this.control;n.tabs.endUpdate();n.selectedIndex<0&&n.tabs.length&&(n.selectedIndex=0)};return WjTabPanelLink}(wijmo_angular_base_1.WjLink),WjTab=function(e){__extends(WjTab,e);function WjTab(){var n=e.call(this)||this;n.transclude=!0;n.template="<div ng-transclude />";n.require="^wjTabPanel";return n}Object.defineProperty(WjTab.prototype,"_controlConstructor",{get:function(){return wjcNav.Tab},enumerable:!0,configurable:!0});WjTab.prototype._initControl=function(e){return new wjcNav.Tab(e.children[0],e.children[1])};return WjTab}(wijmo_angular_base_1.WjDirective);exports.WjTab=WjTab;