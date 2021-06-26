<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
            :showMarquee="true"
            selectionMode="MultiRange"
            :itemsSource="data">
            <wj-flex-grid-column binding="id" header="ID" :width="80" :isReadOnly="true" />
            <wj-flex-grid-column binding="date" header="Date" format="d"
                :editor="editors.inputDate" />
            <wj-flex-grid-column binding="time" header="Time" format="t"
                :editor="editors.inputTime" />
            <wj-flex-grid-column binding="country" header="Country"
                :editor="editors.countryCombo" />
            <wj-flex-grid-column binding="productId" header="Product"
                :dataMap="productMap" 
                :editor="editors.productAutoComplete" />
            <wj-flex-grid-column binding="color" header="Color" 
                cellTemplate="<span class=\'colorbox\' style=\'background:\${text}\'></span> \${text}"
                :editor="editors.inputColor" />
            <wj-flex-grid-column binding="amount" header="Amount" format="n2" 
                :editor="editors.inputNumber" />
            <wj-flex-grid-column binding="premium" header="Premium" cssClass="switch" />
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcCore from "@grapecity/wijmo";
import { InputDate, InputTime, ComboBox, AutoComplete, InputColor, InputNumber } from "@grapecity/wijmo.input";
import { DataMap } from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";
import { getData, getCountries, getProducts } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {

            // data
            data: getData(),
            countries: getCountries(),
            products: getProducts(),
            productMap: new DataMap(getProducts(), 'id', 'name'),

            // editors
            editors: {
                inputDate: new InputDate(document.createElement('div')),
                inputTime: new InputTime(document.createElement('div'), {
                    isEditable: true,
                    format: 't',
                    step: 30
                }),
                countryCombo: new ComboBox(document.createElement('div'), {
                    itemsSource: getCountries()
                }),
                productAutoComplete: new AutoComplete(document.createElement('div'), {
                    itemsSource: getProducts(),
                    selectedValuePath: 'id',
                    displayMemberPath: 'name'
                }),
                inputColor: new InputColor(document.createElement('div')),
                inputNumber: new InputNumber(document.createElement('div'), {
                    format: 'n2',
                    step: 10,
                    min: 0,
                    max: 10000
                })
            }
        };
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .wj-flexgrid {
        height: 300px;
        margin-bottom: 12px;
    }

    .wj-flexgrid .wj-cell {
        padding: 6px 8px;
    }

    .colorbox {
        display: inline-block;
        width: 12px;
        height: 1.5em;
        margin: 0 3px 0 -3px;
        border: 1px solid black;
        vertical-align: bottom;
    }

    /* switch-style checkbox */
    .wj-cell.switch input[type=checkbox] {
        opacity: 0;
        width: 100%;
    }

    .wj-cell.switch label {
        width: 3em;
        position: relative;
    }

    .wj-cell.switch input[type=checkbox]+span {
        pointer-events: none;
        background: rgba(0, 0, 0, 0.4);
    }

    .wj-cell.switch input[type=checkbox]:checked+span {
        background: #0085c7; /* rgb(27, 255, 27) */
    }

    .wj-cell.switch:hover input[type=checkbox]+span:after {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
        transition: all 0.3s;
    }

    .wj-cell.switch input[type=checkbox]+span:before {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        top: .45em;
        width: 2.5em;
        height: .75em;
        border-radius: 1em;
        background: rgba(0, 0, 0, .4);
        opacity: .25;
    }

    .wj-cell.switch input[type=checkbox]:checked+span:before {
        background: inherit;
    }

    .wj-cell.switch input[type=checkbox]+span:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0.13em;
        width: 1.3em;
        height: 1.3em;
        background: white;
        border-radius: 1em;
        border: 1px solid rgba(0, 0, 0, .2);
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    .wj-cell.switch input[type=checkbox]:checked+span:after {
        left: 1.25em;
        transition: all 0.3s;
        background: inherit;
    }</style>