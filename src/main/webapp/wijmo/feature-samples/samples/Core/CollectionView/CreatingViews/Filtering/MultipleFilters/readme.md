Multiple Filter Functions
=========================

The [CollectionView.filters](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#filters) property contains an array of filter functions.

To be included in the view, items must satisfy the main [filter](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#filter) function and all the functions in the [filters](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#filters) array.

The [filters](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#filters) property allows components to create and manage their own independent filter functions. 

The sample below uses the [filters](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#filters) array to filter data by country, independently of the column filtering provided by the [FlexGridFilter](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_filter.flexgridfilter.html).

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Creating Views Documentation](https://www.grapecity.com/wijmo/docs/Topics/Wijmo/Collections/Creating-Views) | [CollectionView API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html)