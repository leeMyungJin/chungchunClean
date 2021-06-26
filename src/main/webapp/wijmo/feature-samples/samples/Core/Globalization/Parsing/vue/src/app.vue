<template>
    <div class="container-fluid">
        <p>
            <wj-menu
                :value="selectedValue"
                :header="'Culture'"
                :itemClicked="cultureChanged">
                <wj-menu-item :value="'en'">English (US)</wj-menu-item>
                <wj-menu-item :value="'en-GB'">English (UK)</wj-menu-item>
                <wj-menu-item :value="'es'">Spanish</wj-menu-item>
                <wj-menu-item :value="'de'">German</wj-menu-item>
                <wj-menu-item :value="'it'">Italian</wj-menu-item>
                <wj-menu-item :value="'fr'">French</wj-menu-item>
                <wj-menu-item :value="'pt'">Portuguese</wj-menu-item>
                <wj-menu-item :value="'ru'">Russian</wj-menu-item>
                <wj-menu-item :value="'ja'">Japanese</wj-menu-item>
                <wj-menu-item :value="'ko'">Korean</wj-menu-item>
                <wj-menu-item :value="'zh'">Chinese</wj-menu-item>
            </wj-menu>
        </p>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">Dates</h4>
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label for="dateFormat">Input format:</label>
                    <input id="dateFormat" value="d">
                </div>

                <div class="form-group">
                    <label for="dateInput">Input string:</label>
                    <input id="dateInput" value="12/31/2016">
                </div>

                <button
                    class="btn btn-default"
                    @click="parseDate(dateInput.value, dateFormat.value)">
                    Parse Date
                </button>

                <span>{{ dateResult }}</span>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">Numbers</h4>
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label for="numberFormat">Input format:</label>
                    <input id="numberFormat" value="n2">
                </div>

                <div class="form-group">
                    <label for="numberInput">Input string:</label>
                    <input id="numberInput" value="123.456">
                </div>

                <button
                    class="btn btn-default"
                    @click="parseNumber(numberInput.value, numberFormat.value)">
                    Parse Number
                </button>

                <span>{{ numberResult }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.input';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                dateResult: '',
                numberResult: '',
                selectedValue: 'en'
            };
        },
        methods: {
            parseDate(value, format) {
                let result = wijmo.Globalize.parseDate(value, format);
                //
                this.dateResult = wijmo.isDate(result)
                    ? 'Parsed OK: ' + wijmo.Globalize.format(result, format)
                    : '** Could not parse date... **';
            },

            parseNumber(value, format) {
                let result = wijmo.Globalize.parseFloat(value, format);
                //
                this.numberResult = wijmo.isNumber(result)
                    ? 'Parsed OK: ' + wijmo.Globalize.format(result, format)
                    : '** Could not parse number... **';
            },

            loadCulture(culture) {

                // apply new culture to page
                let url = `node_modules/@grapecity/wijmo.cultures/wijmo.culture.${culture}.js`,
                scripts = document.getElementsByTagName('script');
                //
                for (let i = 0; i < scripts.length; i++) {
                    let script = scripts[i];
                    if (script.src.indexOf('/cultures/wijmo.culture.') > -1) {
                        script.parentElement.removeChild(script);
                        break;
                    }
                }
                //
                let script = document.createElement('script');
                //
                script.src = url;
                //
                document.head.appendChild(script);
            },

            cultureChanged(sender) {
                if (sender.selectedValue) {
                    this.selectedValue = sender.selectedValue;
                    this.loadCulture(sender.selectedValue);
                }
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>
