<template>
    <div class="container-fluid">
        <label>
            Layout option:
            <wj-combo-box
                :itemsSource="layoutDefs"
                :displayMemberPath="'name'"
                v-model="currentLayout" />
        </label>
        <p>{{ currentLayout.description }}</p>
        <wj-multi-row
            :itemsSource="orders"
            :layoutDefinition="currentLayout.def" />
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid.multirow";
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            orders: null,
            layoutDefs: null,
            currentLayout: null
        };
    },
    created: function() {
        let appData = getData();
        this.orders = appData.orders;
        this.layoutDefs = appData.layoutDefs;
        this.currentLayout = appData.layoutDefs.currentItem;
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-multirow {
    height: 400px;
    margin: 6px 0;
}
</style>