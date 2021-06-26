<template>
	<div class="container-fluid">
		<wj-flex-grid :showMarquee="true" :itemsSource="data">
            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" />
            <wj-flex-grid-column
                binding="country"
                header="AutoComplete"
                :dataMap="dataMap"
                dataMapEditor="AutoComplete" />
            <wj-flex-grid-column
                binding="country" 
                header="DropDownList"
                :dataMap="dataMap"
                dataMapEditor="DropDownList" />
            <wj-flex-grid-column
                binding="country"
                header="RadioButtons"
                :dataMap="dataMap"
                dataMapEditor="RadioButtons"
                :width="300"
                align="center" />
            <wj-flex-grid-column binding="active" header="Active" />
            <wj-flex-grid-column binding="downloads" header="Downloads" />
            <wj-flex-grid-column binding="sales" header="Sales" />
            <wj-flex-grid-column binding="expenses" header="Expenses" />
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
        return {
            data: this._getData(),
            dataMap: this._getDataMap()
        };
    },
    methods: {
        _getDataMap() {
            let countries = 'US,UK,Japan,Other'.split(','),
                arr = countries.map((name, id) => { return { id: id, name: name } });
            return new DataMap(arr, 'id', 'name');
        },
        _getData() {
            let data = [],
                map = this._getDataMap(),
                len = map.collectionView.items.length;
            for (let i = 0; i < 20; i++) {
                data.push({
                    id: i,
                    country: Math.floor(Math.random() * len),
                    active: i % 5 != 0,
                    downloads: Math.round(Math.random() * 200000),
                    sales: Math.random() * 100000,
                    expenses: Math.random() * 50000
                });
            }
            return data;
        }
    }
});
</script>

<style>
  .wj-flexgrid {
      max-height: 200px;
      margin: 12px 0;
  }
</style>

