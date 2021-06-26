Tree Grids
==========

If your data items contain collections of child items, you may use FlexGrid's [childItemsPath](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#childitemspath) to show the data as a tree. For example, consider a list of 'person' objects which have a 'children' property. The 'children' property contains an array of more person objects. This is sometimes called a _homogeneous_ hierarchy. The grid below was built by binding the grid to the top-level persons list and setting the [childItemsPath](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#childitemspath) property to 'children':

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [TreeGrid with childItemsPath Documentation](https://www.grapecity.com/wijmo/docs/Topics/Grid/TreeGrid/TreeGrid-Using-ChildItemsPath) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)