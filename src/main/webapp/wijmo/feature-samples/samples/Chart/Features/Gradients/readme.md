Gradients
================

The [FlexChart](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html) control allows you to specify gradients for [series](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.series.html) [style](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.series.html#style) properties. The gradients are specified as strings with the following syntax:

{type}({coords}){color\[:offset\[:opacity\]\]}

Where:

1.  **{type}** is either 'l' or 'r', for linear or radial gradients,
2.  **{coords}** is a set of three or four numbers that specify the gradient direction (x1/y1/x2/y2 for linear, cx.cy.r for radial), and
3.  **{color:offset:opacity}** is an HTML color string optionally followed by offset and opacity values. You may add add additional colors using a hyphen as a separator.

[Learn about FlexChart](https://www.grapecity.com/wijmo-flexchart) | [FlexChart API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html)