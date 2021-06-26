Filtering Hierarchical Data
===========================

The [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) class supports filtering only for items that are direct children of the collection. In most cases, it does not work well for hierarchical data. Filtering hierarchical data is not a trivial exercise because when a child element is visible, all its ancestors should also be visible. The grid below shows how you can implement a simple hierarchical binding method that will show cities that match the filter and states that match the filter or contain cities that do. For example, try typing 'San' in the filter box:

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Filtering Hierarchical Data Documentation](https://www.grapecity.com/wijmo/docs/Topics/Grid/Filtering/Filter-Hierarchical-Data) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)