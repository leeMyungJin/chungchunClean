Hierarchical Fields
===================

Pivot fields often have a hierarchical structure. For example, an address may be represented
by street, city, and country fields. Or you may want to break up a date into year, quarter,
and month.

You can represent hierarchical structures by grouping the subordinate fields under a **subFields**
array of a master field. In this example, we use this feature to group measure and dimension
fields under different master fields, and also to break up a date field into year, quarter,
and month sub-fields (the date fields share the same binding but have different formats).

[Learn about OLAP](https://www.grapecity.com/wijmo-olap) | [PivotPanel Documentation](https://www.grapecity.com/wijmo/docs/Topics/OLAP/Pivot-Panel) | [PivotPanel API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotpanel.html)