<template>
    <div class="container-fluid">
        <div>MicroPDF417 barcode</div>
        <wj-barcode-micro-pdf417 :value="theValue"></wj-barcode-micro-pdf417>
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
                theValue: 'This is a MicroPDF417 barcode'
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

    .wj-barcode-micropdf417 {
        width: 180px;
        height: 90px;
    }
</style>
