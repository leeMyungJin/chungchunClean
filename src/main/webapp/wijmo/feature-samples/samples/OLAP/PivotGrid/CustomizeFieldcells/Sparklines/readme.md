PivotGrid with Sparklines
====================

You can use the [formatItem](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotgrid.html#formatitem) event to add custom content such as sparklines and sparkbars to grid cells. This example adds two extra fields to a [PivotEngine](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotengine.html) and uses the [formatItem](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotgrid.html#formatitem) event to add sparklines and sparkbars to the extra fields. The engine's [getDetail](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotengine.html#getdetail) method is also used retrieve the detail records for each cell and uses that data to build svg elements displayed in each cell.

[Learn about OLAP](https://www.grapecity.com/wijmo-olap) | [PivotGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_olap.pivotgrid.html)