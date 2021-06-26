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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);e.default=t;return e};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_1=require("wijmo/wijmo"),wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=__importStar(require("angular")),wjcInput=__importStar(require("wijmo/wijmo.input"));var wjNg=mNg;const wijmoInputName="wj.input";exports.ngModuleName="wj.input";var wijmoInput=wijmo_angular_base_1._registerNgModule("wj.input");if(wijmo_angular_base_1.softRefInput()){wijmoInput.directive("wjAutoComplete",["$compile",function(t){return new WjAutoComplete(t)}]);wijmoInput.directive("wjCalendar",[function(){return new WjCalendar}]);wijmoInput.directive("wjColorPicker",[function(){return new WjColorPicker}]);wijmoInput.directive("wjComboBox",["$compile",function(t){return new WjComboBox(t)}]);wijmoInput.directive("wjInputDate",[function(){return new WjInputDate}]);wijmoInput.directive("wjInputDateTime",[function(){return new WjInputDateTime}]);wijmoInput.directive("wjInputNumber",[function(){return new WjInputNumber}]);wijmoInput.directive("wjInputMask",[function(){return new WjInputMask}]);wijmoInput.directive("wjInputTime",["$compile",function(t){return new WjInputTime(t)}]);wijmoInput.directive("wjInputColor",[function(){return new WjInputColor}]);wijmoInput.directive("wjListBox",[function(){return new WjListBox}]);wijmoInput.directive("wjItemTemplate",["$compile",function(t){return new WjItemTemplate(t)}]);wijmoInput.directive("wjMenu",["$compile",function(t){return new WjMenu(t)}]);wijmoInput.directive("wjMenuItem",[function(t){return new WjMenuItem}]);wijmoInput.directive("wjMenuSeparator",[function(){return new WjMenuSeparator}]);wijmoInput.directive("wjContextMenu",[function(){return new WjContextMenu}]);wijmoInput.directive("wjCollectionViewNavigator",[function(){return new WjCollectionViewNavigator}]);wijmoInput.directive("wjCollectionViewPager",[function(){return new WjCollectionViewPager}]);wijmoInput.directive("wjPopup",[function(){return new WjPopup}]);wijmoInput.directive("wjMultiSelect",["$compile",function(t){return new WjMultiSelect(t)}]);wijmoInput.directive("wjMultiAutoComplete",["$compile",function(t){return new WjMultiAutoComplete(t)}])}class WjDropDown extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcInput.DropDown}}exports.WjDropDown=WjDropDown;class WjComboBox extends WjDropDown{constructor(t){super();this._$compile=t;this.template="<div ng-transclude />";this.transclude=!0}get _controlConstructor(){return wjcInput.ComboBox}}exports.WjComboBox=WjComboBox;class WjAutoComplete extends WjComboBox{constructor(t){super(t)}get _controlConstructor(){return wjcInput.AutoComplete}}exports.WjAutoComplete=WjAutoComplete;class WjCalendar extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcInput.Calendar}}exports.WjCalendar=WjCalendar;class WjColorPicker extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcInput.ColorPicker}}exports.WjColorPicker=WjColorPicker;class WjListBox extends wijmo_angular_base_1.WjDirective{constructor(){super();this.transclude=!0;this.template="<div ng-transclude />"}get _controlConstructor(){return wjcInput.ListBox}}exports.WjListBox=WjListBox;class WjItemTemplate extends wijmo_angular_base_1.WjDirective{constructor(t){super();this._$compile=t;this.require=["?^wjListBox","?^wjMenu"];this.terminal=!0;if(wijmo_angular_base_1.WjDirective._dynaTemplates){this.transclude=!1;this.priority=100;this.template=function(t,e){e[WjItemTemplate._itemTemplateProp]=t[0].innerHTML;return"<div />"}}else{this.transclude=!0;this.template="<div ng-transclude/>"}}_initControl(t){return{}}_createLink(){return new WjItemTemplateLink}_getMetaDataId(){return"ItemTemplate"}}WjItemTemplate._itemTemplateProp="$__wjItemTemplate";WjItemTemplate._itemScopeProp="$_itemScope";exports.WjItemTemplate=WjItemTemplate;class WjItemTemplateLink extends wijmo_angular_base_1.WjLink{_initParent(){super._initParent();var t=this.tAttrs[WjItemTemplate._itemTemplateProp],e=this.parent.control,n=this._getListBox();this.itemTemplate=null!=t?t:wijmo_angular_base_1.WjDirective._removeTransclude(this.tElement[0].innerHTML);n.formatItem.addHandler(this._fmtItem,this);n.loadingItems.addHandler(this._loadingItems,this);this.parent._isInitialized&&e.invalidate()}_destroy(){var t=this.parent&&this.parent.control,e=this._getListBox();if(e){e.formatItem.removeHandler(this._fmtItem,this);e.loadingItems.removeHandler(this._loadingItems,this)}super._destroy();this._tmplLink=null;t&&t.invalidate()}_loadingItems(t){for(var e=t.hostElement.getElementsByClassName("wj-listbox-item"),n=e.length-1;n>=0;n--){var r=e[n],i=r[WjItemTemplate._itemScopeProp];if(i){r[WjItemTemplate._itemScopeProp]=null;i.$destroy()}}}_fmtItem(t,e){this._tmplLink||(this._tmplLink=this.directive._$compile("<div>"+this.itemTemplate+"</div>"));var n=e.item,r=this.scope.$parent.$new();n[WjItemTemplate._itemScopeProp]=r;r.$control=t;r.$item=e.data;r.$itemIndex=e.index;var i=this._tmplLink(r,(function(t,e){}))[0];if(1===n.childNodes.length)n.replaceChild(i,n.firstChild);else{n.textContent="";n.appendChild(i)}clearTimeout(this._closingApplyTimeOut);this._closingApplyTimeOut=setTimeout((function(){r.$root.$$phase||r.$apply()}),40)}static _invalidateControl(t){t&&t.invalidate()}_getListBox(){var t=this.parent&&this.parent.control;return t?t instanceof wjcInput.ListBox?t:t.listBox:null}}class WjMenu extends WjComboBox{constructor(t){super(t)}get _controlConstructor(){return wjcInput.Menu}_createLink(){return new WjMenuLink}_initProps(){super._initProps();var t=this;wijmo_angular_base_1.MetaFactory.findProp("value",this._props).customHandler=function(e,n,r,i,o){t.updateControlValue(e,n,o)}}updateControlValue(t,e,n){if(null!=t.value){e.selectedValue=t.value;n.directive.updateHeader(t,e,n)}}updateHeader(t,e,n){e.header=t.header||"";var r=e.selectedItem;if(void 0!==t.value&&r&&e.displayMemberPath){var i=r[WjMenuItem._itemLinkProp],o=i?i.linkedContent.innerHTML:r[e.displayMemberPath];null!=o&&(e.header+=": <b>"+o+"</b>")}}}exports.WjMenu=WjMenu;class WjMenuLink extends wijmo_angular_base_1.WjLink{_initControl(){var t=this,e=new wjcInput.Menu(this.directiveTemplateElement[0],{itemsSource:new wijmo_1.ObservableArray,selectedIndex:0,itemClicked:function(){t._safeApply(t.scope,"value",e.selectedValue)||t.scope.$root.$$phase||t.scope.$apply();t.directive.updateHeader(t.scope,e,t)}.bind(t)});e.listBox.formatItem.addHandler(t._fmtItem,this);e.listBox.loadingItems.addHandler(this._loadingItems,this);return e}_initialized(){this.directive.updateControlValue(this.scope,this.control,this)}_fmtItem(t,e){var n=e.data[WjMenuItem._itemLinkProp];if(n){n.contentLink||(n.contentLink=this.directive._$compile("<div>"+n.itemTemplate+"</div>"));var r=this,i=e.item,o=n.scope.$parent.$new();i[WjMenuItem._itemScopeProp]=o;o.$control=this.control;o.$item=e.data;o.$itemIndex=e.index;var a=n.linkedContent=n.contentLink(o,(function(t,e){}))[0];n.isSeparator&&wijmo_1.addClass(i,"wj-state-disabled");if(1===i.childNodes.length)i.replaceChild(a,i.firstChild);else{i.textContent="";i.appendChild(a)}clearTimeout(this._closingApplyTimeOut);this._closingApplyTimeOut=setTimeout((function(){o.$root.$$phase||o.$apply();r.control.selectedItem&&r.directive.updateHeader(r.scope,r.control,r)}),40)}}_loadingItems(t){for(var e=t.hostElement.getElementsByClassName("wj-listbox-item"),n=e.length-1;n>=0;n--){var r=e[n],i=r[WjMenuItem._itemScopeProp];if(i){r[WjItemTemplate._itemScopeProp]=null;i.$destroy()}}}}class WjMenuItem extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require="^wjMenu";this.terminal=!0;if(wijmo_angular_base_1.WjDirective._dynaTemplates){this.transclude=!1;this.priority=100;this.template=function(t,e){e[WjItemTemplate._itemTemplateProp]=t[0].innerHTML;return"<div />"}}else{this.transclude=!0;this.template="<div ng-transclude/>"}}_createLink(){return new WjMenuItemLink(!1)}_getMetaDataId(){return"MenuItem"}_getId(){return WjMenuItem._directiveId}}WjMenuItem._itemTemplateProp="$__wjMenuItemTemplate";WjMenuItem._itemScopeProp="$_menuItemScope";WjMenuItem._itemLinkProp="$_menuItemLink";WjMenuItem._directiveId="menuItemDir";exports.WjMenuItem=WjMenuItem;class WjMenuItemLink extends wijmo_angular_base_1.WjLink{constructor(t){super();this.isSeparator=t}_initControl(){var t=this.tAttrs[WjItemTemplate._itemTemplateProp];this.itemTemplate=this.isSeparator?'<div class="wj-state-disabled" style="width:100%;height:1px;background-color:lightgray"></div>':null!=t?t:wijmo_angular_base_1.WjDirective._removeTransclude(this.tElement[0].innerHTML);var e={value:null,cmd:null,cmdParam:null,header:this.itemTemplate};e[WjMenuItem._itemLinkProp]=this;return e}_initParent(){super._initParent();var t=this.parent.control;1==t.itemsSource.length&&t.selectedIndex<0&&(t.selectedIndex=0);t.displayMemberPath||(t.displayMemberPath="header");t.selectedValuePath||(t.selectedValuePath="value");t.commandPath||(t.commandPath="cmd");t.commandParameterPath||(t.commandParameterPath="cmdParam")}_destroy(){var t=this.parent&&this.parent.control;super._destroy();t&&t.invalidate()}}class WjMenuSeparator extends wijmo_angular_base_1.WjDirective{constructor(){super();this.template="<span />";this.require="^wjMenu"}_getMetaDataId(){return"MenuSeparator"}_createLink(){return new WjMenuItemLink(!0)}_getId(){return WjMenuItem._directiveId}}exports.WjMenuSeparator=WjMenuSeparator;class WjContextMenu extends wijmo_angular_base_1.WjDirective{constructor(){super();this.template=void 0;this.restrict="A";this.scope=!1}_getMetaDataId(){return"WjContextMenu"}_postLinkFn(){return function(t,e,n){var r=wijmo_1.getElement(n.wjContextMenu);e[0].addEventListener("contextmenu",(function(t){var n=wijmo_1.Control.getControl(r),i=n.dropDown;if(n&&i&&!wijmo_1.closest(t.target,"[disabled]")){t.preventDefault();n.owner=e[0];n.show(t)}}))}}}exports.WjContextMenu=WjContextMenu;class WjInputDate extends WjDropDown{get _controlConstructor(){return wjcInput.InputDate}}exports.WjInputDate=WjInputDate;class WjInputDateTime extends WjInputDate{get _controlConstructor(){return wjcInput.InputDateTime}}exports.WjInputDateTime=WjInputDateTime;class WjInputNumber extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcInput.InputNumber}}exports.WjInputNumber=WjInputNumber;class WjInputMask extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcInput.InputMask}}exports.WjInputMask=WjInputMask;class WjInputTime extends WjComboBox{constructor(t){super(t)}get _controlConstructor(){return wjcInput.InputTime}}exports.WjInputTime=WjInputTime;class WjInputColor extends WjDropDown{get _controlConstructor(){return wjcInput.InputColor}}exports.WjInputColor=WjInputColor;class WjPopup extends wijmo_angular_base_1.WjDirective{constructor(){super();this.transclude=!0;this.template="<div ng-transclude/>"}get _controlConstructor(){return wjcInput.Popup}_initProps(){super._initProps();wijmo_angular_base_1.MetaFactory.findProp("owner",this._props).customHandler=function(t,e,n,r,i){null==t.modal&&(e.modal=!n)}}}exports.WjPopup=WjPopup;class WjMultiSelect extends WjComboBox{constructor(t){super(t)}get _controlConstructor(){return wjcInput.MultiSelect}}exports.WjMultiSelect=WjMultiSelect;class WjMultiAutoComplete extends WjAutoComplete{constructor(t){super(t)}get _controlConstructor(){return wjcInput.MultiAutoComplete}}exports.WjMultiAutoComplete=WjMultiAutoComplete;class WjCollectionViewNavigator extends wijmo_angular_base_1.WjDirective{constructor(){super();this.template='<div class="wj-control wj-content wj-pager"><div class="wj-input-group"><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button" ng-click="cv.moveCurrentToFirst()" ng-disabled="cv.currentPosition <= 0"><span class="wj-glyph-left" style="margin-right:-4px"></span><span class="wj-glyph-left"></span> </button></span><span class="wj-input-group-btn"> <button class="wj-btn wj-btn-default" type="button" ng-click="cv.moveCurrentToPrevious()" ng-disabled="cv.currentPosition <= 0"><span class="wj-glyph-left"></span> </button></span><input type="text" class="wj-form-control" value=" {{cv.currentPosition + 1 | number}} / {{cv.itemCount | number}} " disabled /><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button" ng-click="cv.moveCurrentToNext()" ng-disabled="cv.currentPosition >= cv.itemCount - 1"><span class="wj-glyph-right"></span></button></span><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button" ng-click="cv.moveCurrentToLast()" ng-disabled="cv.currentPosition >= cv.itemCount - 1"><span class="wj-glyph-right"></span><span class="wj-glyph-right" style="margin-left:-4px"></span></button></span></div></div>'}_getMetaDataId(){return"CollectionViewNavigator"}_postLinkFn(){return function(t,e,n,r){}}}exports.WjCollectionViewNavigator=WjCollectionViewNavigator;class WjCollectionViewPager extends wijmo_angular_base_1.WjDirective{constructor(){super();this.template='<div class="wj-control wj-content wj-pager"><div class="wj-input-group"><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button"ng-click="cv.moveToFirstPage()"ng-disabled="cv.pageIndex <= 0"><span class="wj-glyph-left" style="margin-right:-4px"></span><span class="wj-glyph-left"></span></button></span><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button"ng-click="cv.moveToPreviousPage()"ng-disabled="cv.pageIndex <= 0"><span class="wj-glyph-left"></span></button></span><input type="text" class="wj-form-control" value="{{cv.pageIndex + 1 | number}} / {{cv.pageCount | number}}" disabled /><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button"ng-click="cv.moveToNextPage()"ng-disabled="cv.pageIndex >= cv.pageCount - 1"><span class="wj-glyph-right"></span></button></span><span class="wj-input-group-btn"><button class="wj-btn wj-btn-default" type="button"ng-click="cv.moveToLastPage()"ng-disabled="cv.pageIndex >= cv.pageCount - 1"><span class="wj-glyph-right"></span><span class="wj-glyph-right" style="margin-left:-4px"></span></button></span></div></div>'}_getMetaDataId(){return"CollectionViewPager"}_postLinkFn(){return function(t,e,n,r){}}}exports.WjCollectionViewPager=WjCollectionViewPager;