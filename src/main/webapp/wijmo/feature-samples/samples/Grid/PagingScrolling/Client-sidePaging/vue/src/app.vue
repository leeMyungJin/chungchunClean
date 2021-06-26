<template>
	<div class="container-fluid">
        <wj-collection-view-navigator
            headerFormat="Page {currentPage:n0} of {pageCount:n0}"
            :byPage="true"
            :cv="data" />
        <wj-flex-grid
            headersVisibility="Column"
            :alternatingRowStep="0"
            :itemsSource="data" />
	</div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";
    import { CollectionView } from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';

    new Vue({
        el: "#app",
        data: {
            data: _getData()
        }
    });

    function _getData() {

        // create an array with 1000 data items
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        let products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
        let data = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }

        // create a paged CollectionView with 6 data items per page
        return new CollectionView(data, {
            pageSize: 6
        });
    }
</script>

