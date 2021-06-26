<template>
  <div class="container-fluid">
      <p>
          Click the button below to evaluate this template literal using
          Wijmo's <b>glbz</b> tag function that formats numbers and dates using 
          Wijmo's <b>Globalize</b> class:
      </p>
      <pre>glbz\`Today is $‌\{new Date()}:d, and PI is $‌\{Math.PI}:n4.\`</pre>
      <button id="btn1" class="btn btn-default" @click="format1">
          Show Result
      </button>
      <pre id="result1">{{result1}}</pre>
      
      <p>
          This example shows how you can use quoted format strings for dates and times:
      </p>
      <pre>glbz\`Today is‌ $\{new Date()}:'dddd, MMMM dd'.\`</pre>    
      <button id="btn2" class="btn btn-default" @click="format2">
          Show Result
      </button>
      <pre id="result2">{{result2}}</pre>
  </div>
</template>

<script>
import "bootstrap.css";
import Vue from "vue";
import { glbz } from '@grapecity/wijmo';

let App = Vue.extend({
  name: "app",
  data: function() {
      return {
        result1: '',
        result2: ''
      };
  },
  methods: {
    format1: function() {
      this.result1 = glbz`Today is ${new Date()}:d, and PI is ${Math.PI}:n4.`;
    },
    format2: function() {
      this.result2 = glbz`Today is‌ ${new Date()}:'dddd, MMMM dd'.`;
    }
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>
