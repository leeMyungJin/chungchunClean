Selecting Columns
=================

By using FlexGrid's [allowSorting](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowsorting), [allowDragging](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowdragging) and [selectionMode](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#selectionmode) properties, you can incorperate Excel-style column selection functionality within FlexGrid.

First, set [allowSorting](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowsorting) and [allowDragging](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowdragging) to false. This prevents sort and drag operations from interfering with click events used to select columns.

Second, set [selectionMode](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#selectionmode) to 'MultiRange', so users will be able to click the column headers to select columns, or ctrl+click to toggle the selected state of specific columns.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)