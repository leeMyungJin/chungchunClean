<template>
    <div class="container-fluid">
        <p>
            By default, the ComboBox displays one item per line in its drop-down list:
        </p>
        <div class="form-group">
            <label for="theCombo">Default:</label>
            <wj-combo-box displayMemberPath="country" :itemsSource="data"></wj-combo-box>
        </div>

        <p>
            If you have many short items, it may be interesting to use multiple columns in the drop-down. You can
            accomplish this with a little CSS and the <b>dropDownCssClass</b> property:
        </p>
        <div class="form-group">
            <label for="theComboCSS">Three Columns:</label>
            <wj-combo-box dropDownCssClass="cb-flex" displayMemberPath="country" :itemsSource="data">
            </wj-combo-box>
        </div>

        <p>
            If the items are complex objects, you may want to render a single item per line, but with additional detail,
            as in a table or grid. You can accomplish this with the <b>&lt;wj-item-template&gt;</b> component and <b>headerPath</b>
            property:
        </p>
        <div class="form-group">
            <label for="theComboTable">Table-Style:</label>
            <wj-combo-box headerPath="country" displayMemberPath="country" :itemsSource="data">
                <wj-item-template v-slot="ctx">
                    <!--
                        ctx.item - item in itemsSource of ListBox control
                        ctx.itemIndex - index of item in itemsSource of ListBox control
                        ctx.control - ListBox controll
                    -->
                    <table><tr>
                        <td>{{ ctx.item.country }}</td>
                        <td class="number" title="GDP (million US$/year)">{{ format('gdpm:c0', ctx.item) }}</td>
                        <td class="number" title="Population (thousands)">{{ format('popk:n0', ctx.item) }}</td>
                        <td class="number" title="GDP/cap (US$/person/year)">{{ format('gdpcap:c0', ctx.item) }}</td>
                    </tr></table>
                </wj-item-template>
            </wj-combo-box>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                data: getData(),
            }
        },
        methods: {
            format: function(format, data) {
                 return wijmo.format(`{${format}}`, data);
            },
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-dropdown-panel.cb-flex {
        display: flex;
        flex-wrap: wrap;
        width: 380px;
    }

    .wj-dropdown-panel.cb-flex .wj-listbox-item {
        width: 120px;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .wj-listbox-item table {
        table-layout: fixed;
    }

    .wj-listbox-item td {
        width: 120px;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .wj-listbox-item td.number {
        width: 80px;
        text-align: right;
    }

    label {
        margin-right: 3px;
    }

    body {
        margin-bottom: 24px;
    }
</style>
