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
import { WjComponentBehavior, IPropsMeta } from 'wijmo/wijmo.webcomponents.base';
import * as wjcGridTransposedmultirow from 'wijmo/wijmo.grid.transposedmultirow';
export declare class WjcTransposedMultiRow extends wjcGridTransposedmultirow.TransposedMultiRow {
    _wjBehaviour: WjComponentBehavior;
    constructor();
    static readonly observedAttributes: IPropsMeta;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
    addEventListener(...args: any[]): void;
}
