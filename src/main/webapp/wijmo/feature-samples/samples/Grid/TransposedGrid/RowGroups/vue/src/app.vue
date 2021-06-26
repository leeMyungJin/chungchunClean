<template>
    <div class="container-fluid">
        <label>
            Collapse/Expand Animation
            <input type="checkbox" v-model="animated" />
        </label>
        <button id="toggle" class="btn btn-primary" @click="toggleGroups">
            Toggle Row Groups
        </button>
        <div v-bind:class="{ animated: animated }">
        <wj-transposed-grid
            showSelectedHeaders="Row"
            :alternatingRowStep="0"
            :showMarquee="true"
            :autoGenerateRows="false"
            :rowGroups="rowGroups"
            :itemsSource="data" />
        </div>
    </div>
</template>

<script>
    import '@grapecity/wijmo.touch';
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import "@grapecity/wijmo.vue2.grid.transposed";
    import { getRowGroups, getDeeperRowGroups, getData } from './data';

    let rowGroups1 = getRowGroups();
    let rowGroups2 = getDeeperRowGroups();

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData(),
                animated: true,
                rowGroups1: rowGroups1,
                rowGroups2: rowGroups2,
                rowGroups: rowGroups1
            };
        },
        methods: {
            toggleGroups: function() {
                this.rowGroups = this.rowGroups == this.rowGroups1 
                    ? this.rowGroups2 
                    : this.rowGroups1;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    @import "./node_modules/bootstrap/dist/css/bootstrap.css";
    @import "./node_modules/@grapecity/wijmo.styles/wijmo.css";

    label {
        display: block;
    }
    .wj-transposed-grid {
        margin: 10px 0;
    }

    /* highlight the main row in the group */
    .wj-flexgrid .wj-cells .wj-cell.main-row:not(.wj-state-selected):not(.wj-state-multi-selected) {
        background: #e3f4ff;
    }

    /* some conditional formatting */
    .big-val {
        font-weight: bold;
        color: darkgreen;
    }
    .small-val {
        font-style: italic;
        color: rgb(202, 0, 0);
    }

    /* some animation when collapsing/expanding the groups */
    .animated .wj-rowheaders .wj-header.wj-cell.wj-colgroup {
        transition: all .2s;
    }
</style>