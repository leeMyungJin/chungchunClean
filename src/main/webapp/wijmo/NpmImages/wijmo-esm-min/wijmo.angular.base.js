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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}();import{_getModule,Control,isArray,addClass,isNullOrWhiteSpace,DateTime}from"wijmo/wijmo";import{ControlMetaFactory,PropertyType,EventDescBase,ComplexPropDescBase,PropDescBase,BindingMode,isSimpleType}from"wijmo/wijmo.meta";import*as mNg from"angular";var MetaFactory=function(e){__extends(MetaFactory,e);function MetaFactory(){return null!==e&&e.apply(this,arguments)||this}MetaFactory.CreateProp=function(e,t,i,r,n,o){return new PropDesc(e,t,i,r,n,o)};MetaFactory.CreateEvent=function(e,t){return new EventDesc(e,t)};MetaFactory.CreateComplexProp=function(e,t,i){return new ComplexPropDesc(e,t,i)};MetaFactory.findProp=function(e,t){return ControlMetaFactory.findProp(e,t)};MetaFactory.findEvent=function(e,t){return ControlMetaFactory.findEvent(e,t)};MetaFactory.findComplexProp=function(e,t){return ControlMetaFactory.findComplexProp(e,t)};return MetaFactory}(ControlMetaFactory);export{MetaFactory};var PropDesc=function(e){__extends(PropDesc,e);function PropDesc(t,i,r,n,o,s){var p=e.call(this,t,i,r,n,o,s)||this;p._scopeBindingMode=p.propertyType===PropertyType.EventHandler?"&":p.bindingMode==BindingMode.OneWay&&isSimpleType(p.propertyType)?"@":"=";return p}Object.defineProperty(PropDesc.prototype,"scopeBindingMode",{get:function(){return this._scopeBindingMode},set:function(e){this._scopeBindingMode=e},enumerable:!0,configurable:!0});Object.defineProperty(PropDesc.prototype,"customHandler",{get:function(){return this._customHandler},set:function(e){this._customHandler=e},enumerable:!0,configurable:!0});return PropDesc}(PropDescBase);export{PropDesc};var EventDesc=function(e){__extends(EventDesc,e);function EventDesc(){return null!==e&&e.apply(this,arguments)||this}return EventDesc}(EventDescBase);export{EventDesc};var ComplexPropDesc=function(e){__extends(ComplexPropDesc,e);function ComplexPropDesc(){return null!==e&&e.apply(this,arguments)||this}return ComplexPropDesc}(ComplexPropDescBase);export{ComplexPropDesc};var wjNg=mNg,_ngModules=[];export function _registerNgModule(e){var t=wjNg.module(e,[]);_ngModules.push(e);return t}export function getNgModules(){return _ngModules.slice()}var WjDirective=function(){function WjDirective(){this.replace=!0;this.restrict="E";this.template="<div />";this.transclude=!1;this._props=[];this._events=[];this._complexProps=[];var e=this;this._dirId=++WjDirective._dirIdCounter+"";this.link=this._postLinkFn();this.controller=["$scope","$parse","$element",function(t,i,r){e._$parse=i;r[0][WjDirective._elemScopeProp]=t;this[WjDirective._cntrlScopeProp]=t;t[WjDirective._scopeChildrenProp]=[];e._controllerImpl(this,t,r)}];this._initDirective()}WjDirective._versionOk=function(e){var t=wjNg.version,i=[t.major,t.minor,t.dot],r=e.split(".");if(r.length!==i.length)throw"Unrecognizable version number.";for(var n=0;n<r.length;n++){if(i[n]<r[n])return!1;if(i[n]>r[n])return!0}return!0};Object.defineProperty(WjDirective.prototype,"_controlConstructor",{get:function(){throw"Abstract method call"},enumerable:!0,configurable:!0});WjDirective.prototype._getMetaDataId=function(){return this._controlConstructor};WjDirective.prototype._getMetaData=function(){return MetaFactory.getMetaData(this._getMetaDataId())};WjDirective.prototype._initDirective=function(){this._initSharedMeta();this._prepareProps();this._initEvents();this._initScopeEvents();this._initScopeDescription()};WjDirective.prototype._initSharedMeta=function(){var e=this._getMetaData();this._props=e.props;this._events=e.events;this._complexProps=e.complexProps;this._property=e.parentProperty;this._isPropertyArray=e.isParentPropertyArray;this._ownObject=e.ownsObject;this._parentReferenceProperty=e.parentReferenceProperty;this._ngModelProperty=e.ngModelProperty};WjDirective.prototype._initProps=function(){};WjDirective.prototype._initEvents=function(){};WjDirective.prototype._createLink=function(){return new WjLink};WjDirective.prototype._controllerImpl=function(e,t,i){};WjDirective.prototype._initControl=function(e){try{return new(0,this._controlConstructor)(e)}catch(e){return}};WjDirective.prototype._isChild=function(){return this._isParentInitializer()||this._isParentReferencer()};WjDirective.prototype._isParentInitializer=function(){return null!=this._property};WjDirective.prototype._isParentReferencer=function(){return null!=this._parentReferenceProperty};WjDirective.prototype._scopeToAttrName=function(e){var t=this.scope[e];if(t){var i=1,r=t.length;if(r<2)return e;"?"===t.charAt(1)&&(i=2);return r===i?e:t.substr(i)}return e};WjDirective.prototype._getComplexPropDesc=function(e){return MetaFactory.findComplexProp(e,this._complexProps)};WjDirective.prototype._initScopeEvents=function(){for(var e in this._events){var t=this._events[e];this._props.push(new PropDesc(t.eventName,PropertyType.EventHandler))}};WjDirective.prototype._initScopeDescription=function(){var e=this._props,t={},i=WjDirective._optionalAttr?"=?":"=";if(null!=e)for(var r,n=0;n<e.length;n++){t[(r=e[n]).propertyName]=r.scopeBindingMode;WjDirective._optionalAttr&&"="==r.scopeBindingMode&&(t[r.propertyName]="=?")}t.control=i;t[WjDirective._initPropAttr]=i;t[WjDirective._initEventAttr]="&";t[WjDirective._parPropAttr]="@";t[WjDirective._wjModelPropAttr]="@";this.scope=t};WjDirective.prototype._postLinkFn=function(){var e=this;return function(t,i,r,n){var o=e._createLink();o.directive=e;o.scope=t;o.tElement=i;o.tAttrs=r;if(isArray(n)){var s=i.parent()[0][WjDirective._elemScopeProp];for(var p in n){var c=n[p];if(null!=c){c[WjDirective._cntrlScopeProp]===t&&(c=i.parent().controller(e._stripRequire(+p)));if(c&&c[WjDirective._cntrlScopeProp]===s){o.controller=c;break}}}}else o.controller=n;o.ngModel=i.controller("ngModel");o._link()}};WjDirective.prototype._prepareProps=function(){this._initProps();var e=[].concat(this._props);this._props.sort((function(t,i){var r=t.priority-i.priority;r||(r=e.indexOf(t)-e.indexOf(i));return r}))};WjDirective.prototype._stripRequire=function(e){if(!this._stripReq){this._stripReq=[];this._stripReq.length=this.require.length}if(!this._stripReq[e]){var t=/^[^A-Za-z]*(.*)/.exec(this.require[e]);this._stripReq[e]=t?t[1]:""}return this._stripReq[e]};WjDirective.prototype._getId=function(){return this._dirId};WjDirective._removeTransclude=function(e){if(!e)return e;var t=document.createElement("div");t.innerHTML=e;var i=t.querySelectorAll("[ng-transclude]");[].forEach.call(i,(function(e,t){e.removeAttribute("ng-transclude")}));return t.innerHTML};WjDirective._parPropAttr="wjProperty";WjDirective._wjModelPropAttr="wjModelProperty";WjDirective._initPropAttr="isInitialized";WjDirective._initEventAttr="initialized";WjDirective._cntrlScopeProp="_cntrlScope";WjDirective._elemScopeProp="_elemCntrl";WjDirective._cntrlLinkProp="$_thisLink";WjDirective._scopeChildrenProp="$_childLinks";WjDirective._dirIdAttr="wj-directive-id";WjDirective._optionalAttr=WjDirective._versionOk("1.1.4");WjDirective._dynaTemplates=WjDirective._optionalAttr;WjDirective._angStripPrefixes=["data","x"];WjDirective._dirIdCounter=0;return WjDirective}();export{WjDirective};var WjLink=function(){function WjLink(){this._nonAssignable={};this._definedProps={};this._definedEvents={};this._oldValues={};this._isInitialized=!1;this._hasTriggeredInitialized=!1;this._isNgModelInitialized=!1;this._scopeSuspend=0;this._suspendedEvents=[];this._areChlildrenReady=!1;this._isDestroyed=!1;this._isAppliedToParent=!1}WjLink.prototype._link=function(){var e=this.directive,t=this;this.tElement[0].setAttribute(WjDirective._dirIdAttr,e._getId());this.directiveTemplateElement=e.replace?this.tElement:wjNg.element(this.tElement.children()[0]);this._initNonAssignable();if(this._isChild()){this._parentPropDesc=new ComplexPropDesc(e._property,e._isPropertyArray,e._ownObject);this.controller[WjDirective._cntrlScopeProp][WjDirective._scopeChildrenProp].push(this);var i=this.controller[WjDirective._cntrlScopeProp][WjDirective._cntrlLinkProp];i&&i._areChlildrenReady&&this._parentReady(i)}else{this._createInstance();this._notifyReady();this._prepareControl()}this._destroyEhUnreg=this.scope.$on("$destroy",(function(e){for(var i=[],r=1;r<arguments.length;r++)i[r-1]=arguments[r];t._destroy()}))};WjLink.prototype._onChildrenReady=function(){};WjLink.prototype._createInstance=function(){this.control=this._initControl();this._safeApply(this.scope,"control",this.control)};WjLink.prototype._parentReady=function(e){if(this._isChild()){var t=this;if(!this._isAttrDefined(WjDirective._parPropAttr)||this.scope[WjDirective._parPropAttr]){var i=this._getParentProp(),r=e.directive._getComplexPropDesc(i);r?this._parentPropDesc=r:this._parentPropDesc.propertyName=i;this.parent=e;if(this._useParentObj()){this.control=e.control[i];this._safeApply(this.scope,"control",this.control)}else this._createInstance();this._notifyReady();this._prepareControl();this._initParent();this.directiveTemplateElement[0].style.display="none";this._appliedToParent()}else this.scope.$watch(WjDirective._parPropAttr,(function(){t._parentReady(e)}))}};WjLink.prototype._initParent=function(){if(!this._useParentObj()){this.directive;var e=this._getParentProp(),t=this.parent.control,i=this.control;if(this._isParentInitializer())if(this._isParentArray()){var r=t[e],n=this._getIndex();(n<0||n>=r.length)&&(n=r.length);r.splice(n,0,i);this._siblingInsertedEH=this._siblingInserted.bind(this);this.tElement[0].addEventListener("DOMNodeInserted",this._siblingInsertedEH)}else t[e]=i;this._isParentReferencer()&&!this._parentInCtor()&&(i[this._getParentReferenceProperty()]=t)}};WjLink.prototype._destroy=function(){if(!this._isDestroyed){this._isDestroyed=!0;var e=this.control;this._destroyEhUnreg&&(this._destroyEhUnreg=null);this._siblingInsertedEH&&this.tElement[0].removeEventListener("DOMNodeInserted",this._siblingInsertedEH);if(this._isParentArray()&&!this.parent._isDestroyed){var t=this.parent.control,i=this._getParentProp();if(t&&i&&e){var r=t[i];if(r){var n=r.indexOf(e);n>=0&&r.splice(n,1)}}}this.tElement[0][WjDirective._elemScopeProp]=null;e instanceof Control&&setTimeout((function(){e.hostElement&&e.dispose()}),0)}};WjLink.prototype._siblingInserted=function(e){if(e.target===this.tElement[0]){var t=this._getIndex(),i=this.parent.control[this._getParentProp()],r=this.control,n=i.indexOf(r);if(t>=0&&n>=0&&t!==n){i.splice(n,1);t=Math.min(t,i.length);i.splice(t,0,r)}}};WjLink.prototype._notifyReady=function(){this.scope[WjDirective._cntrlLinkProp]=this;for(var e=[].concat(this.scope[WjDirective._scopeChildrenProp]),t=0;t<e.length;t++)e[t]._parentReady(this);this._areChlildrenReady=!0;this._onChildrenReady()};WjLink.prototype._initControl=function(){return this.directive._initControl(this._parentInCtor()?this.parent.control:this.directiveTemplateElement[0])};WjLink.prototype._prepareControl=function(){this._addEventHandlers();this._addWatchers()};WjLink.prototype._setupScopeWithControlProperties=function(){for(var e,t,i,r,n=this.control,o=this.scope,s=this.directive._props,p=0;p<s.length;p++)if("="===(e=s[p]).scopeBindingMode&&e.isNativeControlProperty&&e.shouldUpdateSource){i=o[t=e.propertyName];r=n[t];var c=e.propertyType==PropertyType.Function,a=e.propertyType==PropertyType.EventHandler;!this._canApply(o,e.propertyName)||this._isEqual(r,i)||c||a||(o[e.propertyName]=r)}o.$root.$$phase||o.$apply()};WjLink.prototype._initNonAssignable=function(){var e,t=this.directive._$parse,i=this.directive.scope;for(var r in i)"="===i[r].charAt(0)&&(void 0!==(e=this.tAttrs[this.directive._scopeToAttrName(r)])&&null!=t(e).assign||(this._nonAssignable[r]=!0))};WjLink.prototype._suspendScope=function(){this._scopeSuspend++};WjLink.prototype._resumeScope=function(){this._scopeSuspend>0&&0==--this._scopeSuspend&&this._suspendedEvents.length>0&&this._updateScope()};WjLink.prototype._isScopeSuspended=function(){return this._scopeSuspend>0};WjLink.prototype._isAttrDefined=function(e){return null!=this.tAttrs.$attr[this.directive._scopeToAttrName(e)]};WjLink.prototype._childInitialized=function(e){var t=this.scope[WjDirective._scopeChildrenProp],i=t.indexOf(e);if(i>=0){t.splice(i,1);this._checkRaiseInitialized()}};WjLink.prototype._thisInitialized=function(){this._checkRaiseInitialized()};WjLink.prototype._initialized=function(){};WjLink.prototype._appliedToParent=function(){this._isAppliedToParent=!0;this._checkRaiseInitialized()};WjLink.prototype._checkRaiseInitialized=function(){if(!this._hasTriggeredInitialized&&0===this.scope[WjDirective._scopeChildrenProp].length&&this._isInitialized&&(!this._isChild()||this._isAppliedToParent)){this._hasTriggeredInitialized=!0;this._initialized();this._safeApply(this.scope,WjDirective._initPropAttr,!0);var e=this.scope[WjDirective._initEventAttr],t=this;e&&setTimeout((function(){e({s:t.control,e:void 0})}),0);this._isChild()&&this.parent&&this.parent._childInitialized(this)}};WjLink.prototype._addWatchers=function(){var e=this,t=this.directive._props,i=this.scope;if(t){if(this.ngModel){var r=this.ngModel;r.$pristine&&addClass(this.tElement[0],"ng-pristine");r.$valid&&addClass(this.tElement[0],"ng-valid");r.$untouched&&addClass(this.tElement[0],"ng-untouched");r.$render=this._ngModelRender.bind(this);this._updateNgModelPropDesc();this._isAttrDefined(WjDirective._wjModelPropAttr)&&i.$watch(WjDirective._wjModelPropAttr,(function(){e._updateNgModelPropDesc();e._ngModelRender()}))}var n,o,s;for(n=0;n<t.length;n++){o=(s=t[n]).propertyName;s.propertyType!==PropertyType.EventHandler&&this._isAttrDefined(o)&&(this._definedProps[o]=s)}var p=this.control;i.$watch((function(t){if(!e._isDestroyed)try{var i={};for(var r in e._definedProps)t[r]!==e._oldValues[r]&&(i[r]=t[r]);for(var r in i){var n=i[r];if(n!==e._oldValues[r]){e._oldValues[r]=n;if(e._isInitialized||void 0!==n){var o=e._definedProps[r],s=e._nullOrValue(e._castValueToType(n,o)),c=p[r];if(!e._isEqual(c,s)){var a=!1;null!=o.customHandler&&(a=o.customHandler(t,p,s,c,e));o.isNativeControlProperty&&!0!==a&&(p[r]=s)}}}}}finally{if(!e._isInitialized){e._isNgModelInitialized=!0;if(e.ngModel)if(void 0!==e.ngModel.$viewValue)e._ngModelRender();else if(e._ngModelPropDesc){e.ngModel.$setViewValue(p[e._ngModelPropDesc.propertyName]);e.ngModel.$setPristine()}e._isInitialized=!0;e._setupScopeWithControlProperties();e._thisInitialized()}}}))}};WjLink.prototype._addEventHandlers=function(){var e,t,i=this.directive._events;for(e=0;e<i.length;e++){t=i[e];this._addEventHandler(t)}};WjLink.prototype._addEventHandler=function(e){var t=this,i=e.eventName,r=this.control[i];if(null==r)throw'Event "'+i+'" not found in '+t.constructor.name;if(this._isAttrDefined(i))this._definedEvents[i]=e;else if(!e.isPropChanged)return;this.scope,this.directive._props;var n=this.control;r.addHandler((function(i,r){var n={eventDesc:e,s:i,e:r};t._isScopeSuspended()?t._suspendedEvents.push(n):t._updateScope(n)}),n)};WjLink.prototype._updateScope=function(e){void 0===e&&(e=null);if(!this._isDestroyed){var t=e?e.eventDesc.isPropChanged:this._suspendedEvents.some((function(e){return e.eventDesc.isPropChanged})),i=this;if(t)for(var r=this.directive._props,n=0;n<r.length;n++){var o=r[n];if("="==o.scopeBindingMode&&o.isNativeControlProperty&&o.shouldUpdateSource){var s=o.propertyName,p=this.control[s];if(this._shouldApply(this.scope,s,p)){this.scope[s]=p;this.directive._$parse(this.tAttrs[this.directive._scopeToAttrName(s)]).assign(this.scope.$parent,p)}this._ngModelPropDesc&&this._isInitialized&&this._ngModelPropDesc.propertyName==s&&this.ngModel.$viewValue!==p&&this.ngModel.$setViewValue(p)}}var c=function(){for(var t=e?[e]:this._suspendedEvents,r=0;r<t.length;r++){var n=t[r],o=n.eventDesc.eventName,s=this.scope[o];i._definedEvents[o]&&s&&s({s:n.s,e:n.e})}e||(this._suspendedEvents.length=0)}.bind(this);if(t)if(this.scope.$root.$$phase)var a=this.scope.$watch("value",(function(){a()}));else this.scope.$apply();c()}};WjLink.prototype._ngModelRender=function(){if(this._isNgModelInitialized){var e=this.ngModel.$viewValue,t=this._ngModelPropDesc;if(t&&(void 0!==e||this._isInitialized)){this._nullOrValue(this._castValueToType(e,t));this._isEqualEx(e,this.control[t.propertyName])||(this.control[t.propertyName]=e)}}};WjLink.prototype._castValueToType=function(e,t){return t.castValueToType(e)};WjLink.prototype._isChild=function(){return this.directive._isChild()};WjLink.prototype._isParentInitializer=function(){return this.directive._isParentInitializer()};WjLink.prototype._isParentReferencer=function(){return this.directive._isParentReferencer()};WjLink.prototype._getParentProp=function(){return this._isParentInitializer()?this.scope[WjDirective._parPropAttr]||this.directive._property:void 0};WjLink.prototype._getParentReferenceProperty=function(){return this.directive._parentReferenceProperty};WjLink.prototype._useParentObj=function(){return!this._isParentReferencer()&&this._isParentInitializer()&&!this._parentPropDesc.isArray&&!this._parentPropDesc.ownsObject};WjLink.prototype._isParentArray=function(){return this._isParentInitializer()&&this._parentPropDesc.isArray};WjLink.prototype._parentInCtor=function(){return this._isParentReferencer()&&""==this._getParentReferenceProperty()};WjLink.prototype._getNgModelProperty=function(){return this.scope[WjDirective._wjModelPropAttr]||this.directive._ngModelProperty};WjLink.prototype._updateNgModelPropDesc=function(){var e=this._getNgModelProperty();this._ngModelPropDesc=isNullOrWhiteSpace(e)?null:MetaFactory.findProp(e,this.directive._props)};WjLink.prototype._safeApply=function(e,t,i){if(this._shouldApply(e,t,i)){e[t]=i;e.$root.$$phase||e.$apply();return!0}return!1};WjLink.prototype._shouldApply=function(e,t,i){return this._canApply(e,t)&&!this._isEqual(i,e[t])};WjLink.prototype._canApply=function(e,t){return!this._nonAssignable[t]};WjLink.prototype._isEqual=function(e,t){return e==t||this._isSpValEq(e,t)};WjLink.prototype._isEqualEx=function(e,t){return e===t||this._isSpValEq(e,t)};WjLink.prototype._isSpValEq=function(e,t){return DateTime.equals(e,t)};WjLink.prototype._nullOrValue=function(e){return null!=e?e:null};WjLink.prototype._getIndex=function(){var e=this.tElement[0],t=e.parentElement;if(!t)return-1;for(var i=t.childNodes,r=-1,n=this.directive._getId(),o=0;o<i.length;o++){var s=i[o];if(1==s.nodeType&&s.getAttribute(WjDirective._dirIdAttr)==n){++r;if(s===e)return r}}return-1};return WjLink}();export{WjLink};export function softRefChart(){return _getModule("wijmo.chart")}export function softRefChartAnalytics(){return _getModule("wijmo.chart.analytics")}export function softRefChartAnimation(){return _getModule("wijmo.chart.animation")}export function softRefChartAnnotation(){return _getModule("wijmo.chart.annotation")}export function softRefChartFinance(){return _getModule("wijmo.chart.finance")}export function softRefChartFinanceAnalytics(){return _getModule("wijmo.chart.finance.analytics")}export function softRefChartHierarchical(){return _getModule("wijmo.chart.hierarchical")}export function softRefChartInteraction(){return _getModule("wijmo.chart.interaction")}export function softRefChartRadar(){return _getModule("wijmo.chart.radar")}export function softRefGauge(){return _getModule("wijmo.gauge")}export function softRefGrid(){return _getModule("wijmo.grid")}export function softRefGridDetail(){return _getModule("wijmo.grid.detail")}export function softRefGridFilter(){return _getModule("wijmo.grid.filter")}export function softRefGridGrouppanel(){return _getModule("wijmo.grid.grouppanel")}export function softRefGridMultirow(){return _getModule("wijmo.grid.multirow")}export function softRefGridSheet(){return _getModule("wijmo.grid.sheet")}export function softRefNav(){return _getModule("wijmo.nav")}export function softRefOlap(){return _getModule("wijmo.olap")}export function softRefViewer(){return _getModule("wijmo.viewer")}export function softRefInput(){return _getModule("wijmo.input")}