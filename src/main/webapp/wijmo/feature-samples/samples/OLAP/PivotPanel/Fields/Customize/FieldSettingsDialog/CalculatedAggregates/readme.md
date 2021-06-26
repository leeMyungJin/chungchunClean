Calculated Field Aggregates
===========================

PivotField objects have two properties that support custom calculations:

The **getValue** property is a function that takes a **data item** as a parameter
and returns a value that is calculated based on other properties of the data item.
The function has no access to any aggregate information.

This sample uses the **getValue** function to implement a **Range** field that 
categorizes raw sales value into three levels: "High", "Medium", or "Low".

The **getAggregateValue** property is a function that takes a **summary row** as
a parameter and returns a value to be displayed as an aggregate for the field.
The function has no access to the individual/raw data items.

This sample uses the **getAggregateValue** function to implement a **Conversion**
field that shows the Sales/Downloads ratio for each summary row.

[Learn about OLAP](https://www.grapecity.com/wijmo-olap) |
[PivotPanel Documentation](https://www.grapecity.com/wijmo/docs/Topics/OLAP/Pivot-Panel) | 
[PivotPanel API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotpanel.html)