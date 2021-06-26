<template>
    <div class="container-fluid">
        <div>GS1 DataBar Expanded barcode</div>
        <wj-barcode-gs1-data-bar-expanded :value="theValue" :autoWidthZoom="2">
        </wj-barcode-gs1-data-bar-expanded>
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
                theValue: '(01)00012345678905(10)ABC123'
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

    .wj-barcode-gs1databar-expanded {
        height: 80px;
    }
</style>
