<template>
    <div class="container-fluid">
        <div>EAN-13 barcode</div>
        <wj-barcode-ean13 :value="theValue" :addOn="theAddOn"></wj-barcode-ean13>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.barcode.common';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theValue: '963850741111',
                theAddOn: 86,
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    @import './node_modules/@grapecity/wijmo.styles/wijmo.css';
    body {
        margin-bottom: 36px;
    }

    .wj-barcode-ean13 {
        width: 280px;
        height: 90px;
    }
</style>
