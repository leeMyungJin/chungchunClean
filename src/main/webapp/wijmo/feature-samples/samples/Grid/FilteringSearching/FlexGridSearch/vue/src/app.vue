<template>
    <div class="container-fluid">
        <wj-flex-grid-search
            ref="theSearch"
            placeholder="FlexGridSearch" />
        <wj-flex-grid
            ref="theGrid"
            :itemsSource="data">
            <wj-flex-grid-filter />
        </wj-flex-grid>
        <p>
            The total item count is now <b>{{itemCount}}</b>.
        </p>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";

    import "@grapecity/wijmo.vue2.grid";
    import "@grapecity/wijmo.vue2.grid.filter";
    import "@grapecity/wijmo.vue2.grid.search";
    import { Control, CollectionView } from "@grapecity/wijmo";
    import { getData } from './data';

    let App = Vue.extend({
        name: "app",
        data: function() {
            let view = new CollectionView(getData(), {
                collectionChanged: (s) => {
                    this.itemCount = s.totalItemCount;
                }
            });
            return {
                data: view,
                itemCount: view.totalItemCount
            };
        },

        // connect search box and grid
        mounted: function() {
            let theGrid = Control.getControl(this.$refs.theGrid.$el);
            let theSearch = Control.getControl(this.$refs.theSearch.$el);
            theSearch.grid = theGrid;
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 250px;
        margin: 10px 0;
    }
    body {
        margin-bottom: 20px;
    }
</style>