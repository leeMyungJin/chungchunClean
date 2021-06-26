<template>
    <div class="container-fluid">
        <div>Code93 barcode</div>
        <wj-barcode-code93 :value="theValue" :autoWidthZoom="2"></wj-barcode-code93>
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
                theValue: 'CODE93'
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

    .wj-barcode-code93 {
        height: 90px;
    }
</style>
