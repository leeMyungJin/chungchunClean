<template>
    <div class="container-fluid">
        <div>EAN-8 barcode</div>
        <wj-barcode-ean8 :value="theValue"></wj-barcode-ean8>
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
                theValue: '9031101'
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

    .wj-barcode-ean8 {
        width: 170px;
        height: 90px;
    }
</style>
