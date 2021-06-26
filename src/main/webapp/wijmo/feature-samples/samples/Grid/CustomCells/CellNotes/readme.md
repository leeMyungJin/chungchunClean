Cell Notes
==========

The FlexGrid control allows you to add Excel-style cell notes that will appear when the user
hovers over the cell. The notes in the sample below are specified in the data, but the note information
is not required to be specified inside of the data object.

The [formatItem](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#formatitem) event is used to check if the cell has a note. 
If it does, the event handler adds a class to the cell element so it displays a note 
indicator on the upper right corner of the cell and attaches a tooltip to the element.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)