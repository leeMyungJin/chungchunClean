<template>
    <div class="container-fluid">
        <div>DataMatrix barcode</div>
        <wj-barcode-data-matrix-ecc200 :value="theValue"></wj-barcode-data-matrix-ecc200>
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
                theValue: 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+'
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

    .wj-barcode-datamatrix {
        width: 170px;
        height: 170px;
    }
</style>
