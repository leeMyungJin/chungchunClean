Virtualization
==============

The FlexGrid control allows you to implement a simple type of 'infinite scrolling' through the use of the [viewRange](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#viewrange) property. When the user scrolls to the bottom of the grid, the code adds items to the grid's [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#itemssource). If you inspect the DOM, you will notice that no matter how large the [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#itemssource) gets, the number of DOM elements remains constant. The data is 'virtualized'.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)