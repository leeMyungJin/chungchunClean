Sorting Columns
===============

The FlexGrid control relies on the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) class for sorting data. 

Use the grid's [allowSorting](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#allowsorting) property to determine whether users 
should be able to sort the grid by clicking the column header cells:

[AllowSorting.None](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.allowsorting.html#none): Users cannot sort the grid by clicking the column headers.

[AllowSorting.SingleColumn](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.allowsorting.html#singlecolumn): Users may sort the grid by a single column at a time.
Clicking the column header sorts the column or flips the sort direction.
Ctrl+Click removes the sort.
(This is the default setting.)

[AllowSorting.MultiColumn](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.allowsorting.html#multicolumn): Users may sort the grid by multiple columns at a time.
Clicking the column header sorts the column or flips the sort direction.
Ctrl+Click removes the sort for that column.
Ctrl+Shift+Click removes all sorts.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)