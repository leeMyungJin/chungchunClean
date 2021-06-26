<template>
  <div class="container-fluid">
    <p>
      This example shows how you can use a <b>flex</b> layout
      within the cells to center the content vertically:
    </p>
    <wj-flex-grid 
        :allowResizing="'Both'"
        :deferResizing="true"
        :initialized="initializeGrid"
        :items-source="data">
      <wj-flex-grid-column binding="id" header="ID" :width="50"></wj-flex-grid-column>
      <wj-flex-grid-column binding="country" header="Country"></wj-flex-grid-column>
      <wj-flex-grid-column binding="product" header="Product"></wj-flex-grid-column>
      <wj-flex-grid-column binding="sales" header="Sales" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="expenses" header="Expenses" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="active" header="Active"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from '@grapecity/wijmo.grid';
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
        data: getData()
    };
  },
  methods: {
    initializeGrid(grid) {
        grid.rows.defaultSize = 45;
        grid.columnHeaders.rows.defaultSize = 65;
    },
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin:10px 0;
  }

  /* use flex display to center-align cells vertically */
  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
  }
  .wj-flexgrid .wj-cell.wj-align-right {
    justify-content: flex-end;
  }
  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }

  body {
    margin-bottom: 20px;
  }
</style>

