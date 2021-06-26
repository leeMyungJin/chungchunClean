Custom Aggregates
=================

FlexGrid's columns have an [aggregate](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.column.html#aggregate) property that allows you to show data summaries 
for the whole grid or for each group.
If the built-in aggregates are not enough, you can calculate also aggregates with custom code.
The grid below includes a 'Profit' column that shows the difference between 'Sales' and 'Expenses'. 

The 'Profit' column is calculated in the [formatItem](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html#formatitem) event. The profit for regular data
items is based on the actual data items. The profit for groups is calculated using the 
group's [getAggregate](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionviewgroup.html#getaggregate) method.

The 'Profit' column cannot be sorted because it is calculated dynamically, and does not belong
to the data items.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Custom Aggregates Documentation](https://www.grapecity.com/wijmo/docs/Topics/Grid/Aggregation/Custom-Aggregates) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)