<template>
    <div class="container-fluid">
        <wj-flex-radar bindingX="longitude" :palette="palette" :initialized="initialized">
            <wj-flex-radar-axis wjProperty="axisY" :min="0" :max="100" :majorUnit="25"></wj-flex-radar-axis>
            <wj-flex-radar-series binding="latitude1"></wj-flex-radar-series>
            <wj-flex-radar-series binding="latitude2"></wj-flex-radar-series>
            <wj-flex-chart-animation easing="EaseInOutBounce" animationMode="Series" :duration="500"></wj-flex-chart-animation>
        </wj-flex-radar>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.radar';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';
    import { isArray } from '@grapecity/wijmo';
    import { Palettes } from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette()
            }
        },
        methods: {
            getRandomPalette() {
                let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
                let rand = Math.floor(Math.random() * palettes.length);
                return Palettes[palettes[rand]];
            },
            initialized: function(theChart) {
                let app = this;
                setTimeout(function () {
                    theChart.itemsSource = app.data;
                }, 200);
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
