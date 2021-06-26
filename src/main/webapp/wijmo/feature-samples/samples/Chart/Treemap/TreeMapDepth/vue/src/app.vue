<template>
    <div class="container-fluid">
        <div class="form-group">
            <label>Max Depth</label>
            <wj-input-number :min="0" :max="4" :step="1" format="n0" :value="maxDepth" :valueChanged="maxDepthChanged"></wj-input-number>
        </div>
        <div class="form-group">
            <wj-tree-map binding="sales" bindingName="type" childItemsPath="items" 
                labelContent="{name}" :itemsSource="data" :palette="palette" :maxDepth="maxDepth">
            </wj-tree-map>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart.hierarchical';
    import { getData } from './data';
    import { isArray } from '@grapecity/wijmo';
    import { Palettes } from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette(),
                maxDepth: 1
            }
        },
        methods: {
            maxDepthChanged: function(s) {
                if (s.value >= s.min && s.value <= s.max) {
                    this.maxDepth = s.value;
                }
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
