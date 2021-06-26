MultiSelect without $checked Property
==================================

The [MultiSelect](https://www.grapecity.com/wijmo/api/classes/wijmo_input.multiselect.html) control requires a data member to determine whether items are selected. If one is not provided, the control adds a _$checked_ property to the data items. You can prevent this by creating a dedicated [itemsSource](https://www.grapecity.com/wijmo/api/classes/wijmo_input.multiselect.html#itemssource) that contains objects with two properties: the original item and the checked member.

[Learn about Input Controls](https://www.grapecity.com/wijmo/input-controls-javascript) | [No Checked Items Documentation](https://www.grapecity.com/wijmo/docs/Topics/Input/MultiSelect/MultiSelect-NoCheckedItem) | [MultiSelect API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_input.multiselect.html)