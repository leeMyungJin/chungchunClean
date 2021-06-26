<template>
    <div class="container-fluid">
        <div>Japanese Postal barcode</div>
        <wj-barcode-japanese-postal :value="theValue"></wj-barcode-japanese-postal>
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
                theValue: '6540123789-A-K-Z'
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

    .wj-barcode-japanese-postal {
        width: 280px;
    }
</style>
