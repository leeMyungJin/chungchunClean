<template>
    <div class="container-fluid">
        <p>
            For example, the ComboBox below is used as a master control.
            Select a country from the combo and the grid below will show the items in that country:
        </p>

        <label>Select a country:
            <wj-combo-box
                :initialized="initCountriesCombo"
                :itemsSource="countries"
                :selectedIndexChanged="onCountriesSelectedIndexChanged" />
        </label>
        <wj-flex-grid
            :itemsSource="detailView" />

        <p>
            In the next example, The FlexGrid is used as the master
            control. Select an item on the grid and see the details
            in the controls below:
        </p>

        <h3>Master</h3>
        <wj-flex-grid
            :isReadOnly="true"
            :selectionMode="'Row'"
            :itemsSource="gridData"
            :initialized="initGridMaster"
            :selectionChanged="onSelectionChanged" />
        <h3>Detail</h3>
        <table class="tbl-spaced">
            <tr>
                <td>Country:</td>
                <td>
                    <wj-combo-box
                        id="theCountry"
                        class="bnd-ctl"
                        :itemsSource="countries"
                        :textChanged="this.setProperty.bind(this,'country')" />
                </td>
            </tr>
            <tr>
                <td>Product:</td>
                <td>
                    <wj-combo-box
                        id="theProduct"
                        class="bnd-ctl"
                        :itemsSource="products"
                        :textChanged="this.setProperty.bind(this,'product')" />
                </td>
            </tr>
            <tr>
                <td>Date:</td>
                <td>
                    <wj-input-date
                        id="theDate"
                        class="bnd-ctl"
                        :valueChanged="this.setProperty.bind(this,'date')" />
                </td>
            </tr>
            <tr>
                <td>Sales:</td>
                <td>
                    <wj-input-number
                        id="theSales"
                        class="bnd-ctl"
                        :format="'n2'"
                        :step="10"
                        :valueChanged="this.setProperty.bind(this,'sales')" />
                </td>
            </tr>
            <tr>
                <td>Expenses:</td>
                <td>
                    <wj-input-number
                        id="theExpenses"
                        class="bnd-ctl"
                        :format="'n2'"
                        :step="10"
                        :valueChanged="this.setProperty.bind(this,'expenses')" />
                <td>
            </tr>
        </table>

        <p></p>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { CollectionView, Control, DateTime, isString } from "@grapecity/wijmo";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            countries: "US,Germany,UK,Japan,Italy,Greece".split(","),
            products: "Phones,Cars,Stereos,Watches,Computers".split(","),
            gridData: null,
            detailView: null
        };
    },
    methods: {
        onCountriesSelectedIndexChanged: function() {
            if (this.detailView) {
                this.detailView.refresh();
            }
        },

        onSelectionChanged: function() {
            if (this.theGridMaster && this.theGridMaster.collectionView) {
                var item = this.theGridMaster.collectionView.currentItem;
                var bndCtls = document.querySelectorAll(".bnd-ctl");
                for (var i = 0; i < bndCtls.length; i++) {
                    var host = bndCtls[i];
                    var prop = host.id.substr(3).toLowerCase();
                    var ctl = Control.getControl(host);
                    if (isString(item[prop])) {
                        ctl["text"] = item[prop];
                    } else {
                        ctl["value"] = item[prop];
                    }
                }
            }
        },

        setProperty: function(prop, sender) {
            var v = this.theGridMaster.collectionView;
            if (v) {
                var val = prop === "country" || prop === "product"
                    ? sender.text
                    : sender.value;
                v.editItem(v.currentItem);
                v.currentItem[prop] = val;
                v.commitEdit();
            }
        },

        getData: function() {
            var data = [],
                countries = this.countries,
                products = this.products;
            for (var i = 0; i < 50; i++) {
                data.push({
                    id: i,
                    country: countries[Math.floor(Math.random() * countries.length)],
                    product: products[Math.floor(Math.random() * products.length)],
                    date: DateTime.addDays(new Date(), i),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        },

        initGridMaster: function(theGridMaster) {
            this.theGridMaster = theGridMaster;
        },

        initCountriesCombo: function(countriesCombo) {
            this.countriesCombo = countriesCombo;
        }
    },
    mounted: function() {

        // initalize top grid/detail
        this.gridData = this.getData();
        var self = this;
        this.detailView = new CollectionView(this.gridData, {
            filter: function(item) {
                return item.country === self.countriesCombo.text;
            }
        });

        // initialize bottom detail
        setTimeout(() => {
            this.onSelectionChanged();
        });
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 220px;
    margin: 6px 0px;
}
.tbl-spaced td {
    vertical-align: middle;
    margin: 3px;
}
body {
    margin-bottom: 24pt;
}
</style>