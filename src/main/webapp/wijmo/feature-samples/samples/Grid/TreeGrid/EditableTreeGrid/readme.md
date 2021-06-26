Editable Tree Grids
===================

If you use FlexGrid's [childItemsPath](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#childitemspath) to show the data as a tree, the resulting grid will be read-only by default. This happens because every row in a tree is a [GroupRow](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.grouprow.html), and group rows are read-only by default. If you want your tree to be editable, handle the [loadedRows](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#loadedrows) event to set the [isReadOnly](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.row.html#isreadonly) property of every row to false.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)