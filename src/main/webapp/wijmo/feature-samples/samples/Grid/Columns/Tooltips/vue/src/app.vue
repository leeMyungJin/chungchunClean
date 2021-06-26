<template>
	<div class="container-fluid">
		<wj-flex-grid
			:itemsSource="data"
            :loading-rows="loadingRows"
            :format-item="formatItem">
		</wj-flex-grid>
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { Tooltip, PopupPosition } from "@grapecity/wijmo";

new Vue({
  	el: "#app",
  	data: function() {
        return {
            data: this.getData(),
            hdrTips: new Tooltip({ 
                position: PopupPosition.RightTop,
                showAtMouse: true,
                showDelay: 600,
                cssClass: 'hdr-tip'
            })
        }
    },
    methods: {

        // clean up old tips when loading rows
        loadingRows() {
            this.hdrTips.dispose()
        },

        // add tooltips to column headers
        formatItem(s, e) {
            if (e.panel == s.columnHeaders) {
                this.hdrTips.setTooltip(e.cell,
                    'this is column<br/>' +
                    '<span class="col-header">' + e.getColumn().header + '</span>');
            }
        },

        // get some dummy data
        getCountries() {
            return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        },
        getData(cnt = 10) {
            let countries = this.getCountries(),
                data = [];
            for (var i = 0; i < cnt; i++) {
                data.push({
                    id: i,
                    date: new Date(2020, i % 12, (i + 1) % 25),
                    active: i % 4 == 0,
                    country: countries[i % countries.length],
                    sales: Math.random() * 2000,
                    expenses: Math.random() * 1000,
                });
            }
            return data;
        }
    }
});
</script>

<style>
    .wj-flexgrid {
        max-height: 250px;
        margin: 10px 0;
    }

    .wj-tooltip.hdr-tip {
        background: black;
        color: lightblue;
        padding: 1em 2em;
        margin: .5em;
        border-radius: 1em;
    }

    .wj-tooltip.hdr-tip .col-header {
        color: orange;
        font-weight: bold;
        font-size: 150%;
    }
</style>

