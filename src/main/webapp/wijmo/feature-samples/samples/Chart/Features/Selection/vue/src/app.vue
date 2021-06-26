<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-menu
                :value="selectionMode"
                :header="'Selection Mode'"
                :itemClicked="selectionModeChanged">
                <wj-menu-item value="Point">Point</wj-menu-item>
                <wj-menu-item value="Series">Series</wj-menu-item>
                <wj-menu-item value="None">None</wj-menu-item>
            </wj-menu>
            <wj-flex-chart
                header="Country GDP"
                bindingX="country"
                :selectionMode="selectionMode"
                :itemsSource="data"
                :palette="palette">
                <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
                <wj-flex-chart-series binding="2014" name="2014"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2015" name="2015"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2016" name="2016"></wj-flex-chart-series>
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
    import { getData } from './data';
    import { isArray } from '@grapecity/wijmo';
    import { Palettes } from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette(),
                selectionMode: 'Point'
            }
        },
        methods: {
            selectionModeChanged: function(menu) {
                if (!menu.selectedValue) {
                    return;
                }
                this.selectionMode = menu.selectedValue;
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return Palettes[palettes[rand]];
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
