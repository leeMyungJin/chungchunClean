Preserve Row Heights
====================

When the data source changes, the [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) control automatically re-generates all rows, and resets their sizes to the original values. This sample shows how you can preserve the row heights when the data is refreshed. It uses the [loadingRows](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#loadingrows) event to save the original row heights and the [loadedRows](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#loadedrows) event to restore them.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)