<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-4">
                <wj-pivot-panel :items-source="ng" />
            </div>
            <div class="col-xs-8">
                <wj-pivot-grid :items-source="ng" />
            </div>
        </div>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import { PivotEngine } from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new PivotEngine({
                autoGenerateFields: false,
                fields: [
                    { header: 'Dimensions', subFields: [
                        { header: 'Buyer', binding: 'buyer' },
                        { header: 'Type', binding: 'type' },
                        { header: 'Date', subFields: [
                            { header: 'Year', binding: 'date', format: 'yyyy' },
                            { header: 'Quarter', binding: 'date', format: '"Q"Q' },
                            { header: 'Month', binding: 'date', format: 'MMM' },
                        ]}
                    ]},
                    { header: 'Measures', subFields: [
                        { header: 'Amount', binding: 'amount', format: 'c0'}
                    ]}
                ],
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Year', 'Quarter'], // by year and quarter
                columnFields: ['Buyer'], // and by buyer
                showRowTotals: 'Subtotals',
                itemsSource: getData(), // raw data
            })
        };
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#sample-panel {
	background: #eee;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.wj-pivotpanel .wj-flexgrid {
	background: inherit;
    max-height: 300px;
}
</style>