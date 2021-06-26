<template>
    <div className="container-fluid">

        <label>
            Paging
            <input id="paging"
                type="checkbox"
                :checked="view.pageSize > 0"
                v-on:click="view.pageSize = view.pageSize == 0 ? 8 : 0">
        </label>

        <br />

        <wj-collection-view-navigator
            :cv="view"
            :byPage="true" />
        <wj-flex-grid
            :isReadOnly="true"
            :showMarquee="true"
            :deferResizing="true"
            :alternatingRowStep="0"
            selectionMode="MultiRange"
            :itemsSource="view"
            :initialized="initGrid">
            <wj-flex-grid-filter />
        </wj-flex-grid>
    </div >
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    
    import Vue from 'vue';
    import "@grapecity/wijmo.vue2.grid";
    import "@grapecity/wijmo.vue2.grid.filter";
    import "@grapecity/wijmo.vue2.input";
    import { RestCollectionViewOData } from './rest-collection-view-odata';
    
    // Northwind OData service
    const urlOData = 'https://services.odata.org/V4/Northwind/Northwind.svc';

    // fields and columns to show
    const fields = 'CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax'.split(',');

    new Vue({
        el: '#app',
        data: function () {
            return { 
                view: new RestCollectionViewOData(urlOData, 'Customers', {
                    fields: fields,
                    pageSize: 8,
                    sortDescriptions: ['CustomerID']
                })
            }
        },
        methods: {
            initGrid: function(s) {
                s.topLeftCells.columns[0].cellTemplate = function($) {
                    return $.text || ($.row.index + 1).toString()
                }
            }
        }
    })
</script>

<style>
    body {
        margin-bottom: 36pt;
    }

    .wj-flexgrid {
        max-height: 400px;
    }
</style>