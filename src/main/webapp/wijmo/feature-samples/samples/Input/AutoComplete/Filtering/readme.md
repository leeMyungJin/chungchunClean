AutoComplete Filtering
======================

The [AutoComplete](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html) control takes control of its source [collectionView](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html#collectionview) filtering in order to show only items that match what the user typed.

If you want to keep control of the filter, set the [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html#itemssource) property to your [CollectionView's](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) [items](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#items) property. The [AutoComplete](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html) will create a new [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) for its internal use, and the original filtering will be preserved.

For example, the AutoComplete below uses a filtered CollectionView as its [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html#itemssource). The filter remains active while searching for items as the user types:

[Learn about Input Controls](https://www.grapecity.com/wijmo/input-controls-javascript) | [Filtering Documentation](https://www.grapecity.com/wijmo/docs/Topics/Input/AutoComplete/Filtering) | [AutoComplete API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_input.autocomplete.html)