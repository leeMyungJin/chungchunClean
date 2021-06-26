<template>
  <div class="container-fluid">
    <div class="row">
      <label for="safetyMargin">Safety Margin:</label>
      <input id="safetyMargin" type="checkbox" :checked="safetyMargin" @click="onClick" />

      <label for="salesRevenue">Sales Revenue:</label>
      <input id="salesRevenue" type="checkbox" :checked="salesRevenue" @click="onClick" />
    </div>

    <div class="row">
      <label for="totalCost">Total Cost:</label>
      <input id="totalCost" type="checkbox" :checked="totalCost" @click="onClick" />

      <label for="fixedCost">Fixed Cost:</label>
      <input id="fixedCost" type="checkbox" :checked="fixedCost" @click="onClick" />

      <label for="variableCost">Variable Cost:</label>
      <input id="variableCost" type="checkbox" :checked="variableCost" @click="onClick" />
    </div>

    <div class="row">
      <label for="marginalProfit">Marginal Profit:</label>
      <input id="marginalProfit" type="checkbox" :checked="marginalProfit" @click="onClick" />

      <label for="breakEven">Break Even:</label>
      <input id="breakEven" type="checkbox" :checked="breakEven" @click="onClick" />
    </div>

    <wj-flex-chart>
      <wj-flex-chart-break-even
        :salesPrice="120"
        :variableCost="20"
        :fixedCost="1000000"
        :style="{fill: 'rgba(127,42,250,0.5)', strokeWidth: 0}"
        :altStyle="{fill: 'rgba(255,0,0,0.5)', strokeWidth: 0}"
        :styles="appliedStyles"
      ></wj-flex-chart-break-even>
    </wj-flex-chart>
  </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.chart";
import "@grapecity/wijmo.vue2.chart.analytics";

const App = Vue.extend({
  name: "app",
  data: function() {
    return {
      safetyMargin: true,
      salesRevenue: true,
      totalCost: true,
      fixedCost: true,
      variableCost: true,
      marginalProfit: true,
      breakEven: true,
      appliedStyles: this.createStyles()
    };
  },
  methods: {
    onClick: function(event) {
      const target = event.target;
      const key = target.id;
      const checked = target.checked;
      this[key] = checked;
      let styles = this.createStyles();
      for (let k in styles) {
        if (k == key) {
          styles[k] = checked ? styles[k] : null;
        } else {
          styles[k] = this.appliedStyles[k];
        }
      }
      this.appliedStyles = styles;
    },
    createStyles: function() {
      return {
        safetyMargin: { fill: "lightgreen", strokeWidth: 0 },
        salesRevenue: { stroke: "rgba(127,42,250,1)", strokeWidth: 3 },
        fixedCost: { stroke: "grey", strokeWidth: 3 },
        totalCost: { stroke: "red", strokeWidth: 3 },
        variableCost: { stroke: "black", strokeWidth: 3 },
        marginalProfit: { stroke: "green", strokeWidth: 3 },
        breakEven: { stroke: "rgba(69,171,235,1)", strokeWidth: 3 }
      };
    }
  }
});

const vm = new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexchart {
  height: 300px !important;
}
label {
  width: 120px;
  text-align: right;
}
body {
  margin-bottom: 24pt;
}
</style>
