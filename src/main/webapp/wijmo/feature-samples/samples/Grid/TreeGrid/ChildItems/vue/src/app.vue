<template>
  <div class="container-fluid">
    <label>
        Show as Tree:
        <input type="checkbox" v-model="showAsTree" />
    </label>
    <wj-flex-grid
        :items-source="family"
        headers-visibility="None"
        :child-items-path="showAsTree ? 'children' : ''">
        <wj-flex-grid-column binding="name" header="Name" width="*"/>
    </wj-flex-grid>
    <p>
      There are also 'heterogeneous' hierarchies, where items at different levels have
      different types and different child item properties.</p>
    <p>
      For example, the grid below is bound to a collection of 'worker' objects which
      receive 'checks' which list 'earnings':</p>
    <wj-flex-grid
        :items-source="workers"
        headers-visibility="Column"
        :child-items-path="['checks','earnings']">
        <wj-flex-grid-column binding="name" header="Name" />
        <wj-flex-grid-column binding="hours" data-type="Number" :allow-sorting="false" />
        <wj-flex-grid-column binding="rate" data-type="Number" :allow-sorting="false" />
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { getFamilies,  getWorkers} from "./data";

new Vue({
    el: "#app",
    data: function() {
        return {
            showAsTree: true,
            family: getFamilies(),
            workers: getWorkers()
        }
    }
});
</script>

<style>
.wj-flexgrid {
  max-height: 220px; 
  margin: 6px 0;
}
.wj-cell.wj-group {
  border: none;
}
.wj-cell.wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: white;
}
body {
   margin-bottom: 24px;
}
</style>