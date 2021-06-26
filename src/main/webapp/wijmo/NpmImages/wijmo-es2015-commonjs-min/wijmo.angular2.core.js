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

"use strict";var WjTooltip_1,__decorate=this&&this.__decorate||function(t,e,o,i){var r,p=arguments.length,n=p<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(p<3?r(n):p>3?r(e,o,n):r(e,o))||n);return p>3&&n&&Object.defineProperty(e,o,n),n},__param=this&&this.__param||function(t,e){return function(o,i){e(o,i,t)}},__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.hasOwnProperty.call(t,o)&&(e[o]=t[o]);e.default=t;return e};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),ngCore=__importStar(require("@angular/core")),wjcCore=__importStar(require("wijmo/wijmo"));var wjTooltipMeta={selector:"[wjTooltip]",inputs:[],outputs:["initialized"],exportAs:"wjTooltip",providers:[]};exports.wjTooltipMeta=wjTooltipMeta;let WjTooltip=WjTooltip_1=class WjTooltip{constructor(t,e,o){this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,t,e,o);this._elRef=t;WjTooltip_1._toolTip||(WjTooltip_1._toolTip=new wjcCore.Tooltip);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy();this.wjTooltip=null}get wjTooltip(){return this._toolTipText}set wjTooltip(t){if(this._toolTipText!=t){this._toolTipText=t;WjTooltip_1._toolTip.setTooltip(this._elRef.nativeElement,t,this._toolTipPosition)}}get wjTooltipPosition(){return this._toolTipPosition}set wjTooltipPosition(t){if(this._toolTipText){const e=wjcCore.asEnum(t,wjcCore.PopupPosition);if(this._toolTipPosition!=e){this._toolTipPosition=e;WjTooltip_1._toolTip.setTooltip(this._elRef.nativeElement,this._toolTipText,e)}}}};WjTooltip.meta={outputs:wjTooltipMeta.outputs};__decorate([core_1.Input()],WjTooltip.prototype,"wjTooltip",null);__decorate([core_1.Input()],WjTooltip.prototype,"wjTooltipPosition",null);WjTooltip=WjTooltip_1=__decorate([core_1.Directive({selector:wjTooltipMeta.selector,inputs:wjTooltipMeta.inputs,outputs:wjTooltipMeta.outputs,exportAs:wjTooltipMeta.exportAs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjTooltip_1)},...wjTooltipMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjTooltip);exports.WjTooltip=WjTooltip;let WjComponentLoader=class WjComponentLoader{constructor(t,e){this._cmpResolver=t;this._elementRef=e;this._isInit=!1;this.propertiesChange=new ngCore.EventEmitter}get component(){return this._component}set component(t){if(this._component!==t){this._component=t;this._createComponent()}}get properties(){return this._properties}set properties(t){this._properties=t;this._updateProperties()}ngOnInit(){this._isInit=!0;this._createComponent()}_createComponent(){if(this._isInit){if(this._cmpRef){this._cmpRef.destroy();this._cmpRef=null}let t=this._component;if(t&&this._anchor){this._cmpRef=this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(t));this._updateProperties()}}}_updateProperties(){let t=this._cmpRef&&this._cmpRef.instance,e=this.properties;if(t&&e){let o=Object.getOwnPropertyNames(e);for(let i of o){t[i]=e[i];let o=t[i+"Change"];o instanceof core_1.EventEmitter&&this._addPropListener(t,i,o)}}}_addPropListener(t,e,o){o.subscribe(o=>{this.properties[e]=this.properties[e]=t[e];this.propertiesChange.next(this.properties)})}};__decorate([core_1.ViewChild("anchor",{read:core_1.ViewContainerRef,static:!0})],WjComponentLoader.prototype,"_anchor",void 0);WjComponentLoader=__decorate([core_1.Component({selector:"wj-component-loader",template:"<div #anchor></div>",inputs:["component","properties"],outputs:["propertiesChange"]}),__param(0,core_1.Inject(core_1.ComponentFactoryResolver)),__param(1,core_1.Inject(core_1.ElementRef))],WjComponentLoader);exports.WjComponentLoader=WjComponentLoader;let moduleExports=[WjTooltip,WjComponentLoader],WjCoreModule=class WjCoreModule{};WjCoreModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjCoreModule);exports.WjCoreModule=WjCoreModule;