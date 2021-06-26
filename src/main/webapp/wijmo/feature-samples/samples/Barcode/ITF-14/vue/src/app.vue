<template>
    <div class="container-fluid">
        <div>ITF-14 barcode</div>
        <wj-barcode-itf14 :value="theValue"></wj-barcode-itf14>
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
                theValue: '98765432109213'
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

    .wj-barcode-itf14 {
        width: 340px;
        height: 90px;
    }
</style>
