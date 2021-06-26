<template>
    <div class="container-fluid">
        <!-- Settings -->
        <div class="panel-group" id="settings">
            <div class="panel panel-default">
                <div id="settingsBody" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <ul class="list-inline">
                            <li>
                                <label>Reversal Amount</label>
                                <wj-input-number
                                    :value="options.kagi.reversalAmount"
                                    :min="0"
                                    :step="1"
                                    format="'n0'"
                                    :valueChanged="reversalAmountChanged"
                                    :initialized="initlizeInput">
                                </wj-input-number>
                            </li>
                            <li>
                                <wj-menu
                                    :header="'Range Mode'"
                                    :value="options.kagi.rangeMode"
                                    :itemClicked="rmClick">
                                    <wj-menu-item value="Fixed">Fixed</wj-menu-item>
                                    <wj-menu-item value="ATR">Average True Range</wj-menu-item>
                                    <wj-menu-item value="Percentage">Percentage</wj-menu-item>
                                </wj-menu>
                            </li>
                            <li>
                                <wj-menu
                                    :header="'Data Fields'"
                                    :value="options.kagi.fields"
                                    :itemClicked="fieldsClick">
                                    <wj-menu-item :value="'High'">High</wj-menu-item>
                                    <wj-menu-item :value="'Low'">Low</wj-menu-item>
                                    <wj-menu-item :value="'Open'">Open</wj-menu-item>
                                    <wj-menu-item :value="'Close'">Close</wj-menu-item>
                                    <wj-menu-item :value="'HighLow'">High/Low</wj-menu-item>
                                    <wj-menu-item :value="'HL2'">HL Avg.</wj-menu-item>
                                    <wj-menu-item :value="'HLC3'">HLC Avg.</wj-menu-item>
                                    <wj-menu-item :value="'HLOC4'">HLOC Avg.</wj-menu-item>
                                </wj-menu>
                            </li>
                        </ul>
                        <ul class="list-inline">
                            <li>
                                <label>Stroke</label>
                                <wj-input-color
                                    :value="style.stroke"
                                    :valueChanged="strokeOptionChanged">
                                </wj-input-color>
                            </li>
                            <li>
                                <label>Alt. Stroke</label>
                                <wj-input-color
                                    :value="altStyle.stroke"
                                    :valueChanged="altStrokeOptionChanged">
                                </wj-input-color>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- FinancialChart -->
        <wj-financial-chart
            :initialized="initializeChart"
            :itemsSource="data"
            bindingX="date"
            chartType="Kagi"
            :tooltipContent="tooltip"
            :options="options">
            <wj-financial-chart-series
                binding="high,low,open,close"
                name="Facebook"
                :style="style"
                :altStyle="altStyle">
            </wj-financial-chart-series>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
        </wj-financial-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.finance';
    import { getData } from './data';
    import * as core from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                options: {
                    kagi: {
                        reversalAmount: 1,
                        rangeMode: 'Fixed',
                        fields: 'Close'
                    }
                },
                fieldsText: 'Close',
                style: {
                    stroke: 'rgb(136, 189, 230)'
                },
                altStyle: {
                    stroke: 'rgb(136, 189, 230)'
                }
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                this.ser = flex.series[0];
            },
            initlizeInput: function(flex) {
                this.inputNumber = flex;
            },
            rmClick: function(menu) {
                if(menu.selectedItem) {
                    let selectedValue = menu.selectedItem.value;
                    this.options.kagi.rangeMode = selectedValue;

                    var reversalInput = this.inputNumber;
                    if (selectedValue === 'Percentage') {
                        reversalInput.format = 'p0';
                        reversalInput.min = 0;
                        reversalInput.max = 1;
                        reversalInput.value = core.clamp(reversalInput.value, 0, .05);
                        reversalInput.step = 0.05;
                    } else if (selectedValue === 'ATR') {
                        reversalInput.format = 'n0';
                        reversalInput.min = 2;
                        reversalInput.max = this.data.length - 2;
                        reversalInput.value = core.clamp(reversalInput.value, 14, this.data.length - 2);
                        reversalInput.step = 1;
                    } else {
                        reversalInput.format = 'n0';
                        reversalInput.min = 1;
                        reversalInput.max = null;
                        reversalInput.value = 1;
                        reversalInput.step = 1;
                    }
                }
                this.optionChanged();
            },
            fieldsClick: function(menu) {
                if(menu.selectedItem) {
                    this.options.kagi.fields = menu.selectedItem.value;
                }
                this.optionChanged();
            },
            tooltip: function(ht) {
                var date = ht.item && ht.item.date ? ht.item.date : null,
                    content = '';
                //
                if (core.isDate(date)) {
                    date = core.Globalize.formatDate(date, 'MM/dd/yy');
                }
                if (ht && ht.item) {
                    content =
                    '<b>' + ht.name + '</b><br/>' +
                    'Date: ' + date + '<br/>' +
                    'Open: ' + core.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                    'High: ' + core.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                    'Low: ' + core.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                    'Close: ' + core.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                    'Volume: ' + core.Globalize.format(ht.item.volume, 'n0');
                }
                return content;
            },
            strokeOptionChanged: function(input) {
                this.style.stroke = input.value;
                this.ser.style.stroke = input.value;
                this.optionChanged();
            },
            altStrokeOptionChanged: function(input) {
                this.altStyle.stroke = input.value;
                this.optionChanged();
            },
            optionChanged: function() {
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            reversalAmountChanged: function(input) {
                if (input.value < input.min || (input.max && input.value > input.max)) {
                    return;
                }
                this.options.kagi.reversalAmount = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
