Calculated Fields
=================

Calculated fields provide an extra level of abstraction from the raw data values.
To summarize calculated values instead of raw values, you can add a custom field with the **getValue**
property set to a function that calculates the value based on other fields in the same raw data item.

This sample adds two calculated fields to a [PivotEngine](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotengine.html) instance: **Range** and **Bonus**.

The **Range** field categorizes raw sales value into three levels: "High", "Medium", or "Low".

The **Bonus** field calculates a bonus amount based on the raw sales value.

[Learn about OLAP](https://www.grapecity.com/wijmo-olap) |
[PivotPanel Documentation](https://www.grapecity.com/wijmo/docs/Topics/OLAP/Pivot-Panel) | 
[PivotPanel API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotpanel.html)