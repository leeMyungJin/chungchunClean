Scrolling and ViewRange
=======================

When the user selects a cell using the mouse or keyboard, the FlexGrid automatically
ensures it is visible by calling the [scrollIntoView](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#scrollintoview) method. 

The [scrollIntoView](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#scrollintoview) method causes the grid to scroll as needed so the requested cell
is within the current [viewRange](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#viewrange). The grid will scroll the minimum amount needed to
show the cell, so it may become visible at the top, middle, or bottom of the view range.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)