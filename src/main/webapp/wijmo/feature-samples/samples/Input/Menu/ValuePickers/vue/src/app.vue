<template>
    <div class="container-fluid">
        <wj-menu :value="tax" :header="'Tax'" :itemClicked="selectedTaxChanged">
            <wj-menu-item :value="0">Exempt</wj-menu-item>
            <wj-menu-item :value="0.01">1%</wj-menu-item>
            <wj-menu-item :value="0.05">5%</wj-menu-item>
            <wj-menu-item :value="0.085">8.5%</wj-menu-item>
            <wj-menu-item :value="0.10">10%</wj-menu-item>
            <wj-menu-item :value="0.20">20%</wj-menu-item>
        </wj-menu>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            const tax = 0.085;
            //
            return { tax };
        },
        methods: {
            selectedTaxChanged: function(sender){
                if (sender.selectedValue) {
                    this.tax = sender.selectedValue;
                }
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }
</style>
