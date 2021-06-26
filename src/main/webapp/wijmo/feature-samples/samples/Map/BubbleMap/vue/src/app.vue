<template>
  <div class="container-fluid">
    <wj-flex-map
      header="Europe - GDP per capita"
      :tooltipContent="tooltipContent"
    >
      <wj-geo-map-layer
        url="data/europe.json"
        :style="{ fill: 'rgba(153,216,201,1)', stroke: 'white' }"
        :itemsSourceChanged="itemsSourceChanged"
      >
      </wj-geo-map-layer>
      <wj-scatter-map-layer
        binding="x,y,gdp"
        :symbolMaxSize="20"
        :symbolMinSize="5"
        :style="{ fill: 'rgba(44,162,95,1)' }"
      ></wj-scatter-map-layer>
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
import { Point, Rect } from "@grapecity/wijmo";
import { getGdpData } from "./data";

let App = Vue.extend({
  name: "app",
  methods: {
    zoomTo() {
      this.map.zoomTo(this.map.layers[0].getGeoBBox());
    },
    tooltipContent(ht) {
      return ht.gdp ? "<b>{name}</b> ${gdp}<br>rank {rank}" : "";
    },
    itemsSourceChanged(layer) {
      const bb = new Rect(-29, 36, 90, 35);
      layer.map.zoomTo(bb);
      let features = layer.getAllFeatures();
      let pts = [];

      let gdpData = getGdpData();
      let dataMap = new Map();
      gdpData.forEach((el) => dataMap.set(el.Country, el));

      features.forEach((f) => {
        let rect = layer.map.layers[0].getGeoBBox(f);
        let name = f.properties.name;
        let pt = new Point(
          rect.left + 0.5 * rect.width,
          rect.top + 0.5 * rect.height
        );
        if (name == "Norway") {
          pt = new Point(10.752222, 59.913889);
        } else if (name == "Russia") {
          pt = new Point(37.617222, 55.755833);
        }
        let el = dataMap.get(name);
        if (el) {
          pts.push({
            x: pt.x,
            y: pt.y,
            name: name,
            gdp: parseFloat(el[2020]),
            rank: parseInt(el["Rank"]),
          });
        }
      });
      layer.map.layers[1].itemsSource = pts;
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
