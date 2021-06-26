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

"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++){e=arguments[o];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}).apply(this,arguments)},__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.hasOwnProperty.call(t,o)&&(e[o]=t[o]);e.default=t;return e};Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_1=require("wijmo/wijmo"),VueModule=__importStar(require("vue")),Vue=VueModule.default||VueModule;exports.VueApi=Vue.version&&"3"===Vue.version[0]?{isV3Plus:!0,modelValueProp:"modelValue",extend:function(t){return t},h:Vue.h,render:Vue.render}:Vue;var WjVueBaseDefinition={beforeCreate:function(){var t=this.$options[WjComponentBehavior._behClassProp];t&&(this[WjComponentBehavior._behProp]=t._attach(this))},mounted:function(){this[WjComponentBehavior._behProp].lhMounted()}};WjVueBaseDefinition[exports.VueApi.isV3Plus?"unmounted":"destroyed"]=function(){this[WjComponentBehavior._behProp].lhDestroyed()};var WjVueBase=exports.VueApi.extend(WjVueBaseDefinition),WjComponentBehavior=function(){function WjComponentBehavior(t){this._isMounted=!1;this._mountedCBs=[];this.component=t}WjComponentBehavior._attach=function(t){return new this(t)};WjComponentBehavior.register=function(){var t,e=((t={data:this.data,extends:WjVueBase,render:this.render,props:this._getProps(),model:this._getModel()})[WjComponentBehavior._behClassProp]=this,t);return exports.VueApi.isV3Plus?__assign({},e,{emits:this._getEmits()}):exports.VueApi.component(this.tag,e)};WjComponentBehavior.prototype.lhMounted=function(){var t=this;if(this._isChild()){var e=this.component.$parent;if(e){this.parent=e[WjComponentBehavior._behProp];this.parent._mountedCB((function(){t._prepareControl();t._initParent()}))}}else this._prepareControl()};WjComponentBehavior.prototype.lhDestroyed=function(){this._siblingInsertedEH&&this._getElement().removeEventListener("DOMNodeInserted",this._siblingInsertedEH);var t=this.control;if(t)if(this._isChild()){var e=this._getParentProp();if(e){var o=this.parent.control[e];if(wijmo_1.isArray(o)){var n=o.indexOf(t);n>-1&&o.splice(n,1)}}}else t instanceof wijmo_1.Control&&t.dispose()};WjComponentBehavior._getProps=function(){var t=[];this.props&&(t=this.props);this.events&&(t=t.concat(this.events));this.changeEvents&&(t=t.concat(Object.keys(this.changeEvents)));exports.VueApi.isV3Plus&&this.modelProp&&t.push(exports.VueApi.modelValueProp);return t};WjComponentBehavior._getModel=function(){var t=this.modelProp;return t?{prop:t,event:"update:"+t}:null};WjComponentBehavior._getEmits=function(){var t=this;if(!this.changeEvents)return[];var e=[];Object.keys(this.changeEvents).forEach((function(o){return t.changeEvents[o].forEach((function(t){e.indexOf(t)<0&&e.push(t)}))}));this.modelProp&&e.push(exports.VueApi.modelValueProp);return e.map((function(t){return"update:"+t}))};WjComponentBehavior.prototype._createControl=function(){var t=this._isChild()?this._isParentInCtor()?this.parent.control:void 0:this._getElement();return new(this.constructor._getControlType())(t)};WjComponentBehavior.prototype._initParent=function(){var t=this._getParentProp();if(t){var e=this.parent.control,o=e[t];if(wijmo_1.isArray(o)){var n=this._getSiblingIndex();(n<0||n>=o.length)&&(n=o.length);o.splice(n,0,this.control);this._siblingInsertedEH=this._siblingInserted.bind(this);this._getElement().addEventListener("DOMNodeInserted",this._siblingInsertedEH)}else e[t]=this.control}};WjComponentBehavior.prototype._updateControl=function(t,e){this.control[t]=e};WjComponentBehavior.prototype._prepareControl=function(){var t=this.control=this._createControl(),e=this._getElement(),o=this.constructor;this.component.control=t;if(!this._siblingId){null==o.siblingId&&(o.siblingId=++o._siblingDirId+"");this._siblingId=o.siblingId}e.setAttribute(o._typeSiblingIdAttr,this._siblingId);this._isMounted=!0;var n=this._mountedCBs;this._mountedCBs=[];for(var i=0,r=n;i<r.length;i++){(0,r[i])()}_initialize(this)};WjComponentBehavior.prototype._isChild=function(){var t=this.constructor;return null!=t.parentProp||null!=t.parentInCtor};WjComponentBehavior.prototype._isParentInCtor=function(){return!0===this.constructor.parentInCtor};WjComponentBehavior.prototype._getParentProp=function(){return(exports.VueApi.isV3Plus?this.component.$props:this.component.$options.propsData).wjProperty||this.constructor.parentProp};WjComponentBehavior.prototype._getSiblingIndex=function(){var t=this._getElement(),e=t.parentElement;if(!e)return-1;for(var o=e.childNodes,n=-1,i=this._siblingId,r=0;r<o.length;r++){var s=o[r];if(1==s.nodeType&&s.getAttribute(WjComponentBehavior._typeSiblingIdAttr)==i){++n;if(s===t)return n}}return-1};WjComponentBehavior.prototype._siblingInserted=function(t){if(t.target===this._getElement()){var e=this._getSiblingIndex(),o=this.control,n=this.parent.control[this._getParentProp()],i=n.indexOf(o);if(e>=0&&i>=0&&e!==i){n.splice(i,1);e=Math.min(e,n.length);n.splice(e,0,o)}}};WjComponentBehavior.prototype._getElement=function(){return this.component.$el};WjComponentBehavior._getControlType=function(){return this.classCtor()};WjComponentBehavior.prototype._mountedCB=function(t){this._isMounted?t():this._mountedCBs.push(t)};WjComponentBehavior.render=function(t){var e=this.$slots.default;return exports.VueApi.isV3Plus?exports.VueApi.h("div",{},[e&&e()]):t("div",[e])};WjComponentBehavior._typeSiblingIdAttr="_wjSiblingId";WjComponentBehavior._behClassProp="_wjBehCl";WjComponentBehavior._behProp="__wjBeh";WjComponentBehavior._propIdxMapProp="__propInitIdx";WjComponentBehavior._siblingDirId=0;return WjComponentBehavior}();exports.WjComponentBehavior=WjComponentBehavior;function _initialize(t){var e=t.component,o=t.control,n=t.constructor,i=n[WjComponentBehavior._propIdxMapProp];if(!i){i=n[WjComponentBehavior._propIdxMapProp]={};var r=n.props;if(r)for(var s=0;s<r.length;s++)i[r[s]]=s}var p=[],a=[],h=[],u=n.changeEvents||{},l=exports.VueApi.isV3Plus?e.$props:e.$options.propsData,d=n.modelProp;for(var _ in l)null!=i[_]?p.push(_):u[_]?h.push(_):a.push(_);exports.VueApi.isV3Plus&&d&&l.hasOwnProperty(exports.VueApi.modelValueProp)&&!l.hasOwnProperty(d)&&p.push(d);p.sort((function(t,e){return i[t]-i[e]}));e[WjComponentBehavior._behProp].constructor.extraProps;function _subscribeEvents(t){t.forEach((function(t){"initialized"!==t&&t.indexOf(".")<0&&wijmo_1.isFunction(e[t])&&o[t].addHandler(e[t],o)}))}_subscribeEvents(a);p.forEach((function(t){if(exports.VueApi.isV3Plus){var o=exports.VueApi.modelValueProp;if(wijmo_1.isUndefined(e[t])){if(t===d&&!wijmo_1.isUndefined(e[o])){e[WjComponentBehavior._behProp]._updateControl(t,e[o]);e.$watch(o,_updateControl.bind({cmp:e,prop:d}))}}else e[WjComponentBehavior._behProp]._updateControl(t,e[t]);e.$watch(t,_updateControl.bind({cmp:e,prop:t}))}else{wijmo_1.isUndefined(e[t])||e[WjComponentBehavior._behProp]._updateControl(t,e[t]);e.$watch(t,_updateControl.bind({cmp:e,prop:t}))}}));function _updateControl(t){this.cmp[WjComponentBehavior._behProp]._updateControl(this.prop,t)}!function _updateStyleProp(){var t=e.$el,n={};if("style"in o&&t.style.cssText.length){t.style.cssText.split(";").forEach((function(t){var e=t.split(":");2==e.length&&(n[e[0].trim()]=e[1].trim())}));o.style=n}}();_subscribeEvents(h);if(u)for(var c=0,v=Object.keys(u);c<v.length;c++){var m=v[c];_subscribeChangeEvents(m,u[m],o,e)}function _subscribeChangeEvents(t,e,o,n){if(e){var i=o[t];i instanceof wijmo_1.Event&&i.addHandler((function(t,o){for(var i=0,r=e;i<r.length;i++){var s=r[i];n.$emit("update:"+s,t[s]);if(exports.VueApi.isV3Plus&&s===d&&wijmo_1.isUndefined(n[s])){var p=exports.VueApi.modelValueProp;wijmo_1.isUndefined(n[p])||n.$emit("update:"+p,t[s])}}}),o)}}wijmo_1.isFunction(e.initialized)&&e.initialized(o);return o}exports._initialize=_initialize;