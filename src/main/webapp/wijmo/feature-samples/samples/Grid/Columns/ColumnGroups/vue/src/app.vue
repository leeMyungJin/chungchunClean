<template>
    <div class="app container-fluid">
        <label>
            Collapse/Expand Animation
            <input type="checkbox" v-model="animated" />
        </label>
        <button id="toggle" class="btn btn-primary" @click="toggleGroups">
            Toggle Column Groups
        </button>
        <div v-bind:class="{ animated: animated }">
        <wj-flex-grid
            headersVisibility="Column"
            showSelectedHeaders="All"
            :alternatingRowStep="0"
            :showMarquee="true"
            :autoGenerateColumns="false"
            :columnGroups="columnGroups"
            :itemsSource="data" />
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.css';

    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as DataService from './data';

    let colGroups1 = DataService.getColumnGroups();
    let colGroups2 = DataService.getDeeperColumnGroups();

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: DataService.getData(),
                animated: true,
                colGroups1: colGroups1,
                colGroups2: colGroups2,
                columnGroups: colGroups1
            };
        },
        methods: {
            toggleGroups: function() {
                this.columnGroups = this.columnGroups == this.colGroups1 
                    ? this.colGroups2 
                    : this.colGroups1;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .app label {
        display: block;
    }
    .wj-flexgrid {
        margin: 10px 0;
    }

    /* highlight the main column in the group */
    .wj-flexgrid .wj-cells .wj-cell.main-column {
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
    .animated .wj-flexgrid .wj-colheaders .wj-header.wj-cell.wj-colgroup {
        transition: all .2s;
    }
</style>