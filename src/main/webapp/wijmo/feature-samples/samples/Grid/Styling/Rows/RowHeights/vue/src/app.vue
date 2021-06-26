<template>
    <div class="container-fluid">
        <h3>
            Default Cell Padding: 3px
        </h3>
        <wj-flex-grid :items-source="data" />

        <h3>
            Custom Cell Padding: 8px
        </h3>
        <wj-flex-grid id="theGridTallRows" :items-source="data" />
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import { getData } from "./data";

    new Vue({
        el: "#app",
        data: function() {
            return {
                data: getData()
            };
        }
    });
</script>

<style>
    .wj-flexgrid {
        max-height: 250px;
        margin: 10px 0;
    }
    #theGridTallRows.wj-flexgrid .wj-cell {
        padding: 8px;
    }
</style>

