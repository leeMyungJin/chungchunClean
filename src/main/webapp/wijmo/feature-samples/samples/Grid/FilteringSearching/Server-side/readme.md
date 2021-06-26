Server-Side Filtering
=====================

If you are loading data from an **OData** source with the [ODataCollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo_odata.odatacollectionview.html) class, the [FlexGridFilter](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_filter.flexgridfilter.html) can provide server-side filtering automatically. Set the view's [sortOnServer](https://www.grapecity.com/wijmo/api/classes/wijmo_odata.odatavirtualcollectionview.html#sortonserver) property to true and the [FlexGridFilter](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_filter.flexgridfilter.html) will automatically convert your filter conditions into **OData** filter statements to be handled on the server.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)