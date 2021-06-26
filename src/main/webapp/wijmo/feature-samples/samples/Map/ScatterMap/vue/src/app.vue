<template>
  <div class="container-fluid">
    <wj-flex-map
      header="Airport Map"
      tooltipContent="&#9992; <b>{iata_code}</b><br>{name}"
      :initialized="initializeMap"
    >
      <wj-geo-map-layer
        url="data/land.json"
        :style="{ fill: 'rgba(200,200,200,1)' }"
      ></wj-geo-map-layer>
      <wj-scatter-map-layer
        url="data/airports.json"
        :style="{ fill: 'rgba(10,10,10,1)' }"
        binding="coordinates"
        :itemsSourceChanged="zoomTo"
      ></wj-scatter-map-layer>
      <wj-geo-grid-layer></wj-geo-grid-layer>
    </wj-flex-map>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.chart.map";

let App = Vue.extend({
  name: "app",
  methods: {
    initializeMap(map) {
      this.map = map;
    },
    zoomTo() {
      this.map.zoomTo(this.map.layers[1].getGeoBBox());
    },
  },
});

new Vue({ render: (h) => h(App) }).$mount("#app");
</script>

<style>
body {
  margin-bottom: 24px;
}

.wj-flexmap {
  max-width: 600px;
}
</style>
