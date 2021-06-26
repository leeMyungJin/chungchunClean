<template>
    <div class="container-fluid">
        <div>UPC-E1 barcode</div>
        <wj-barcode-upc-e1 :value="theValue"></wj-barcode-upc-e1>
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
                theValue: '012345'
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

    .wj-barcode-upce1 {
        width: 140px;
        height: 90px;
    }
</style>
