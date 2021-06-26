<template>
    <div class="container-fluid">
        <h2>
            Default Grid
        </h2>
        <p>
            Copy and paste cell ranges like in Excel.
        </p>
        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="data">
        </wj-flex-grid>
        <h2>
            Read-Only Grid
        </h2>
        <p>
            Copy data and column header information (pasting not allowed).
        </p>
        <wj-flex-grid
            copyHeaders="Column"
            :isReadOnly="true"
            :alternatingRowStep="0"
            :itemsSource="data"
        ></wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";
    //import "@grapecity/wijmo.vue2.core";
    import "@grapecity/wijmo.vue2.grid";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
    data: function() {
        return {
            data: getData()
        };
    },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }
</style>
