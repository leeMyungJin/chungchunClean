Dynamic DataMaps
================

If the list of valid values for a cell depends on the data item the cell is bound to,
you can create a [DataMap](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.datamap.html) and override its [getDisplayValues](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.datamap.html#getdisplayvalues) method to return
a subset of the full value list.

For example, the grid below shows a list of data items with countries and cities.
The drop-down city list includes only cities in the data item's country.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)