<template>
    <div class="container-fluid">
        <div>Interleaved2of5 barcode</div>
        <wj-barcode-interleaved2of5 :value="theValue" :autoWidthZoom="2"></wj-barcode-interleaved2of5>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.barcode.specialized';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theValue: '1234567895'
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

    .wj-barcode-interleaved2of5 {
        height: 90px;
    }
</style>
