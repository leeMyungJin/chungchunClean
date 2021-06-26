<template>
  <div class="container-fluid">
      <wj-flex-grid
          :itemsSource="data"
          :gotFocus="startEditing"
          :selectionChanged="startEditing">
          <wj-flex-grid-column binding="id" header="ID" :width=50 :isReadOnly="true" />
          <wj-flex-grid-column binding="country" header="Country" :isRequired="true" :dataMap="countries" />
          <wj-flex-grid-column binding="sales" header="Sales" />
          <wj-flex-grid-column binding="expenses" header="Expenses" />
          <wj-flex-grid-column binding="overdue" header="Overdue" />
      </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import '@grapecity/wijmo.input';
import { DataType } from '@grapecity/wijmo';

new Vue({
  	el: "#app",
  	data: {
        data: getData(),
        countries: getCountries()
  	},
	methods:{
        startEditing(flex) {
            let index = flex.selection.col,
                col = index > -1 ? flex.columns[index] : null;
            if (col && !col.isReadOnly && col.dataType != DataType.Boolean) {
                setTimeout(() => {
                    flex.startEditing(false); // quick mode
                }, 50); // let the grid update first
            }
        }
	}
});

function getCountries() {
    return ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece']
}
function getData() {
    let data = [],
        countries = getCountries();
    for (let i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: i % 4 == 0
        });
    }
    return data;
}

</script>

<style>
	.wj-flexgrid {
		max-height: 200px;
		margin-bottom: 12px;
	}

	body {
		margin-bottom: 24px;
	}
</style>

