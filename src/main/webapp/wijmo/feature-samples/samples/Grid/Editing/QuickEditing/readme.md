Excel-Style Quick-Editing
=========================

The FlexGrid control supports quick editing by default. If you select a cell and start typing,
the grid will automatically switch into edit mode so you can edit cells as you would in Excel.

As in Excel, 'quick-edit' mode allows users to finish editing using the arrow keys to move
on to the next cell (in full-edit mode the arrows move the selection within the editor).
The F2 key toggles the edit mode between quick and full modes.

If you want to disable quick editing, the easiest way is to handle the [beginninEdit](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#beginningedit) event
and set the cancel parameter to true if the source event was a 'keypress'.
The grid below demonstrates:

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)