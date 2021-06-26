<template>
    <div class="container-fluid">
        <div>Code49 barcode</div>
        <wj-barcode-code49 :value="theValue"></wj-barcode-code49>
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
                theValue: 'Code49_123'
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

    .wj-barcode-code49 {
        width: 170px;
        height: 80px;
    }
</style>
