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

"use strict";var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}(),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_react_base_1=require("wijmo/wijmo.react.base"),React=__importStar(require("react")),wjcCore=__importStar(require("wijmo/wijmo")),wjcNav=__importStar(require("wijmo/wijmo.nav")),TreeView=function(e){__extends(TreeView,e);function TreeView(t){return e.call(this,t,wjcNav.TreeView,{objectProps:["childItemsPath","displayMemberPath","imageMemberPath","checkedMemberPath","itemsSource","selectedItem","selectedNode","checkedItems"]})||this}return TreeView}(wijmo_react_base_1.ComponentBase);exports.TreeView=TreeView;var TabPanel=function(e){__extends(TabPanel,e);function TabPanel(t){return e.call(this,t,wjcNav.TabPanel,{objectProps:["selectedTab"]})||this}TabPanel.prototype._createControl=function(){var e=new wjcNav.TabPanel(this._getElement(),null,!0);e.tabs.beginUpdate();return e};TabPanel.prototype.componentDidMount=function(){e.prototype.componentDidMount.call(this);var t=this.control,n=t.selectedIndex,r=t.tabs;if(n>-1&&n<r.length){wjcCore.addClass(r[n].header,"wj-state-active");t.onSelectedIndexChanged()}r.endUpdate()};return TabPanel}(wijmo_react_base_1.ComponentBase);exports.TabPanel=TabPanel;var Tab=function(e){__extends(Tab,e);function Tab(t){var n=e.call(this,t,wjcNav.Tab)||this;n._parentProp="tabs";return n}Tab.prototype._createControl=function(){var e=this._getElement().children;return new wjcNav.Tab(e[0],e[1])};Tab.prototype._renderImpl=function(){return React.createElement("div",{ref:this._hostRef},this.props.children)};return Tab}(wijmo_react_base_1.ComponentBase);exports.Tab=Tab;var Accordion=function(e){__extends(Accordion,e);function Accordion(t){return e.call(this,t,wjcNav.Accordion,{objectProps:["selectedPane"]})||this}Accordion.prototype._createControl=function(){var e=new wjcNav.Accordion(this._getElement(),null,!0);e.panes.beginUpdate();return e};Accordion.prototype.componentDidMount=function(){e.prototype.componentDidMount.call(this);var t=this.control,n=t.panes;t.selectedIndex<0&&n.length&&(t.selectedIndex=0);n.endUpdate()};return Accordion}(wijmo_react_base_1.ComponentBase);exports.Accordion=Accordion;var AccordionPane=function(e){__extends(AccordionPane,e);function AccordionPane(t){var n=e.call(this,t,wjcNav.AccordionPane)||this;n._parentProp="panes";return n}AccordionPane.prototype._createControl=function(){var e=this._getElement().children;return new wjcNav.AccordionPane(e[0],e[1])};AccordionPane.prototype._renderImpl=function(){return React.createElement("div",{ref:this._hostRef},this.props.children)};return AccordionPane}(wijmo_react_base_1.ComponentBase);exports.AccordionPane=AccordionPane;