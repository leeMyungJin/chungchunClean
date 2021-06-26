On-Demand Sorting
=================

The FlexGrid control relies on the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) class to perform data operations
including sorting, filtering, grouping, paging, change tracking, etc.

By default, the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) refreshes and re-sorts the data after any edits.
You can change that behavior by setting the [refreshOnEdit](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#refreshonedit) property to false.

If you do that, the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) will no longer re-sort the data when you 
edit items. It will sort only on demand, when the user clicks a column header cell.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)