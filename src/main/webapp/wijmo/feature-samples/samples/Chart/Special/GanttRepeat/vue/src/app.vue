<template>
    <div class="container-fluid">
        <wj-flex-chart
            :itemsSource="data"
            chartType="Bar"
            bindingX="index"
            plotMargin="auto auto auto 180"
            :tooltipContent="getTooltipContent">
            <wj-flex-chart-series 
                binding="start,end">
            </wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisY"
                :majorGrid="false"
                :minorGrid="true"
                :reversed="true"
                :itemFormatter="formatter">
            </wj-flex-chart-axis>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import { format } from '@grapecity/wijmo';
    import { getData } from './data';

    new Vue({
        el: '#app',
        data: {
            data: getData()
        },
        methods: {
    
            // show task name and duraction in tooltip
            getTooltipContent(ht) {
                var str = format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
                    name: ht.item.name,
                    start: ht.item.start,
                    end: ht.item.end
                });
                return str;
            },

            // replace item index with item name in Y axis
            formatter(engine, label) {
                for (var i = 0; i < this.data.length; i++) {
                    var item = this.data[i];
                    if (item.index == label.val) {
                        label.text = item.name;
                        break;
                    }
                }
                return label;
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24pt;
    }
</style>