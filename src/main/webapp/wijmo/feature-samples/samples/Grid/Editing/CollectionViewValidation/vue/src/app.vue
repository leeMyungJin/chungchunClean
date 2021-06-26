<template>
  <div class="container-fluid">
      <wj-flex-grid :itemsSource="data">
          <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" />
          <wj-flex-grid-column binding="country" header="Country" :isRequired="true" :dataMap="countries" />
          <wj-flex-grid-column binding="sales" header="Sales" />
          <wj-flex-grid-column binding="expenses" header="Expenses" />
          <wj-flex-grid-column binding="date" header="Date" :isRequired="true" format="M/d/yyyy" />
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
import { CollectionView, DateTime } from '@grapecity/wijmo';

new Vue({
  	el: "#app",
  	data: {
      	countries: getCountries(),
      	data: new CollectionView(getData(), {
            getError: (item, prop, parsing) => {

                // parsing errors
                if (parsing) {
                    switch (prop) {
                        case 'country':
                            return 'Please select a country from the list.';
                        case 'date':
                            return 'Please enter a date in the format "M/d/yyyy".'
                        default:
                            return 'Please enter a number.';
                    }
                }

                // data errors
                if (prop == 'sales' && item.sales < 0) {
                    return 'Sales cannot be negative!';
                }
                if (prop == 'expenses' && item.expenses < 0) {
                    return 'Expenses cannot be negative!';
                }

                // no errors
                return null;
            }
        })
	}
});

function getCountries() {
    return 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
}

function getData() {
    let countries = getCountries(),
        today = new Date(),
        data = [];
    for (let i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            date: DateTime.addDays(today, -Math.random() * 360),
            overdue: (i + 1) % 4 == 0
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

