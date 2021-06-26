<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <wj-flex-grid
                    :itemsSource="view"
                    :allowAddNew="true"
                    :allowDelete="true">
                </wj-flex-grid>
            </div>
            <div class="col-xs-6">

                <h4>Edited Items:</h4>
                <wj-flex-grid class="changed edited"
                    :itemsSource="view.itemsEdited"
                    :isReadOnly="true">
                </wj-flex-grid>

                <h4>Added Items:</h4>
                <wj-flex-grid class="changed added"
                    :itemsSource="view.itemsAdded"
                    :isReadOnly="true">
                </wj-flex-grid>

                <h4>Removed Items:</h4>
                <wj-flex-grid class="changed removed"
                    :itemsSource="view.itemsRemoved"
                    :isReadOnly="true">
                </wj-flex-grid>

            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as wijmo from "@grapecity/wijmo";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                view: new wijmo.CollectionView(getData(), {
                    sortDescriptions: ["country"],
                    trackChanges: true
                })
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid:not(.changed) {
        height: 300px;
    }

    .wj-flexgrid.changed {
        font-size: 90%;
        background-color: #f0f0f0
    }

    .wj-flexgrid.edited {
        color: orange
    }

    .wj-flexgrid.added {
        color: green
    }

    .wj-flexgrid.removed {
        color: red
    }
</style>