<template>
	<div class="container-fluid">
		<wj-flex-grid id="sample-grid"
            :allowSorting="false"
            :allowDragging="false"
            selectionMode="MultiRange"
			:itemsSource="data" 
        />
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";

new Vue({
  	el: "#app",
  	data: {
		data: getData()
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
	
	/* style frozen cells */
	#sample-grid .wj-cell.wj-frozen:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected),
	#sample-grid .wj-cell.wj-frozen.wj-alt:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
		background: rgb(255,255,125);
	}
</style>

