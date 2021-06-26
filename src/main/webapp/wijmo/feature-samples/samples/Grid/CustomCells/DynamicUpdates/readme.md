Dynamic Updates
===============

The FlexGrid control updates all cells automatically when there are changes to its data source. If you have a data source where only a few items change frequently, it may be more efficient to update only the cells bound to items that have actually changed. The grid below uses the [formatItem](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#formatitem) event to keep track of the cell elements for each data item. When the data changes, it updates only the cells affected rather than the whole grid.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)