<template>
	<div class="container-fluid">
        <wj-collection-view-navigator
            :byPage="true"
            headerFormat="Page {currentPage:n0} of {pageCount:n0}"
            :cv="data" />
		<wj-flex-grid
            :isReadOnly=true
            :alternatingRowStep=0
            headersVisibility="Column"
            :itemsSource="data" />
	</div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";
    import { ODataCollectionView } from '@grapecity/wijmo.odata';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';

    new Vue({
        el: "#app",
        data: {
            data: getData()
        }
    });

    function getData() {
        var url = 'https://services.odata.org/Northwind/Northwind.svc';
        return new ODataCollectionView(url, 'Customers', {
            pageSize: 6,
            pageOnServer: true,
            sortOnServer: true
        });
    }
</script>

