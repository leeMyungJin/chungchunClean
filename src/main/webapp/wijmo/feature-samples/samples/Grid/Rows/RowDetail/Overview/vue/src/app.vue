<template>
<div class="container-fluid">
    <h3>HTML in Row Details</h3>
    <p>
        This grid shows product categories on each row. Expanding
        the rows shows an HTML element with information about
        the products in that category:
    </p>
    <wj-flex-grid :itemsSource="categories" :isReadOnly=true>
        <wj-flex-grid-column header="Category Name" binding="CategoryName"></wj-flex-grid-column>
        <wj-flex-grid-column header="Description" binding="Description" width="*"></wj-flex-grid-column>
        <wj-flex-grid-detail :isAnimated=true v-slot="ctx">
            ID: <b>{{ctx.item.CategoryID}}</b><br />
            Name: <b>{{ctx.item.CategoryName}}</b><br />
            Description: <b>{{ctx.item.Description}}</b><br />
            Products: <b>{{getProducts(ctx.item.CategoryID).length}} items</b><br />
            <ol>
                <li v-for="p in getProducts(ctx.item.CategoryID)" v-bind:key="p.ProductID">{{p.ProductName}}</li>
            </ol>
        </wj-flex-grid-detail>
    </wj-flex-grid>

    <h3>Grids in Row Details</h3>
    <p>
        You can add anything you want to the detail rows,
        including other grids. This example shows the same
        categories, but the detail row uses another grid
        to show the products:
    </p>
    <wj-flex-grid :autoGenerateColumns=false :itemsSource="categories" :isReadOnly=true>
        <wj-flex-grid-column header="Category Name" binding="CategoryName" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="Description" binding="Description" width="2*"></wj-flex-grid-column>
        <wj-flex-grid-detail v-slot="ctx"
            :detailVisibilityMode="detailVisibilityMode"
            :maxHeight="maxHeight"
            :isAnimated="isAnimated"
            :keyActionEnter="keyActionEnter"
            :rowHasDetail="evenRowHasDetail ? rowHasDetailFn : null">
            <wj-flex-grid :itemsSource="getProducts(ctx.item.CategoryID)" :isReadOnly="true"
                headersVisibility="Column">
                <wj-flex-grid-column header="ID" binding="ProductID"></wj-flex-grid-column>
                <wj-flex-grid-column header="Name" binding="ProductName"></wj-flex-grid-column>
                <wj-flex-grid-column header="Qty/Unit" binding="QuantityPerUnit"></wj-flex-grid-column>
                <wj-flex-grid-column header="Unit Price" binding="UnitPrice"></wj-flex-grid-column>
                <wj-flex-grid-column header="Discontinued" binding="Discontinued"></wj-flex-grid-column>
            </wj-flex-grid>
        </wj-flex-grid-detail>
    </wj-flex-grid>
    <div class="grid-options">
        <wj-menu
            :header="'detailVisibilityMode'"
            :value="detailVisibilityMode"
            :itemClicked="itemClicked.bind(this,'detailVisibilityMode')">
            <wj-menu-item :value="'Code'">Code</wj-menu-item>
            <wj-menu-item :value="'Selection'">Selection</wj-menu-item>
            <wj-menu-item :value="'ExpandSingle'">ExpandSingle</wj-menu-item>
            <wj-menu-item :value="'ExpandMulti'">ExpandMulti</wj-menu-item>
        </wj-menu>
        <wj-menu
            :header="'maxHeight'"
            :value="maxHeight"
            :itemClicked="itemClicked.bind(this,'maxHeight')">
            <wj-menu-item :value="0">null</wj-menu-item>
            <wj-menu-item :value="100">100</wj-menu-item>
            <wj-menu-item :value="200">200</wj-menu-item>
            <wj-menu-item :value="300">300</wj-menu-item>
            <wj-menu-item :value="400">400</wj-menu-item>
            <wj-menu-item :value="500">500</wj-menu-item>
        </wj-menu>
        <wj-menu
            :header="'isAnimated'"
            :value="isAnimated"
            :itemClicked="itemClicked.bind(this,'isAnimated')">
            <wj-menu-item :value="true">True</wj-menu-item>
            <wj-menu-item :value="false">False</wj-menu-item>
        </wj-menu>
        <wj-menu
            :header="'keyActionEnter'"
            :value="keyActionEnter"
            :itemClicked="itemClicked.bind(this,'keyActionEnter')">
            <wj-menu-item :value="'None'">None</wj-menu-item>
            <wj-menu-item :value="'ToggleDetail'">ToggleDetail</wj-menu-item>
        </wj-menu>
        <wj-menu
            :header="'rowDetails'"
            :value="evenRowHasDetail"
            :itemClicked="itemClicked.bind(this,'evenRowHasDetail')">
            <wj-menu-item :value="false">All</wj-menu-item>
            <wj-menu-item :value="true">Even rows only</wj-menu-item>
        </wj-menu>
    </div>
</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { ODataCollectionView } from "@grapecity/wijmo.odata";
import * as wjGridDetail from "@grapecity/wijmo.grid.detail";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.grid.detail";
import "@grapecity/wijmo.vue2.input";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            categories : [],
            products : [],
            detailVisibilityMode: 'ExpandSingle',
            maxHeight: 0,
            isAnimated: true,
            keyActionEnter: 'None',
            evenRowHasDetail: false,
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
        itemClicked: function(prop, s, e) {
            if (s.selectedIndex > -1) {
                this[prop] = s.selectedValue;
            }
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
    .grid-options .wj-menu {
        margin: 0.25em 0.5em 0.25em 0;
    }
</style>
