Reordering
==========

By default, users may reorder columns by dragging their headers into new positions.

You may prevent users from reordering columns by setting the grid's
[allowDragging](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowdragging) property to 'None'. 
You may also prevent dragging specific columns by setting the column's
[allowDragging](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowdragging) property to false.

For example, the grid below allows reordering all columns except 'ID.

**Note**: To enable drag/drop operations on touch devices, your project should 
import the '@grapecity/wijmo.touch' module.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)