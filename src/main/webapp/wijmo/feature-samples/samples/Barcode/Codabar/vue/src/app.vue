<template>
    <div class="container-fluid">
        <div>Codabar barcode</div>
        <wj-barcode-codabar :value="theValue" :autoWidthZoom="2"></wj-barcode-codabar>
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
                theValue: 'A15126893B'
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

    .wj-barcode-codabar {
        height: 90px;
    }
</style>
