Column Width
============

This sample shows how you can use XAML-style star sizing to implement flexible layouts with the [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html). Star sizing is specified in the [width](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html#width) property of the [Column](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html) object. Star sizing is similar to percentage sizing, except that the values do not have to add up to one hundred. A width of '3*' means 'three times wider than 1*.' The total size used to calculate the layout is the current width of the control minus the width of any non-star columns divided by the number of stars specified.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)