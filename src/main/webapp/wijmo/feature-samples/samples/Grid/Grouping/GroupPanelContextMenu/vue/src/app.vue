<template>
    <div class="container-fluid">

        <wj-group-panel
            style="display: block"
            :initialized="initializedPanel"
            :grid="grid"
            :placeholder="'Drag columns here to create groups'">
        </wj-group-panel>

        <wj-flex-grid
            :itemsSource="data"
            :initialized="initializedGrid">
        </wj-flex-grid>

        <wj-menu
            style="display: none"
            dropDownCssClass="ctx-menu"
            :initialized="initializedMenu"
            :itemClicked="itemClicked" >
            <wj-menu-item>
                <span class='wj-glyph-down-right'></span> Expand All
            </wj-menu-item>
            <wj-menu-item>
                <span class='wj-glyph-right'></span> Collapse All
            </wj-menu-item>
                <wj-menu-separator />
            <wj-menu-item>
                <span class='wj-glyph-up'></span> Sort Ascending
            </wj-menu-item>
            <wj-menu-item>
                <span class='wj-glyph-down'></span> Sort Descending
            </wj-menu-item>
            <wj-menu-item>
                <span class='wj-glyph-circle'></span> Remove Sort
            </wj-menu-item>
                <wj-menu-separator />
            <wj-menu-item>
                <span>&times;</span> Remove Group
            </wj-menu-item>
        </wj-menu>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.grid.filter";
import { CollectionView, PropertyGroupDescription, SortDescription } from "@grapecity/wijmo";
import "@grapecity/wijmo.vue2.grid.grouppanel";
import "@grapecity/wijmo.vue2.input"; // for the menu

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: new CollectionView(this.getData(), {
                groupDescriptions: ['country', 'product']
            }),
            grid: null,
            groupIndex: -1,
        };
    },
    methods: {

        // save references to the controls
        initializedGrid: function(grid) {
            this.grid = grid;
        },
        initializedPanel: function(panel) {
            panel.hostElement.addEventListener('contextmenu', e => {
                let groupDescription = panel.hitTest(e),
                    cv = panel.collectionView;
                if (groupDescription) {
                    this.groupIndex = cv.groupDescriptions.indexOf(groupDescription);
                    this.menu.show(e);
                }
                e.preventDefault();
            });
        },
        initializedMenu: function(menu) {
            this.menu = menu;
        },

        // handle menu commands
        itemClicked: function(menu) {
            let grid = this.grid,
                cv = grid.collectionView,
                groupIndex = this.groupIndex;
            switch (menu.selectedIndex) {
                case 0: // expand all
                    grid.collapseGroupsToLevel(groupIndex + 1);
                    break;
                case 1: // collapse all
                    grid.collapseGroupsToLevel(groupIndex);
                    break;
                
                case 3: // sort asc
                case 4: // sort desc
                case 5: // no sort
                    cv.deferUpdate(() => {
                        cv.sortDescriptions.clear();
                        if (menu.selectedIndex != 5) {
                            let binding = cv.groupDescriptions[groupIndex].propertyName;
                            cv.sortDescriptions.push(new SortDescription(binding, menu.selectedIndex == 3));
                        }
                    });
                    break;
                
                case 7: // remove group
                    cv.groupDescriptions.removeAt(groupIndex);
                    break;
            }
        },

        // create some random data
        getData: function() {
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                products = "Phones,Computers,Cameras,Stereos".split(","),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    product: products[i % products.length],
                    downloads: Math.round(100 + Math.random() * 10000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
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

    .wj-dropdown-panel.ctx-menu {
        background: rgb(221, 250, 255);
        padding: 1em;
    }

    .wj-dropdown-panel.ctx-menu span {
        margin-right: 0.5em;
        opacity: 0.5;
    }

    body {
        margin-bottom: 20px;
    }
</style>