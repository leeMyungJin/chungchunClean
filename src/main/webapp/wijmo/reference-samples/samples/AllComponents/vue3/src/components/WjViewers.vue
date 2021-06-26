<template>
    <div>
        <h3>
            ReportViewer Control
        </h3>
        <div>
            This section shows ReportViewer Control.

        </div>
        <p />
        <div class="seperator" />
        <wj-report-viewer
                :service-url="reportServiceUrl"
                :file-path="reportFilePath"
                :report-name="reportName" />

        <p />
        <h3>
            PdfViewer Control
        </h3>
        <div>
            This section shows PdfViewer Control.

        </div>
        <p />
        <div class="seperator" />
        <wj-pdf-viewer
                :service-url="pdfServiceUrl"
                :file-path="pdfFilePath" />

    </div>
</template>


<script>
export default {
    data: function () {
        return {
            reportServiceUrl: 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/report',
            reportFilePath: 'ReportsRoot/Formatting/AlternateBackground.flxr',
            reportName: 'AlternateBackground',
            pdfServiceUrl: 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/pdf',
            pdfFilePath: 'pdfroot/DefaultDocument.pdf'    
        }
    }
};
</script>
