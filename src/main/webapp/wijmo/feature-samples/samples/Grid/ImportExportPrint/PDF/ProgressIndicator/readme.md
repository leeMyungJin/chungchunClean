Progress Indicator (PDF)
============================

The sample demonstrates how to export [FlexGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html) content to PDF files asynchronously, display a progress indicator and cancel the export.

The **progress** argument of the [PdfWebWorkerClient's](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_pdf.pdfwebworkerclient.html) [exportGrid](https://www.grapecity.com/wijmo/api/classes/wijmo_grid_pdf.pdfwebworkerclient.html#exportgrid) method is used to track the export progress, the
web worker's **terminate** method is used to cancel the export.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)