<template>
    <div class="container-fluid">
        <label>
            Include Headers
            <input type="checkbox" v-model="includeHeaders" />
        </label>
        <wj-flex-grid
            ref="flexGrid"
            :itemsSource="data"
            :copying="copying"
            :pasting="pasting">
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.grid';
    import { Clipboard } from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                data: getData(),
                includeHeaders: true,
                hasHeaders: false
            };
        },
        methods: {

            // copying with or without headers
            copying: function(s, e) {
                this.hasHeaders = this.includeHeaders;
                if (this.hasHeaders) {

                    // copy text with headers and copyright notice to clipboard
                    let text = s.getClipString(null, false, true, false);
                    text = text + '\r\n(c) 2019 Grapecity Inc';

                    // put text with headers on the clipboard
                    Clipboard.copy(text);

                    // prevent the grid from overwriting our clipboard content
                    e.cancel = true;
                }
            },

            // prevent pasting content with headers...            
            pasting: function(s, e) {
                if (this.hasHeaders) {
                    args.cancel = true;
                }
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 350px;
    }
</style>