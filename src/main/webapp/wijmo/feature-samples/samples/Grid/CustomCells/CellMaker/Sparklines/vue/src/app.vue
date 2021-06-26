<template>
    <div class="container-fluid">
        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :itemsSource="data">

            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" :width="80" />
            <wj-flex-grid-column binding="country" header="Country" :dataMap="countries" />

            <wj-flex-grid-column
                binding="history"
                header="Sparklines: Line"
                :width="175"
                :cellTemplate="tplSparkLine" />
            <wj-flex-grid-column
                binding="history"
                header="Sparklines: Column"
                :width="175"
                :cellTemplate="tplSparkColumn" />
            <wj-flex-grid-column
                binding="history"
                header="Sparklines: WinLoss"
                :width="175"
                :cellTemplate="tplSparkWinLoss" />

        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';

    import { CellMaker, SparklineType, SparklineMarkers } from '@grapecity/wijmo.grid.cellmaker';
    import { getData, getCountries } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {

                // data
                countries: getCountries(),
                data: getData(1000),

                // cell templates
                tplSparkLine: CellMaker.makeSparkline({
                    markers: SparklineMarkers.High | SparklineMarkers.Low,
                    label: '${item.country} sales history line chart',
                }),
                tplSparkColumn: CellMaker.makeSparkline({
                    type: SparklineType.Column,
                    markers: SparklineMarkers.High | SparklineMarkers.Low,
                    label: '${item.country} sales history column chart'
                }),
                tplSparkWinLoss: CellMaker.makeSparkline({
                    type: SparklineType.WinLoss,
                    markers: SparklineMarkers.Negative,
                    label: '${item.country} sales history win/loss chart'
                })
            }
        },
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexgrid {
        max-height: 300px;
    }
    .wj-flexgrid .wj-cell {
        padding: 6px 10px;
    }
</style>
