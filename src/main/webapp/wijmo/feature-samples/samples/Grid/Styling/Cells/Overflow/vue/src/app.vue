<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
            :showMarquee="true"
            :showSelectedHeaders="'All'"
            :items-source="data" />
    </div>
</template>

<script>
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
    @import "./node_modules/@grapecity/wijmo.styles/wijmo.css";
    
    .wj-flexgrid {
        max-height: 250px;
        margin-bottom: 12px;
    }

    .wj-cells .wj-cell:hover {
        overflow: visible;
        z-index: 6;
        color: black;
        text-shadow:
            /* many shadows blur out the area around the text */
            0 0 1px white,
            0 0 2px white,
            0 0 3px white,
            0 0 4px white,
            0 0 5px white,
            0 0 6px white,
            0 0 7px white,
            0 0 8px white,
            0 0 9px white,
            0 0 10px white
    }

    /* prevent overflowing over the headers */
    .wj-rowheaders,
    .wj-colheaders,
    .wj-topleft {
        z-index: 7;
    }
</style>

