<template>
    <div class="container-fluid">
        <div>UPC-A barcode</div>
        <wj-barcode-upc-a :value="theValue"></wj-barcode-upc-a>
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
                theValue: '01234567890'
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

    .wj-barcode-upca {
        width: 230px;
        height: 90px;
    }
</style>
