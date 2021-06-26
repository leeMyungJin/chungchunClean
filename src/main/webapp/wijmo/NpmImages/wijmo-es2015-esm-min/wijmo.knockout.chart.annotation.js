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

import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcChartAnno from"wijmo/wijmo.chart.annotation";var wjKo=mKo;export class wjFlexChartAnnotationLayer extends WjBinding{_getControlConstructor(){return wjcChartAnno.AnnotationLayer}}export class wjFlexChartAnnotation extends WjBinding{_createControl(t){return this._context._createAnnotation()}_getMetaDataId(){return"FlexChartAnnotation"}_createWijmoContext(){this._context=new wjFlexChartAnnotationContext(this);return this._context}}export class wjFlexChartAnnotationContext extends WjContext{_createAnnotation(){var t=this.valueAccessor(),n=wjKo.unwrap(t.type);return new wjcChartAnno[n]}}wjKo.bindingHandlers.wjFlexChartAnnotationLayer=new wjFlexChartAnnotationLayer;wjKo.bindingHandlers.wjFlexChartAnnotation=new wjFlexChartAnnotation;