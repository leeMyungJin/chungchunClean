<template>
  <div class="container-fluid">
    <wj-flex-map
      header="Average Temperature By State"
      :tooltipContent="tooltipContent"
      :initialized="initialized"
    >
      <wj-geo-map-layer url="data/US.json" :itemsSourceChanged="zoomTo">
        <wj-color-scale
          :colors="colors"
          :binding="binding"
          :scale="scale"
          format='n0"°F"'
        ></wj-color-scale>
      </wj-geo-map-layer>
      <wj-flex-chart-legend position="Left"></wj-flex-chart-legend>
    </wj-flex-map>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.chart";
import "@grapecity/wijmo.vue2.chart.map";
import { Palettes } from "@grapecity/wijmo.chart";
import { httpRequest } from "@grapecity/wijmo";

let App = Vue.extend({
  name: "app",
  data: function () {
    return {
      colors: Palettes.Diverging.RdYlBu,
      map: null,
    };
  },
  created() {
    this.dataMap = new Map();
    httpRequest("data/temp.json", {
      success: (xhr) => {
        JSON.parse(xhr.responseText).forEach((el) =>
          this.dataMap.set(el.State, parseFloat(el.AverageTemperature))
        );
      },
    });
  },
  methods: {
    initialized(map) {
      this.map = map;
    },
    zoomTo() {
      this.map.zoomTo(this.map.layers[0].getGeoBBox());
    },
    tooltipContent(f) {
      return f.name + " " + this.dataMap.get(f.name) + "°F";
    },
    binding(o) {
      return this.dataMap.get(o.properties.name);
    },
    scale(v) {
      return 1 - v;
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
