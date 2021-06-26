DataMap Editors
===============

By default, the [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) provides a drop-down list for editing data-mapped cells.

In the V1/2020 release, we added a [dataMapEditor](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html#datamapeditor) property to the [Column](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html)
class. This new property allows you to select the type of editor you'd like to
use on your data-mapped columns. You have three options:

[DropDownList](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.datamapeditor.html#dropdownlist): Use an input element with auto-complete, validation, and a 
drop-down list. (This is the default setting.)

[AutoComplete](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.datamapeditor.html#autocomplete): Use an input element with auto-complete and validation, 
but no drop-down.

[RadioButtons](https://www.grapecity.com/wijmo/api/enums/wijmo_grid.datamapeditor.html#radiobuttons): Use radio buttons with mouse and keyboard support. This option
takes up more space, but it's the only one that shows all available choices at 
once and provides single-click editing.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)