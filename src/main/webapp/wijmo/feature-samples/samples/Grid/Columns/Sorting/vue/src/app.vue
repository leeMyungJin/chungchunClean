<template>
	<div class="container-fluid">
		<label>
			allowSorting: 
			<wj-combo-box
				:itemsSource="allowSortingOptions"
				:selectedIndex="allowSorting"
				:selectedIndexChanged="allowSortingChanged"
			/>
		</label>
		<wj-flex-grid
			:itemsSource="view"
			:allowSorting="allowSorting"
		/>
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.input";
import { CollectionView } from "@grapecity/wijmo";
import { AllowSorting } from "@grapecity/wijmo.grid";

new Vue({
  	el: "#app",
  	data: {
		view: new CollectionView(getData()),
		allowSortingOptions: 'None,SingleColumn,MultiColumn'.split(','),
		allowSorting: AllowSorting.MultiColumn
    },
    methods: {
        allowSortingChanged: function(s) {
            this.view.sortDescriptions.clear();
            this.allowSorting = s.selectedIndex;
        }
    }
});

// generate some random data
function getData() {
	let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
		data = [];
	for (let i = 0; i < 200; i++) {
		data.push({
			id: i,
			country: countries[i % countries.length],
			downloads: Math.round(Math.random() * 20000),
			sales: Math.random() * 10000,
			expenses: Math.random() * 5000,
			num1: Math.random() * 5000,
			num2: Math.random() * 5000,
			num3: Math.random() * 5000,
			num4: Math.random() * 5000,
			num5: Math.random() * 5000,
		});
	}
	return data;
}

</script>

<style>
	.wj-flexgrid {
		max-height: 250px; 
		margin: 10px 0;
	}
	label {
		display: block;
	}
</style>

