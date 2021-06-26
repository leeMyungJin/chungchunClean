<template>
    <div class="container-fluid">
            <label for="chartType">Chart Type:</label>
            <wj-combo-box id="chartType" :text="chartType" :textChanged="chartTypeChanged" :itemsSource="chartTypeData"></wj-combo-box><br>
            <label for="stepPosition">Step Position:</label>
            <wj-combo-box id="stepPosition" text="Center" :textChanged="stepPositionChanged" :itemsSource="stepPositionData"></wj-combo-box><br>
        <div class="form-group">
            <wj-flex-chart :chartType="chartType" bindingX="month" :itemsSource="data" :initialized="initializeChart">
                <wj-flex-chart-legend position="Top"></wj-flex-chart-legend>
                <wj-flex-chart-axis wjProperty="axisX" :axisLine='false' majorTickMarks="None"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" :majorGrid='false'></wj-flex-chart-axis>
                <wj-flex-chart-series binding="sms" name="Total SMS"></wj-flex-chart-series>
                <wj-flex-chart-series binding="email" name="Total Emails"></wj-flex-chart-series>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import { getData, getChartTypeData, getStepPositionData } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                chartType: "Step",
                chartTypeData: getChartTypeData(),
                stepPositionData: getStepPositionData()
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                this.theChart.options = { step: { position : "center" }};
            },
            chartTypeChanged: function(combo) {
                this.chartType = combo.text;
            },
            stepPositionChanged: function(combo) {
                this.theChart.options.step.position = combo.text.toLowerCase();
                this.theChart.refresh();
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexchart {
        height: 300px;
    }

    label {
        margin-right: 3px;
        width: 150px;
        text-align: right;
    }

    .wj-control {
        margin-bottom: 3px;
    }

    .wj-flexchart .wj-legend .wj-label {
        opacity: .9;
        font-size: 80%;
    }
</style>
