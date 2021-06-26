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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);e.default=t;return e};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_1=require("wijmo/wijmo"),mKo=__importStar(require("knockout")),wjcInput=__importStar(require("wijmo/wijmo.input"));var wjKo=mKo;class WjDropDownBinding extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.DropDown}}exports.WjDropDownBinding=WjDropDownBinding;class wjComboBox extends WjDropDownBinding{_getControlConstructor(){return wjcInput.ComboBox}}exports.wjComboBox=wjComboBox;class wjAutoComplete extends wjComboBox{_getControlConstructor(){return wjcInput.AutoComplete}}exports.wjAutoComplete=wjAutoComplete;class wjCalendar extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.Calendar}}exports.wjCalendar=wjCalendar;class wjColorPicker extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.ColorPicker}}exports.wjColorPicker=wjColorPicker;class wjListBox extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.ListBox}}exports.wjListBox=wjListBox;class wjMenu extends wjComboBox{_getControlConstructor(){return wjcInput.Menu}_createWijmoContext(){return new WjMenuContext(this)}_initialize(){super._initialize();wijmo_knockout_base_1.MetaFactory.findProp("value",this._metaData.props).updateControl=this._updateControlValue}_updateControlValue(t,e,n,o,i){if(null!=i){n.selectedValue=i;t._updateHeader()}return!0}}exports.wjMenu=wjMenu;class WjMenuContext extends wijmo_knockout_base_1.WjContext{_initControl(){super._initControl();var t=this.control;t.displayMemberPath="header";t.commandPath="cmd";t.commandParameterPath="cmdParam";t.selectedValuePath="value";t.itemsSource=new wijmo_1.ObservableArray;t.itemClicked.addHandler(()=>{this._safeUpdateSrcAttr("value",t.selectedValue);this._updateHeader()})}_childrenInitialized(){super._childrenInitialized();this.control.selectedIndex=0;this._updateHeader()}_updateHeader(){var t=this.control,e=this.valueAccessor(),n=wjKo.unwrap(e.header);if(void 0!==wjKo.unwrap(e.value)&&t.selectedItem&&t.displayMemberPath){var o=t.selectedItem[t.displayMemberPath];null!=o&&(n+=": <b>"+o+"</b>")}t.header=n}}exports.WjMenuContext=WjMenuContext;class wjMenuItem extends wijmo_knockout_base_1.WjBinding{_getMetaDataId(){return"MenuItem"}_createWijmoContext(){return new WjMenuItemContext(this)}_initialize(){super._initialize();var t=this._metaData;t.parentProperty="itemsSource";t.isParentPropertyArray=!0}}exports.wjMenuItem=wjMenuItem;class WjMenuItemContext extends wijmo_knockout_base_1.WjContext{_createControl(){return{header:this.element.innerHTML,cmd:null,cmdParam:null,value:null}}}exports.WjMenuItemContext=WjMenuItemContext;class wjMenuSeparator extends wijmo_knockout_base_1.WjBinding{_getMetaDataId(){return"MenuSeparator"}_initialize(){super._initialize();var t=this._metaData;t.parentProperty="itemsSource";t.isParentPropertyArray=!0}_createControl(t){return{header:'<div class="wj-state-disabled" style="width:100%;height:1px;background-color:lightgray"></div>'}}}exports.wjMenuSeparator=wjMenuSeparator;class wjContextMenu extends wijmo_knockout_base_1.WjBinding{_getMetaDataId(){return"ContextMenu"}_createControl(t){return null}_createWijmoContext(){return new WjContextMenuContext(this)}}exports.wjContextMenu=wjContextMenu;class WjContextMenuContext extends wijmo_knockout_base_1.WjContext{_initControl(){super._initControl();var t=this.valueAccessor(),e=wijmo_1.getElement(t.id);this.element.addEventListener("contextmenu",(function(t){var n=wijmo_1.Control.getControl(e),o=n.dropDown;if(n&&o&&!wijmo_1.closest(t.target,"[disabled]")){t.preventDefault();n.owner=this.element;n.selectedIndex=-1;if(n.onIsDroppedDownChanging(new wijmo_1.CancelEventArgs)){wijmo_1.showPopup(o,t);n.onIsDroppedDownChanged();o.focus()}}}))}}exports.WjContextMenuContext=WjContextMenuContext;class wjInputDate extends WjDropDownBinding{_getControlConstructor(){return wjcInput.InputDate}}exports.wjInputDate=wjInputDate;class wjInputDateTime extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.InputDateTime}}exports.wjInputDateTime=wjInputDateTime;class wjInputNumber extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.InputNumber}}exports.wjInputNumber=wjInputNumber;class wjInputMask extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.InputMask}}exports.wjInputMask=wjInputMask;class wjInputTime extends wjComboBox{_getControlConstructor(){return wjcInput.InputTime}}exports.wjInputTime=wjInputTime;class wjInputColor extends WjDropDownBinding{_getControlConstructor(){return wjcInput.InputColor}}exports.wjInputColor=wjInputColor;class WjCollectionViewBaseBinding extends wijmo_knockout_base_1.WjBinding{_createControl(t){return null}_createWijmoContext(){return new WjCollectionViewContext(this)}_getTemplate(){return""}}exports.WjCollectionViewBaseBinding=WjCollectionViewBaseBinding;class WjCollectionViewContext extends wijmo_knockout_base_1.WjContext{constructor(){super(...arguments);this._emptyCV=new wijmo_1.CollectionView([])}init(t,e,n,o,i){t.innerHTML=this.wjBinding._getTemplate();var r=wjKo.unwrap(e().cv)||this._emptyCV;this._subscribeToCV(r);this._localVM={cv:wjKo.observable(r)};var a=i.createChildContext(this._localVM);wjKo.applyBindingsToDescendants(a,t);return{controlsDescendantBindings:!0}}update(t,e,n,o,i){var r=wjKo.unwrap(e().cv)||this._emptyCV,a=wjKo.unwrap(this._localVM.cv);if(r!==a){this._unsubscribeFromCV(a);this._subscribeToCV(r);this._localVM.cv(r)}}_subscribeToCV(t){if(t){t.collectionChanged.addHandler(this._forceBindingsUpdate,this);t.currentChanged.addHandler(this._forceBindingsUpdate,this);t.pageChanged.addHandler(this._forceBindingsUpdate,this)}}_unsubscribeFromCV(t){if(t){t.collectionChanged.removeHandler(this._forceBindingsUpdate,this);t.currentChanged.removeHandler(this._forceBindingsUpdate,this);t.pageChanged.removeHandler(this._forceBindingsUpdate,this)}}_forceBindingsUpdate(t,e){this._localVM.cv.valueHasMutated()}}exports.WjCollectionViewContext=WjCollectionViewContext;class wjCollectionViewPager extends WjCollectionViewBaseBinding{_getMetaDataId(){return"CollectionViewPager"}_getTemplate(){return'<div class="wj-control wj-content wj-pager">    <div class="wj-input-group">        <span class="wj-input-group-btn" >            <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveToFirstPage() },               disable: cv().pageIndex <= 0">                <span class="wj-glyph-left" style="margin-right: -4px;"></span>                <span class="wj-glyph-left"></span>            </button>        </span>        <span class="wj-input-group-btn" >           <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveToPreviousPage() },               disable: cv().pageIndex <= 0">                <span class="wj-glyph-left"></span>            </button>        </span>        <input type="text" class="wj-form-control" data-bind="            value: cv().pageIndex + 1 + \' / \' + cv().pageCount        " disabled />        <span class="wj-input-group-btn" >            <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveToNextPage() },               disable: cv().pageIndex >= cv().pageCount - 1">                <span class="wj-glyph-right"></span>            </button>        </span>        <span class="wj-input-group-btn" >            <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveToLastPage() },               disable: cv().pageIndex >= cv().pageCount - 1">                <span class="wj-glyph-right"></span>                <span class="wj-glyph-right" style="margin-left: -4px;"></span>            </button>        </span>    </div></div>'}}exports.wjCollectionViewPager=wjCollectionViewPager;class wjCollectionViewNavigator extends WjCollectionViewBaseBinding{_getMetaDataId(){return"CollectionViewNavigator"}_getTemplate(){return'<div class="wj-control wj-content wj-pager">    <div class="wj-input-group">        <span class="wj-input-group-btn" >            <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveCurrentToFirst() },               disable: cv().currentPosition <= 0">                <span class="wj-glyph-left" style="margin-right: -4px;"></span>                <span class="wj-glyph-left"></span>            </button>        </span>        <span class="wj-input-group-btn" >           <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveCurrentToPrevious() },               disable: cv().currentPosition <= 0">                <span class="wj-glyph-left"></span>            </button>        </span>        <input type="text" class="wj-form-control" data-bind="            value: cv().currentPosition + 1 + \' / \' + cv().itemCount        " disabled />        <span class="wj-input-group-btn" >            <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveCurrentToNext() },               disable: cv().currentPosition >= cv().itemCount - 1">                <span class="wj-glyph-right"></span>            </button>        </span>        <span class="wj-input-group-btn" >            <button class="wj-btn wj-btn-default" type="button"               data-bind="click: function () { cv().moveCurrentToLast() },               disable: cv().currentPosition >= cv().itemCount - 1">                <span class="wj-glyph-right"></span>                <span class="wj-glyph-right" style="margin-left: -4px;"></span>            </button>        </span>    </div></div>'}}exports.wjCollectionViewNavigator=wjCollectionViewNavigator;class wjMultiSelect extends wjComboBox{_getControlConstructor(){return wjcInput.MultiSelect}}exports.wjMultiSelect=wjMultiSelect;class wjMultiAutoComplete extends wjAutoComplete{_getControlConstructor(){return wjcInput.MultiAutoComplete}}exports.wjMultiAutoComplete=wjMultiAutoComplete;class wjPopup extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcInput.Popup}_createWijmoContext(){return new WjPopupContext(this)}_initialize(){super._initialize();wijmo_knockout_base_1.MetaFactory.findProp("owner",this._metaData.props).updateControl=function(t,e,n,o,i){n.owner=i;t._updateModal(i);return!0}}}exports.wjPopup=wjPopup;class WjPopupContext extends wijmo_knockout_base_1.WjContext{_initControl(){super._initControl();this.control.removeOnHide=!1}_updateModal(t){var e=this.valueAccessor(),n=this.control;null==wjKo.unwrap(e.modal)&&(n.modal=!t)}}exports.WjPopupContext=WjPopupContext;wjKo.bindingHandlers.wjComboBox=new wjComboBox;wjKo.bindingHandlers.wjAutoComplete=new wjAutoComplete;wjKo.bindingHandlers.wjCalendar=new wjCalendar;wjKo.bindingHandlers.wjColorPicker=new wjColorPicker;wjKo.bindingHandlers.wjListBox=new wjListBox;wjKo.bindingHandlers.wjMenu=new wjMenu;wjKo.bindingHandlers.wjMenuItem=new wjMenuItem;wjKo.bindingHandlers.wjMenuSeparator=new wjMenuSeparator;wjKo.bindingHandlers.wjContextMenu=new wjContextMenu;wjKo.bindingHandlers.wjInputDate=new wjInputDate;wjKo.bindingHandlers.wjInputDateTime=new wjInputDateTime;wjKo.bindingHandlers.wjInputNumber=new wjInputNumber;wjKo.bindingHandlers.wjInputMask=new wjInputMask;wjKo.bindingHandlers.wjInputTime=new wjInputTime;wjKo.bindingHandlers.wjInputColor=new wjInputColor;wjKo.bindingHandlers.wjCollectionViewNavigator=new wjCollectionViewNavigator;wjKo.bindingHandlers.wjCollectionViewPager=new wjCollectionViewPager;wjKo.bindingHandlers.wjMultiSelect=new wjMultiSelect;wjKo.bindingHandlers.wjMultiAutoComplete=new wjMultiAutoComplete;wjKo.bindingHandlers.wjPopup=new wjPopup;