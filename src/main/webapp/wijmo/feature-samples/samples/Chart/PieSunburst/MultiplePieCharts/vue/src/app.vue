<template>
  <div class="container-fluid">
    <label for="chartsPerLine">Charts Per Line: </label>
    <wj-input-number id="chartsPerLine"
      v-model="chartsPerLine"
      :min="0"
      :max="4"
      :step="1"
      format="n0"
    >
    </wj-input-number>

    <wj-flex-pie
      header="Market Share By Quarter 2017"
      bindingName="brand"
      binding="2017Q1,2017Q2,2017Q3,2017Q4"
      :itemsSource="data"
      :chartsPerLine="chartsPerLine"
      :titles="['Q1', 'Q2', 'Q3', 'Q4']"
      :palette="[
        'rgba(136, 189, 230, 1)',
        'rgba(251, 178, 88,1)',
        'rgba(144, 205, 151, 1)',
        'rgba(246, 170, 201, 1)',
        'rgba(191, 165, 84, 1)',
        'rgba(188, 153, 199, 1)',
      ]"
    >
      <wj-flex-pie-data-label
        :position="chartsPerLine == 1 ? 'None' : 'Inside'"
        content="{value}%"
      ></wj-flex-pie-data-label>
      <wj-flex-chart-legend position="Bottom"> </wj-flex-chart-legend>
    </wj-flex-pie>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.chart";
import { getData } from "./data";
//
new Vue({
  el: "#app",
  data: {
    data: getData(),
    chartsPerLine: 0
  },
});
</script>

<style>
body {
  margin-bottom: 24px;
}

.container-fluid .wj-flexchart .wj-data-labels .wj-data-label {
  font-size: 10pt;
  fill: white;
}

.container-fluid .wj-flexchart .wj-legend .wj-label {
  font-size: 12pt;
}

.container-fluid .wj-flexchart .wj-label {
  font-size: 14pt;
}
</style>
