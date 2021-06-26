Searching TreeViews
===================

Searching [TreeViews](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treeview.html) is not trivial because of their hierarchical nature.
Nodes typically reflect a context defined by in part by their parent nodes 
but also by additional content associated with the node.

For example, if a user searched the TreeView below for "Electronics", 
you may or may not want to include the child nodes in the results. 
Furthermore, if items contained detailed descriptions, you might want
to add keywords to help in the search.
So if a user typed for example "beard", you would probably want the 
"Trimmers/Shavers" node to be selected.

The [AutoComplete](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html) control provides a good way to implement a search
box to be used with the TreeView.
In this sample, we build a flat searchArray with the full node paths and
 keywords and use that as an itemsSource for searching through the TreeView.

In addition to the 'itemsSource' and 'displayMemberPath' properties, we use 
the 'searchMemberPath' property to specify the name of the field that contains
the keywords to include in the search.

For example, try typing 'beard', 'collect', or 'food' in the search box:

[Learn about Wijmo](https://www.grapecity.com/wijmo) | [TreeView API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_nav.treeview.html)