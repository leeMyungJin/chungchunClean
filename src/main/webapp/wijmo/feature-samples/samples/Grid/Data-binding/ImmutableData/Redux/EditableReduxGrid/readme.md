Editable Redux Grid
===================

FlexGrid normally updates the underlying data array with the changes made
by a user via the grid. This approach doesn't work with state managements
systems like Redux, which require the data immutability.

This problem can be solved by the [ImmutabilityProvider](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_immutable.immutabilityprovider.html#datachanged) extension component.
Being attached to the FlexGrid control, and bound to a data array from
the [Redux Store](https://redux.js.org/), this component changes the grid behavior in the following
ways:

* Allows a user to edit the data via the grid in a usual manner (change item
values, add/delete rows, paste text, and so on). Data transformation operations
such as [sorting](https://www.grapecity.com/wijmo/demos/Grid/Sorting/Overview), [grouping](https://www.grapecity.com/wijmo/demos/Grid/Grouping/GroupPanel/purejs) and [filtering](https://www.grapecity.com/wijmo/demos/Grid/FilteringSearching/Excel-likeFilter/Overview/purejs) are also supported.

* Prevents the grid from mutating the underlying data array in response to user 
edits. Instead, it triggers the [_dataChanged_](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_immutable.immutabilityprovider.html#datachanged) event, which can be used to 
dispatch data change actions to the Redux Store.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)