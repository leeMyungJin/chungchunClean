<template>
  <div class="container-fluid">
    <wj-flex-grid
        showSelectedHeaders="All"
        :alternatingRowStep="0"
        :anchorCursor="true"
        :showMarquee="true"
        :itemsSource="data"
        :formatItem="formatItem"
    />
  </div>
</template>

<script>
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { toggleClass } from "@grapecity/wijmo";
import { getData } from "./data";

new Vue({
    el: "#app",
    data: function() {
        return {
            data: getData()
        };
    },
    methods: {
        formatItem(s, e) {
            if (e.panel == s.cells) {
                let spill = e.col < s.columns.length - 1 &&
                    e.cell.innerHTML && !s.getCellData(e.row, e.col + 1);
                toggleClass(e.cell, 'spill', spill);
            }
        }
    }
});
</script>

<style>
    @import "./node_modules/@grapecity/wijmo.styles/wijmo.css";
    .wj-flexgrid {
        max-height: 300px;
    }

    .wj-cell.spill {
        overflow: visible;
        z-index: 1; /* render over empty cells */
    }

    .wj-flexgrid .wj-marquee,
    .wj-flexgrid .wj-colheaders,
    .wj-flexgrid .wj-rowheaders,
    .wj-flexgrid .wj-topleft {
        z-index: 2; /* render over spill cells */
    }

    .wj-flexgrid .wj-cell.wj-state-selected,
    .wj-flexgrid .wj-cell.wj-state-multi-selected {
        background: rgba(0, 0, 0, 0.1);
        color: #000;
    }
</style>

