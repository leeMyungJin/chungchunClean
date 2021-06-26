Node Checkboxes
===============

The [TreeNodes](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treenode.html) can be displayed with a Checkbox by setting the  [TreeView.showCheckboxes](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treeview.html#showcheckboxes) property to true.

This setting causes the TreeView to add checkboxes to each node.
When users check or uncheck nodes, the TreeView raises the [checkedItemsChanged](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treeview.html#checkeditemschanged) event.

You can use the [checkedItems](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treeview.html#checkeditems) property to get or set the list of checked items. The list of checked items includes only items that are checked and have no child nodes (the checked state of parent nodes is determined by the checked state of their children).

[Learn about Wijmo](https://www.grapecity.com/wijmo) | [TreeView API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treeview.html)