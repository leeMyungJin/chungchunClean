<template>
    <div class="container-fluid">
        <div class="input-group">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
            </div>
            <input class="form-control" placeholder="Filter"
                @input="filterChanged($event)" />
        </div>
        <!-- the grid -->
        <wj-flex-grid
            :childItemsPath="'cities'"
            :headersVisibility="'Column'"
            :itemsSource="data"
            :initialized="initialized"
            :sortedColumn="applyHierarchicalFilter"/>

        <p>
          For more details in hierarchical filtering, please see our
          <a href="https://www.grapecity.com/blogs/filter-hierarchical-data-flexgrid/" target="_blank">
            How to Filter Hierarchical Data in FlexGrid and Angular
          </a>
          blog.
        </p>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            filter: '',
            data: this.getData()
        };
    },
    methods: {

        initialized: function(flex) {
            this.flex = flex;
        },

        filterChanged: function(e) {
            this.filter = e.target.value.toLowerCase();
            this.applyHierarchicalFilter();
        },

        applyHierarchicalFilter: function() {
            let filter = this.filter,
                grid = this.flex,
                rows = grid.rows;
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i],
                    state = row.dataItem,
                    rng = row.getCellRange();

                // handle states (level 0)
                if (row.level == 0) {

                    // check if the state name matches the filter
                    let stateVisible =
                        state.name.toLowerCase().indexOf(filter) >= 0;
                    if (stateVisible) {

                        // it does, so show the state and all its cities
                        for (let j = rng.topRow; j <= rng.bottomRow; j++) {
                            rows[j].visible = true;
                        }
                    } else {

                        // it does not, so check the cities
                        for (let j = rng.topRow + 1; j <= rng.bottomRow; j++) {
                            let city = rows[j].dataItem,
                                cityVisible =
                                    city.name.toLowerCase().indexOf(filter) >=
                                    0;
                            rows[j].visible = cityVisible;
                            stateVisible = stateVisible || cityVisible;
                        }

                        // if at least one city is visible, the state is visible
                        rows[i].visible = stateVisible;
                    }

                    // move on to the next group
                    i = rng.bottomRow;
                }
            }
        },

        getData: function() {
            return [
                {
                    name: "Washington",
                    type: "state",
                    population: 6971,
                    cities: [
                        { name: "Seattle", type: "city", population: 652 },
                        { name: "Spokane", type: "city", population: 210 }
                    ]
                },
                {
                    name: "Oregon",
                    type: "state",
                    population: 3930,
                    cities: [
                        { name: "Portland", type: "city", population: 609 },
                        { name: "Eugene", type: "city", population: 159 }
                    ]
                },
                {
                    name: "California",
                    type: "state",
                    population: 38330,
                    cities: [
                        { name: "Los Angeles", type: "city", population: 3884 },
                        { name: "San Diego", type: "city", population: 1356 },
                        { name: "San Francisco", type: "city", population: 837 }
                    ]
                }
            ];
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
.wj-cell.wj-group {
    border: none;
}
.wj-cell.wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
    background-color: white;
}
body {
    margin-bottom: 20px;
}
</style>