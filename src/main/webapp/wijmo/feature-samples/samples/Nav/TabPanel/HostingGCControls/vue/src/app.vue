<template>
    <div class="container-fluid">
        <wj-tab-panel>
            <wj-tab>
                <a>FlexGrid</a>
                <div>
                    <wj-flex-grid :itemsSource="data">
                    </wj-flex-grid>
                </div>
            </wj-tab>
            <wj-tab>
                <a>FlexChart</a>
                <div>
                    <wj-flex-chart :itemsSource="data" :bindingX="'country'">
                    <wj-flex-chart-series :name="'Sales'" :binding="'sales'"></wj-flex-chart-series>
                    <wj-flex-chart-series :name="'Expenses'" :binding="'expenses'"></wj-flex-chart-series>
                    <wj-flex-chart-series :name="'Downloads'" :binding="'downloads'"></wj-flex-chart-series>
                    </wj-flex-chart>
                </div>
            </wj-tab>
            <wj-tab>
                <a>Gauges</a>
                <div style="overflow:hidden">
                    <wj-radial-gauge style="display:block" :value="75" :min="0" :isReadOnly="false" :max="100">
                    </wj-radial-gauge>
                    <wj-linear-gauge style="display:block" :value="75" :min="0" :isReadOnly="false" :max="100">
                    </wj-linear-gauge>
                </div>
            </wj-tab>
        </wj-tab-panel>
    </div>
</template>

<script>
    import Vue from "vue";
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.gauge';
    import DataService from './data';
    import '@grapecity/wijmo.vue2.nav';

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: DataService.getData(),
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-tabpanes {
        padding: 12px 0;
    }
    .wj-tabpanel .wj-gauge {
        width: 300px;
        margin: auto auto;
    }
</style>
