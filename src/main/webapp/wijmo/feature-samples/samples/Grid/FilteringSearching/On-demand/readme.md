On-Demand Sorting
=================

The FlexGrid control relies on the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) class to perform data operations
including sorting, filtering, grouping, paging, change tracking, etc.

By default, the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) re-applies the filter after any edits.
You can change that behavior by setting the [refreshOnEdit](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#refreshonedit) property to false.

If you do that, the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) will not apply the filter when you edit items.
It will re-apply filter only on demand, when the user edits the filter conditions.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)