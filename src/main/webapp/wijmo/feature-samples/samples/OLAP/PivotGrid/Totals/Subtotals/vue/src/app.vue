<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-7">
                <wj-pivot-grid :items-source="ng" :initialized="initializePivotGrid"></wj-pivot-grid>
            </div>
        </div>
            <p>
                You can configure the <b>PivotEngine</b> to show the row totals
                using the <b>showRowTotals</b> property:
            </p>
        <label>
            showRowTotals:
            <input id="showRowTotals" type="checkbox" v-on:click="onShowRowTotalsClick">
        </label>
            <p>
                You can configure the <b>PivotGrid</b> to show column totals
                using the <b>showColumnTotals</b> property:
            </p>
        <label>
            showColumnTotals:
            <input id="showColumnTotals" type="checkbox" checked v-on:click="onShowColumnTotalsClick">
        </label>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import '@grapecity/wijmo.vue2.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(1000), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'], // by buyer and Type
                showRowTotals: 'None',
                showColumnTotals: 'Subtotals',
            })
        };
    },
    mounted: function() {
        this.ng.fields.getField('Amount').format = 'c0';
        this.ng.fields.getField('Date').format = 'yyyy';
    },
    methods: {
        initializePivotGrid(pivotGrid) {
            this.pivotGrid = pivotGrid;
        },

        onShowRowTotalsClick(e) {
            this.pivotGrid.engine.showRowTotals = e.target.checked ?
                wjcOlap.ShowTotals.Subtotals : wjcOlap.ShowTotals.None;
        },
        
        onShowColumnTotalsClick(e) {
            this.pivotGrid.engine.showColumnTotals = e.target.checked ?
                wjcOlap.ShowTotals.Subtotals : wjcOlap.ShowTotals.None;
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
.container > label {
	margin: 0 0 2em 2em;
}
body {
  margin-bottom: 24pt;
}
</style>