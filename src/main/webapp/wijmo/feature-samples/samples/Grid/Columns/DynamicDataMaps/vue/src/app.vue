<template>
	<div class="container-fluid">
		<wj-flex-grid :itemsSource="data">
			<wj-flex-grid-column header="Country" binding="country" :dataMap="countryMap" />
			<wj-flex-grid-column header="City" binding="city" :dataMap="cityMap" />
			<wj-flex-grid-column header="Downloads" binding="downloads" format="n0" />
			<wj-flex-grid-column header="Sales" binding="sales" format="n0" />
		</wj-flex-grid>
	</div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import { DataMap } from "@grapecity/wijmo.grid";

    new Vue({
        el: "#app",
        data: function() {

            // create data maps
            let countryMap = new DataMap(getCountries(), 'id', 'name');
            let cityMap = new DataMap(getCities(), 'id', 'name');

            // override cityMap's getDisplayValues method to get cities that
            // correspond to the current item's country
            cityMap.getDisplayValues = (dataItem) => {
                let validCities = getCities().filter(city => city.country == dataItem.country);
                return validCities.map(city => city.name);
            };

            return {
                data: getData(),
                countryMap: countryMap,
                cityMap: cityMap
            };
        }
    });

    // create some data
    function getData() {
        var cities = getCities(),
            data = [];
        for (var i = 0; i < cities.length; i++) {
            data.push({
                country: cities[i].country,
                city: cities[i].id,
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
    function getCountries() {
        return [
            { id: 0, name: 'US' },
            { id: 1, name: 'Germany' },
            { id: 2, name: 'UK' },
            { id: 3, name: 'Japan' },
            { id: 4, name: 'Italy' },
            { id: 5, name: 'Greece' }
        ];
    }
    function getCities() {
        return [
            { id: 0, country: 0, name: 'Washington' },
            { id: 1, country: 0, name: 'Miami' },
            { id: 2, country: 0, name: 'Seattle' },
            { id: 3, country: 1, name: 'Bonn' },
            { id: 4, country: 1, name: 'Munich' },
            { id: 5, country: 1, name: 'Berlin' },
            { id: 6, country: 2, name: 'London' },
            { id: 7, country: 2, name: 'Oxford' },
            { id: 8, country: 2, name: 'Bath' },
            { id: 9, country: 3, name: 'Tokyo' },
            { id: 10, country: 3, name: 'Sendai' },
            { id: 11, country: 3, name: 'Kobe' },
            { id: 12, country: 4, name: 'Rome' },
            { id: 13, country: 4, name: 'Florence' },
            { id: 14, country: 4, name: 'Milan' },
            { id: 15, country: 5, name: 'Athens' },
            { id: 16, country: 5, name: 'Santorini' },
            { id: 17, country: 5, name: 'Thebes' }
        ];
    }
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin: 12px 0;
    }
</style>

