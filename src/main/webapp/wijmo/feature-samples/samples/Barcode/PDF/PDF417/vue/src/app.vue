<template>
    <div class="container-fluid">
        <div>PDF417 barcode</div>
        <wj-barcode-pdf417 :value="theValue" :autoWidthZoom="2"></wj-barcode-pdf417>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.barcode.composite';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theValue: 'This is a PDF417 barcode'
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

    .wj-barcode-pdf417 {
        height: 90px;
    }
</style>
