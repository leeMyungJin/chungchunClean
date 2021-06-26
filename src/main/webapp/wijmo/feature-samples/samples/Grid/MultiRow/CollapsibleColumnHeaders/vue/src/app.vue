<template>
    <div class="container-fluid">
        <wj-multi-row
            id="chMultiRow"
            :itemsSource="orders"
            :layoutDefinition="threeLines"
            :collapsedHeaders="collapsedHeaders"
            :showHeaderCollapseButton="showHeaderCollapseButton"
            :initialized="initializeMultiRow" />
        <div>
            <label>
                Collapsed Headers 
                <wj-combo-box
                    :displayMemberPath="'name'"
                    :selectedValuePath="'value'"
                    :itemsSource="cbCollapsedHeadersSource"
                    :selectedValue="collapsedHeaders"
                    :selectedIndexChanged="selectedIndexChanged"/>
            </label> 
            <label>
                Show Header Collapse Button 
                <input type="checkbox" v-model="showHeaderCollapseButton">
            </label>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjMultirow from "@grapecity/wijmo.grid.multirow";
import "@grapecity/wijmo.vue2.grid.multirow";
import { getData } from "./data";
import * as wjInput from '@grapecity/wijmo.input';
import '@grapecity/wijmo.vue2.input';

let App = Vue.extend({
    name: "app",
    data: function() {
        let appData = getData();
        return {
            orders: appData.orders,
            threeLines: appData.ldThreeLines,
            collapsedHeaders: true,
            showHeaderCollapseButton: true,
            cbCollapsedHeadersSource: [
                { name: "true", value: true },
                { name: "false", value: false },
                { name: "null", value: null }
            ]
        };
    },
    methods: {
        selectedIndexChanged: function(sender) {
            this.collapsedHeaders = sender.selectedValue;
        },

        initializeMultiRow: function(sender) {
            sender.collapsedHeadersChanged.addHandler(() => {
                this.collapsedHeaders = sender.collapsedHeaders;
            });
        },
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#chMultiRow {
    height: 400px;
    width: 600px;
    margin: 6px 0;
}

.wj-combobox {
  width: 120px;
}
</style>