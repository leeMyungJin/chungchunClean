Multi-Range Selection
=====================

Set FlexGrid's [selectionMode](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#selectionmode) property to [MultiRange](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.selectionmode.html#multirange) to enable
Excel-style multi-range selection. Users will be able to select multiple 
ranges by ctrl-clicking and dragging on the grid.

The sample shows how you can provide Excel-style dynamic data summaries 
for the current selection (regular or multi-range) and how to export 
selected ranges to CSV files.

Note that clipboard and export commands only work for multi-range selections 
if all selected ranges refer to the same column range or to the same row range.
(Excel also behaves this way.)

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)