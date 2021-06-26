<template>
    <div class="container-fluid">
        <button @click="asSyncClick()" class="btn btn-default">AutoSizeRows (synchronously)</button>
        <wj-flex-grid
            :autoGenerateColumns="false"
            :initialized="initialized"
            :loadedRows="loadedRows"
            :cellEditEnded="cellEditEnded"
            :scrollPositionChanged="scrollPositionChanged"
            :resizedColumn="resizedColumn"
            :itemsSource="data">
            <wj-flex-grid-column binding="id" header="ID" :minWidth="60" :isReadOnly="true" />
            <wj-flex-grid-column binding="countries" header="Countries" :width="150" :wordWrap="true" />
            <wj-flex-grid-column binding="sales" header="Sales" />
            <wj-flex-grid-column binding="expenses" header="Expenses" />
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid";
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData()
        };
    },
    methods: {
        initialized: function(grid) {
            this.theGrid = grid;
            setTimeout(() => {
                this.autoSizeRowsAsync(grid);
            }, 50);
        },

        loadedRows: function(grid) {
            this.autoSizeRowsAsync(grid);
        },

        cellEditEnded: function(grid, e) {
            if (grid.columns[e.col].wordWrap) {
                this.autoSizeRowsAsync(grid, e.row);
            }
        },

        scrollPositionChanged: function(grid, e) {
            var vr = grid.viewRange;
            for (var r = vr.topRow; r <= vr.bottomRow; r++) {
                if (grid.rows[r].height == null) {
                    grid.autoSizeRows(r, r);
                }
            }
        },

        resizedColumn: function(grid, e) {
            if (grid.columns[e.col].wordWrap) {
                this.autoSizeRowsAsync(grid);
            }
        },

        asSyncClick: function() {
            var start = Date.now();
            this.theGrid.autoSizeRows();
            alert('AutoSized all rows in ' + (Date.now() - start) + 'ms');
        },

        autoSizeRowsAsync: function(grid, rowIndex) {
            if (rowIndex != null) {
                grid.rows[rowIndex].height = null;
            } else {
                grid.rows.forEach(row => row.height = null);
            }
            grid.onScrollPositionChanged();
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-flexgrid {
    max-height: 300px;
    margin: 6px 0;
}
</style>
