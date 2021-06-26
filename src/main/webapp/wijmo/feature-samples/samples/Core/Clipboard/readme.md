Clipboard
=========

The [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) supports the clipboard by default. 
Pressing ctrl+C copies the current selection to the clipboard, and ctrl+V pastes
the clipboard content at the current cursor position.

You can disable the automatic clipboard by setting the [autoClipboard](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#autoclipboard) property to false.

You can use the [copyHeaders](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#copyheaders) property to determined whether clip strings should
include the content of the header cells. 
This is especially useful in read-only grids, because the header information 
typically should not be included when pasting data into the grid.

Try to copy a range from the [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) and paste into Notepad or
into an Excel sheet.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Clipboard Documentation](https://www.grapecity.com/wijmo/docs/Topics/Wijmo/Clipboard) | [Clipboard API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo.clipboard.html)