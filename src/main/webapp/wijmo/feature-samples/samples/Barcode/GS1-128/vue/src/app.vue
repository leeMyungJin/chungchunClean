<template>
    <div class="container-fluid">
        <div>GS1-128 barcode</div>
        <wj-barcode-gs1_128 :value="theValue" :autoWidthZoom="2"></wj-barcode-gs1_128>
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
                theValue: 'GS1128Demo'
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

    .wj-barcode-gs1_128 {
        height: 90px;
    }
</style>
