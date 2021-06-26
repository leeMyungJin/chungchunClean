Drop Target Control
===================

The [Column's](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html) [allowDragging](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html#allowdragging) property provides control over the drag source (which columns may be dragged into new positions). You can get control over the drop target (the column's new position) by handling the [draggingColumnOver](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#draggingcolumn) event and setting the event's **cancel** parameter to true if the current source/target combination is invalid.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)