Series Picker
===================

You can easily implement a series-picker UI using [FlexChart's](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html) [series](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html#series) property, a [ListBox](https://www.grapecity.com/wijmo/api/classes/wijmo_input.listbox.html) control, and Wijmo's [showPopup](https://www.grapecity.com/wijmo/api/index.html#showpopup) and [hidePopup](https://www.grapecity.com/wijmo/api/index.html#hidepopup) methods.

For example, the chart below starts with an auto-generated set of series. Click the gear icon at the top-left corner to show a [ListBox](https://www.grapecity.com/wijmo/api/classes/wijmo_input.listbox.html) where you can select the series you want to display.

Note that you can achieve a similar result by setting the chart's [legendToggle](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html#legendtoggle) property to true. Once you do that, the legend itself acts as a series picker: clicking any series name in the legend toggles its visibility.

[Learn about FlexChart](https://www.grapecity.com/wijmo-flexchart) | [FlexChart API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_chart.flexchart.html)