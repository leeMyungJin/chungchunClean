Binding to XML Documents
========================

This sample shows how you can use XML documents as a hierarchical data source for the FlexGrid control. It uses a **DOMParser** object to parse an XML string into a Document object and loops through the Document to build an array with "category" items, each with a "products" array. The array is used as an [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#itemssource) and the [childItemsPath](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#childitemspath) property is used to show the products for each category as a tree.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Binding to XML Documentation](https://www.grapecity.com/wijmo/docs/Topics/Grid/TreeGrid/TreeGrid-Bound-To-XML) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)