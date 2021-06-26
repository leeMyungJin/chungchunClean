<template>
  <div class="container-fluid">
    <div class="row">
      <label>Please select a Palette:</label>
      <wj-combo-box
        displayMemberPath="name" :showGroups="true" :itemsSource="paletteData"
        :selectedIndexChanged="selectedIndexChanged" :formatItem="formatItem"
      ></wj-combo-box>
    </div>
    <div class="row">
        <div class="col">
      <wj-flex-chart
        header="Country GDP" footer="2016, in USD billions" :itemsSource="data" bindingX="country" 
        tooltipContent="<b>{country}</b><br>{value}" :palette="palette" :itemFormatter="chartItemFormatter" >
        <wj-flex-chart-series binding="2016"></wj-flex-chart-series>
      </wj-flex-chart>
        </div>
        <div class="col">
      <wj-flex-pie
        header="Country GDP" footer="2016, in USD billions" :itemsSource="data" bindingName="country"
        binding="2016":palette="palette" :itemFormatter="pieItemFormatter">
      </wj-flex-pie>
    </div>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.chart";
import { getData, getPalettes } from "./data";
import { Color } from "@grapecity/wijmo";
import { Palettes } from "@grapecity/wijmo.chart";

let App = Vue.extend({
  name: "app",
  data: function () {
    return {
      data: getData(),
      palette: null,
      paletteData: getPalettes(),
    };
  },
  methods: {
    selectedIndexChanged: function (s) {
      this.palette = s.selectedItem.colors;
    },
    formatItem: function (s, e) {
      let item = e.data;
      if (item.name && item.colors) {
        // create palette swatch
        let html = '<div style="width:100px;display:inline-block">' + item.name + "</div>";
        item.colors.forEach( (clr) =>
            (html += `<div style="width:1em;height:1em;display:inline-block;background-color:${clr};"></div>`));
        e.item.innerHTML = html;
      }
    },
    chartItemFormatter: function(engine,ht,defRender) {
        const pal = ht.chart.palette ? ht.chart.palette : Palettes.standard;
        engine.fill = pal[ht.pointIndex]; // each bar has own color
        engine.stroke = null;
        defRender();
    },
    pieItemFormatter: function(engine,ht,defRender) {
        let clr = new Color(engine.fill);
        clr.a = 1; // use opaque color
        engine.fill = clr.toString();
        engine.stroke = null;
        defRender();
    }
  },
});

new Vue({ render: (h) => h(App) }).$mount("#app");
</script>

<style>
body {
  margin-bottom: 24px;
}

label {
  margin-right: 3px;
  margin-left: 12px;
}

.row {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.col {
  float: left;
  width: 50%;
}

.col > .wj-flexchart {
  margin: 12px;
  height: 360px;
}
</style>
