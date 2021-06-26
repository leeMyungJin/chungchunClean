<template>
    <div class="container-fluid">
        <div>Code39 barcode</div>
        <wj-barcode-code39 :value="theValue" :autoWidthZoom="2"></wj-barcode-code39>
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
                theValue: 'A1312BCV'
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

    .wj-barcode-code39 {
        height: 90px;
    }
</style>
