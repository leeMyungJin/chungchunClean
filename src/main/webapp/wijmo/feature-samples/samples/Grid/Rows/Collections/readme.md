Row Collections
===============

The FlexGrid control has three sets of rows:

**Header Rows**: This collection contains the row of headers at the top of the grid. 

**Scrollable Rows**: This collection contains all the rows of data displayed in the grid.

**Footer Rows**: This collection contains the footer rows at the bottom of the grid.

The three row collections are [RowCollection](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.rowcollection.html) objects, which extend regular arrays. You may add or remove rows by adding or removing [Row](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.row.html) objects from these arrays. In most cases, however, you won't add or remove scrollable rows, since the grid does that automatically when you set the [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#itemssource) property.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)