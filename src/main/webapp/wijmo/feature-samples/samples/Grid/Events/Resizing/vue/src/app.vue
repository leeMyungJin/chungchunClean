<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :initialized="flexInitialized">
            <wj-flex-grid-column binding="id" header="ID" :width="50" :isReadOnly="true" />
            <wj-flex-grid-column binding="country" header="Country" :isRequired="true" :dataMap="countries" />
            <wj-flex-grid-column binding="sales" header="Sales" format="n2" />
            <wj-flex-grid-column binding="expenses" header="Expenses" format="n2" />
            <wj-flex-grid-column binding="overdue" header="Overdue" />
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    //import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    //import "@grapecity/wijmo.vue2.input";
    import * as DataService from "./data";
    import { Tooltip, format } from "@grapecity/wijmo";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: DataService.getData(),
                countries: DataService.getCountries()
            };
        },
        methods: {
            flexInitialized: function(flexgrid) {
                let tt = new Tooltip();
                flexgrid.resizingColumn.addHandler((s, e) => {
                    var cell = s.columnHeaders.getCellElement(0, e.col);
                    var col = e.panel.columns[e.col];
                    var tip = format('Column: <b>{col}</b>, Width: <b>{wid:n0}px</b>', {
                        col: col.header || '[no header]',
                        wid: col.width
                    });
                    tt.show(cell, tip);
                });
                flexgrid.resizedColumn.addHandler(() => {
                    tt.hide();
                });
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }
</style>
