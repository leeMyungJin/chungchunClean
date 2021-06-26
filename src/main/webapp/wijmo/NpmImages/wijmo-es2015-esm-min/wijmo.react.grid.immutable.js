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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcGridImmutable from"wijmo/wijmo.grid.immutable";export class ImmutabilityProvider extends ComponentBase{constructor(m){super(m,wjcGridImmutable.ImmutabilityProvider,{objectProps:["itemsSource"]});this._parentInCtor=!0}}