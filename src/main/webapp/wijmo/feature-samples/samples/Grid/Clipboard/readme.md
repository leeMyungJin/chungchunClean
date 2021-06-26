Clipboard Support
=================

The [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) control has built-in clipboard support. 

By default, pressing the ctrl+c or ctrl+Insert keys copies the current selection to the clipboard.
Pressing ctrl+v or shift-Insert pastes the clipboard content into the grid.
You can customize the clipboard actions using the [copying](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#copying), [copied](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#copied), [pasting](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#pasting), [pasted](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#pasted),
[pastingCell](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#pastingcell), and [pastedCell](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#pastedcell) events.

You can disable the automatic clipboard support by setting the [autoClipboard](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#autoclipboard) property
to false.

The FlexGrid implements an Excel-style 'smart pasting' feature that replicates the
clipboard data when pasting.
For example, if you select a single cell and press ctrl+c to copy it to the clipboard,
then extend the selection and press ctrl+v to paste, the cell will be pasted over the
entire selection.

Use the [copyHeaders](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#copyheaders) property to control whether the grid should include header cells
when copying the content to the clipboard. This is especially useful in read-only grids.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)