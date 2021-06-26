<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data" :initialized="initializeGrid">
        </wj-flex-grid>
    </div>
</template>

<script>
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";

import { EditHighlighter }  from "./edit-highlighter";

new Vue({
  	el: "#app",
  	data: {
        data: getData()
    },
    methods:{

        // add EditHighlighter to the grid
        initializeGrid(grid){
            new EditHighlighter(grid, 'cell-changed');
        }
    }
});

// create some random data
function getData() {
    let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
        data = [];
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
@import "./node_modules/bootstrap/dist/css/bootstrap.css";
@import "./node_modules/@grapecity/wijmo.styles/wijmo.css";

    .wj-flexgrid {
        max-height: 220px;
        margin: 10px;
    }

    .wj-flexgrid .cell-changed {
        background-color: lightpink;
    }

    body {
        margin-bottom: 24px;
    }
</style>

