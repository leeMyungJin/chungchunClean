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
/**
 * {@module wijmo.react.chart.interaction}
 * Contains React components for the <b>wijmo.chart.interaction</b> module.
 */
/**
 *
 */
export declare var ___keepComment: any;
import { ComponentBase } from 'wijmo/wijmo.react.base';
/**
 * React component for the {@link wijmo.chart.interaction.RangeSelector} class.
 *
 * The <b>flex-chart-range-selector</b> component should be contained in
 * one of the following components:
 * {@link wijmo.react.chart.FlexChart}
 *  or {@link wijmo.react.chart.finance.FinancialChart}.
 *
 * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.interaction.RangeSelector} class it represents.
 *
 * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
 * You can use this event to perform further initialization in addition to setting properties in JSX.
 * The signature of the handler function is the same as any other Wijmo event handlers.
 */
export declare class FlexChartRangeSelector extends ComponentBase {
    _parentInCtor: boolean;
    constructor(props: any);
}
/**
 * React component for the {@link wijmo.chart.interaction.ChartGestures} class.
 *
 * The <b>flex-chart-gestures</b> component should be contained in
 * one of the following components:
 * {@link wijmo.react.chart.FlexChart}
 *  or {@link wijmo.react.chart.finance.FinancialChart}.
 *
 * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.interaction.ChartGestures} class it represents.
 *
 * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
 * You can use this event to perform further initialization in addition to setting properties in JSX.
 * The signature of the handler function is the same as any other Wijmo event handlers.
 */
export declare class FlexChartGestures extends ComponentBase {
    _parentInCtor: boolean;
    constructor(props: any);
}
