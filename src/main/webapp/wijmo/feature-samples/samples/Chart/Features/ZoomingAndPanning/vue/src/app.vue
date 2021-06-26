<template>
  <div class="container-fluid">
    <div class="form-group">
      <wj-flex-chart
        :itemsSource="data"
        bindingX="date"
        chartType="Candlestick"
        :initialized="initializeChart"
      >
        <wj-flex-chart-series binding="high,low,open,close" name="Alphabet Inc" :symbolSize="4"></wj-flex-chart-series>
        <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
        <wj-flex-chart-axis wj-property="axisX" :axis-line="false" :rangeChanged="rangeChanged"></wj-flex-chart-axis>
        <wj-flex-chart-axis wj-property="axisY" :rangeChanged="rangeChanged"></wj-flex-chart-axis>
        <wj-flex-chart-gestures
          :initialized="initializeGestures"
          :mouseAction="mouseAction"
          :interactiveAxes="interactiveAxes"
        ></wj-flex-chart-gestures>
      </wj-flex-chart>
      <wj-menu :value="mouseAction" :header="'Mouse Action'" :itemClicked="mouseActionChanged">
        <wj-menu-item value="Zoom">Zoom</wj-menu-item>
        <wj-menu-item value="Pan">Pan</wj-menu-item>
      </wj-menu>
      <wj-menu
        :value="interactiveAxes"
        :header="'Interactive Axes'"
        :itemClicked="interactiveAxesChanged"
      >
        <wj-menu-item value="X">X</wj-menu-item>
        <wj-menu-item value="Y">Y</wj-menu-item>
        <wj-menu-item value="XY">XY</wj-menu-item>
      </wj-menu>
      <button
        id="btnReset"
        class="btn btn-default"
        v-on:click="reset"
        :disabled="!canReset"
      >Reset Zoom</button>
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
import "@grapecity/wijmo.vue2.chart.interaction";
import { getData } from "./data";
import * as wjCore from "@grapecity/wijmo";

let App = Vue.extend({
  name: "app",
  data: function() {
    return {
      data: getData(),
      mouseAction: "Zoom",
      interactiveAxes: "XY",
      canReset: false
    };
  },
  methods: {
    initializeChart: function(flex) {
      this.theChart = flex;
    },
    initializeGestures: function(gestures) {
      this.chartGestures = gestures;
      setTimeout(() => {
        this.chartGestures.posX = 0.5;
        this.chartGestures.posY = 0.5;
        this.chartGestures.scaleX = 0.5;
        this.chartGestures.scaleY = 0.5;
        setTimeout(() => (this.canReset = false), 100);
      }, 100);
    },
    mouseActionChanged: function(menu) {
      if (!menu.selectedValue) {
        return;
      }
      this.mouseAction = menu.selectedValue;
    },
    interactiveAxesChanged: function(menu) {
      if (!menu.selectedValue) {
        return;
      }
      this.interactiveAxes = menu.selectedValue;
    },
    rangeChanged: function() {
      this.canReset = true;
    },
    reset: function() {
      if (this.chartGestures) {
        this.chartGestures.reset();
      }
      setTimeout(() => (this.canReset = false), 100);
    }
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-flexchart {
  height: 300px;
}

body {
  margin-bottom: 24px;
}
</style>
