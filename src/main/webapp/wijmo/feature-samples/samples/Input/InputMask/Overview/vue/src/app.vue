<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theSSN">Social Security Number</label>
            <wj-input-mask id="theSSN" mask="000-00-0000" :overwriteMode="overwrite"/>
        </div>

        <div class="form-group">
            <label for="theZip">Zip Code</label>
            <wj-input-mask id="theZip" mask="00000" :overwriteMode="overwrite"/>
        </div>

        <div class=" form-group">
            <label for="theZip4">Zip+4 Code</label>
            <wj-input-mask id="theZip4" mask="00000-0000" :overwriteMode="overwrite"/>
        </div>

        <div class="form-group">
            <label for="thePhone">Phone Number</label>
            <wj-input-mask id="thePhone" mask="(999) 000-0000" :overwriteMode="overwrite"/>
        </div>

        <p>
            By default, typing into the <b>InputMask</b> inserts text at the cursor position.
            In some cases, you may want to overwrite the text instead.<br/>
            Click the checkbox below to see the difference:
        </p>

        <label>
            Enable Overwrite
            <input type="checkbox" v-model="overwrite">
        </label>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import { closest } from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                overwrite: false
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    label {
        width: 180px;
        text-align: right;
        margin-right: 3px;
    }

    body {
        margin-bottom: 48px;
    }
</style>
