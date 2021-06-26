Custom Axis Labels
==================

The [Axis](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.axis.html) class has an [itemFormatter](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.axis.html#itemformatter) property that allows you to customize the content and appearance of specific labels along the axes.

If specified, the [itemFormatter](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.axis.html#itemformatter) function takes two parameters:

1.  **engine**: The IRenderEngine object used for rendering the labels.
2.  **label**: An object that represents the label and has these properties:
    *   **value**: The value that the label represents.
    *   **text**: The text content of the label (usually the formatted value).
    *   **pos**: The position where the label will be rendered, in control coordinates.
    *   **cls**: A CSS class to be applied to the label element.

[Learn about FlexChart](https://www.grapecity.com/wijmo-flexchart) | [Axis Label Documentation](https://www.grapecity.com/wijmo/docs/Topics/Chart/Advanced/Axes/Axis-Labels) | [FlexChart API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html)