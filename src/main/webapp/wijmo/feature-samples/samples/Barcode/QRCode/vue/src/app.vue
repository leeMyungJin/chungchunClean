<template>
    <div class="container-fluid">
        <div>QR code</div>
        <wj-barcode-qr-code :value="theValue"></wj-barcode-qr-code>
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
                theValue: 'https://en.wikipedia.org/wiki/QR_code'
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

    .wj-barcode-qrcode {
        width: 200px;
        height: 200px;
    }
</style>
