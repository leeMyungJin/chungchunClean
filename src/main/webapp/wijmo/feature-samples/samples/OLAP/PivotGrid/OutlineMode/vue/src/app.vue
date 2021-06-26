<template>
    <div class="container-fluid">
        <label>
            outlineMode
            <input id="outline" type="checkbox" v-model="outlineMode" v-on:change="outlineModeChanged">
        </label><br/>
        <label>
            custom style
            <input id="style" type="checkbox" v-model="customStyle">
        </label><br/>
        <label>
            totalsBeforeData
            <input id="before" type="checkbox" v-model="ng.totalsBeforeData">
        </label><br/>
        <label>
            showRowFieldHeaders
            <input id="headers" type="checkbox" v-model="showRowFieldHeaders">
        </label><br/>
        <div class="row">
            <div class="col-xs-5">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-7" :class="customStyle ? 'outline' : ''">
                <wj-pivot-grid
                    ref="grid"
                    :items-source="ng"
                    :outline-mode="outlineMode"
                    :show-row-field-headers="showRowFieldHeaders">
                </wj-pivot-grid>
                <button class="btn btn-primary" v-on:click="exportToCsv()">
                    Export to CSV
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
    import '@grapecity/wijmo.vue2.olap';
    import { PivotEngine } from '@grapecity/wijmo.olap';
    import { CellRange } from '@grapecity/wijmo.grid';
    import { saveFile } from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: "app",
        data: function () {
            return {
                ng: new PivotEngine({
                    itemsSource: getData(1000),
                    showRowTotals: 'Subtotals',
                    showColumnTotals: 'None',
                    totalsBeforeData: true,
                    rowFields: ['Country', 'Product', 'Color'],
                    valueFields: ['Sales', 'Expenses', 'Downloads']
                }),
                grid: null,
                outlineMode: true,
                customStyle: true,
                totalsBeforeData: true,
                showRowFieldHeaders: true
            };
        },
        methods: {
            outlineModeChanged() {
                if (this.outlineMode) {
                    this.ng.totalsBeforeData = this.totalsBeforeData = true;
                } else {
                    this.customStyle = false;
                }
            },
            exportToCsv() {
                let grid = this.$refs.grid.control,
                    //grid = this.grid,
                    rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1),
                    csv = grid.getClipString(rng, true, true, true);
                saveFile(csv, 'FlexGrid.csv');
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-pivotgrid {
        max-height: 400px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    .outline .wj-pivotgrid .wj-cell:not(.wj-state-selected) {
        border-right: none;
        border-bottom: none;
        background: #fff;
        color: #000;
    }

    body {
        margin-bottom: 24pt;
    }
</style>