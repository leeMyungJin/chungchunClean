<template>
    <div class="container-fluid">
        <div>GS1 DataBar Limited barcode</div>
        <wj-barcode-gs1-data-bar-limited :value="theValue"></wj-barcode-gs1-data-bar-limited>
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
                theValue: '(01)20012345678909'
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

    .wj-barcode-gs1databar-limited {
        width: 170px;
        height: 90px;
    }
</style>
