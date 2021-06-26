<template>
    <div class="container-fluid">
        <p>
            This sample shows how to use the <b>cellTemplate</b> property
            which does not depend on any frameworks.
            The template strings must be escaped since in Vue the components
            are defined as template literals, so the <b>cellTemplate</b>
            is a literal within another literal.
        </p>    

        <wj-flex-grid
            showSelectedHeaders="All"
            selectionMode="MultiRange"
            headersVisibility="Column"
            :showMarquee="true"
            :autoGenerateColumns="false"
            :itemsSource="data">

            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" width=".5*" />
            <wj-flex-grid-column binding="date" header="Date" width="*" />
            <wj-flex-grid-column binding="product" header="Product" :dataMap="products" width="*" />

            <!-- any $ signs in cell templates must be escaped as \$ within component template -->
            <wj-flex-grid-column binding="country" header="Country *" :dataMap="countryMap" width="*"
                cellTemplate="<span class='flag-icon flag-icon-\${col.dataMap.getDataItem(value).flag}'></span> \${text}"
            />

            <!-- any $ signs in cell templates must be escaped as \$ within component template -->
            <wj-flex-grid-column binding="color" header="Color *" :dataMap="colors" width="*"
                cellTemplate="<span class='color-tile' style='background:\${value}'></span> \${text}"
            />

            <wj-flex-grid-column binding="value" header="Value" format="c0" width="*" />

            <!-- any $ signs in cell templates must be escaped as \$ within component template -->
            <wj-flex-grid-column binding="change" header="Change *" format="p0" align="center" width="*"
                cellTemplate="<span class=\${value > 0 ? 'change-up' : 'change-down'}>\${text}</span>"
            />
        </wj-flex-grid>
        <p>
            <b>*</b>: Columns created with the <b>cellTemplate</b> property.
        </p>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.css';

import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as DataService from './data';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: DataService.getData(20),
            products: DataService.getProducts(),
            colors: DataService.getColors(),
            countryMap: DataService.getCountryMap()
        };
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 400px;
    }
    .wj-flexgrid .wj-cell {
        padding: 6px 12px;
    }
    .wj-flexgrid .wj-cell:not(.wj-header) {
        border-right: none;
    }

    .color-tile {
        display: inline-block;
        position: relative;
        width: 1.33333333em;
        height: 1em;
        vertical-align: middle;
        border: 1px solid grey;
    }

    .change-up {
        color: darkgreen;
    }
    .change-up:before {
        content: '\25b2\00a0';
    }
    .change-down {
        color: darkred;
    }
    .change-down:before {
        content: '\25bc\00a0';
    }
</style>