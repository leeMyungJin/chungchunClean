DataMaps
========

In many situations, you may want columns to map values so cells display a value that is
different from what is actually stored in the grid. 
You can accomplish this with the [formatItem](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#formatitem) event, but the [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) provides a
better alternative: [DataMaps](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.datamap.html).

If you set a column's [dataMap](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html#datamap) property to an instance of a [DataMap](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.datamap.html), the grid will
use it to look up display values for each data item, and will provide a drop-down list with
valid items to use when editing the cells.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [DataMaps Documentation](https://www.grapecity.com/wijmo/docs/Topics/Grid/Editing/DataMaps#datamaps-in-flexgrid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)