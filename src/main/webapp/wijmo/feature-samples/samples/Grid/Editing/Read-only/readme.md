Read-Only, Required Columns
===========================

You can disable editing at the grid, column, or row levels using the [isReadOnly](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#isreadonly) property of the grid, column, or row objects. You can also disable editing for specific cells using the [beginningEdit](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#beginningedit) event.

You can use the column's [isRequired](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html#isrequired) property to determine whether empty/null values should be allowed for that column.

The FlexGrid below allows prevents users from entering empty values for the 'Country' column, and allows them to delete the content of the numeric columns. The grid also uses the [beginningEdit](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#beginningedit) event to prevent users from editing items that are overdue.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)