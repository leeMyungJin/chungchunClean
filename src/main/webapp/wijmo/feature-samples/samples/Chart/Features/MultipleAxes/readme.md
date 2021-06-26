Multiple Axes
==========

Most charts have two axes, X and Y. This works well as long as all the data on the chart has the same nature and can share the same scale.

But some charts contain series that show different types of data, with different units and scales. The [FlexChart](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html) below has two series that represent amounts (sales and expenses) and one that represents quantities (downloads).

Plotting all the series against a single Y axis squeezes the first two series against the bottom of the chart.

The easiest way to solve this problem and still using a single chart is to create a secondary Y axis and assign it to the [axisY](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.series.html#axisy) property of the "Downloads" series.

[Learn about FlexChart](https://www.grapecity.com/wijmo-flexchart) | [Multiple Axes Documentation](https://www.grapecity.com/wijmo/docs/Topics/Chart/Advanced/Axes/Multiple-Axes) | [FlexChart API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html)