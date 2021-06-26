<template>
    <div class="container-fluid">
        <label>
            Category
            <wj-combo-box
                placeholder="(All Categories)"
                displayMemberPath="CategoryName"
                :isRequired="false"
                :itemsSource="categories"
                :selectedIndexChanged="categoryChanged"/>
        </label>
        <div class="row">
            <div class="col-sm-6">
                <wj-flex-grid
                    selectionMode="MultiRange"
                    :showMarquee="true"
                    :isReadOnly="true"
                    :itemsSource="products">
                    <wj-flex-grid-column binding="ProductName" header="Product Name" :width="200" />
                    <wj-flex-grid-column binding="UnitPrice" header="Unit Price" format="n2" />
                    <wj-flex-grid-column binding="QuantityPerUnit" header="Quantity Per Unit" :width="150" />
                    <wj-flex-grid-column binding="SupplierID" header="Supplier" :dataMap="supplierMap" :width="200" />
                    <wj-flex-grid-column binding="UnitsInStock" header="In Stock" format="n0" />
                    <wj-flex-grid-column binding="UnitsOnOrder" header="On Order" format="n0" />
                </wj-flex-grid>
            </div>
            <div class="col-sm-6">
                <wj-flex-chart
                    chartType="Bar"
                    bindingX="ProductName"
                    :itemsSource="products">
                    <wj-flex-chart-legend position="Bottom" />
                    <wj-flex-chart-axis wjProperty="axisX" :majorGrid="true" :axisLine="false" />
                    <wj-flex-chart-axis wjProperty="axisY" :majorGrid="false" :axisLine="false" :reversed="true" />
                    <wj-flex-chart-series binding="UnitPrice" name="Product Unit Prices (US$)" />
                </wj-flex-chart>
            </div>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { Firestore } from "@grapecity/wijmo.cloud";
import { DataMap } from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.chart";

new Vue({
    el: "#app",
    data: function() {

        // create the Firestore data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const PROJECT_ID = 'test-9c0be';
        let fireStore = new Firestore(PROJECT_ID, API_KEY, {
            collections: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose categories, products, supplier map
        return {
            categories: fireStore.getCollection('Categories'),
            products: fireStore.getCollection('Products'),
            supplierMap: new DataMap(fireStore.getCollection('Suppliers'), 'SupplierID', 'CompanyName')
        };
    },    
    methods: {

        // update product filter when selected category changes
        categoryChanged: function(categoryCombo) {
            let cat = categoryCombo.selectedItem;
            this.products.filter = function(item) {
                return cat == null || cat.CategoryID == item.CategoryID;
            };
        }
    },
});
</script>

<style>
    .wj-flexgrid,
    .wj-flexchart {
        height: 350px;
    }

    .wj-axis-y .wj-label {
        font-size: 85%;
    }

    .container-fluid label {
        font-weight: normal;
    }

    .container-fluid label .wj-control {
        font-weight: bold;
    }
</style>