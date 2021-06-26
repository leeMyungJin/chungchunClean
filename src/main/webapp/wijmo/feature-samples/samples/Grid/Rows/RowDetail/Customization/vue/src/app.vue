<template>
<div class="container-fluid">
    <h3>Using custom elements to show or hide details</h3>
    <p>
        This grid shows product categories on each row with custom show/hide elements. Expanding
        the rows shows an HTML element with information about
        the products in that category:
    </p>
    <wj-flex-grid id="customDetail" :itemsSource="categories" :isReadOnly=true
        headersVisibility="Column" selectionMode="Row">
        <wj-flex-grid-detail :isAnimated=true v-slot="ctx" ref="rowDetail"
            :detailVisibilityMode="'Code'" :rowHasDetail="rowHasDetailFn">
            ID: <b>{{ctx.item.CategoryID}}</b><br />
            Name: <b>{{ctx.item.CategoryName}}</b><br />
            Description: <b>{{ctx.item.Description}}</b><br />
            <button class="btn btn-default btn-xs" @click="hideDetail(ctx.row)">Hide Detail</button>
        </wj-flex-grid-detail>
        <wj-flex-grid-column header="Category Name" binding="CategoryName" :isReadOnly=true width="*">
            <wj-flex-grid-cell-template cellType="Cell" v-slot="ctx">
                <span v-if="!isDetailAvailable(ctx.row)" class="glyphicon"></span>
                <span v-if="isDetailAvailable(ctx.row) && isDetailVisible(ctx.row)"
                    class="glyphicon glyphicon-chevron-up"
                    @click="hideDetail(ctx.row)"></span>
                <span v-if="isDetailAvailable(ctx.row) && !isDetailVisible(ctx.row)"
                    class="glyphicon glyphicon-chevron-down"
                    @click="showDetail(ctx.row)"></span>
                {{ctx.item.CategoryName}} (ID: {{ctx.item.CategoryID}})
            </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column header="Description" binding="Description" width="2*"></wj-flex-grid-column>
    </wj-flex-grid>
</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { ODataCollectionView } from "@grapecity/wijmo.odata";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.grid.detail";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            categories : [],
            products : [],
        };
    },
    methods: {
        getProducts(categoryID) {
            let categoryProducts = this._catToProductMap.get(categoryID);
            if (!categoryProducts) {
                categoryProducts = this.products.items.filter(
                    (product) => product.CategoryID === categoryID);
                this._catToProductMap.set(categoryID, categoryProducts);
            }
            return categoryProducts;
        },
        isDetailAvailable: function (row) {
            return this.rowDetailControl.isDetailAvailable(row);
        },
        isDetailVisible: function (row) {
            return this.rowDetailControl.isDetailVisible(row);
        },
        hideDetail: function (row) {
            return this.rowDetailControl.hideDetail(row);
        },
        showDetail: function (row) {
            return this.rowDetailControl.showDetail(row, true);
        },
    },
    beforeCreate: function () {
        this.rowHasDetailFn = row => !(row.dataItem.CategoryID % 2);
    },
    mounted: function () {
        const url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.categories = new ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description']
        });
        this.products = new ODataCollectionView(url, 'Products');
        this._catToProductMap = new Map();
        this.rowDetailControl = this.$refs.rowDetail.control;
    },
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 350px; 
    }
    body {
        margin-bottom: 20pt;
    }
    #customDetail .glyphicon {
        font-size: 1.25em;
        margin-right: 0.5em;
        cursor: pointer;
        color: gray;
        width: 1em;
    }
</style>
