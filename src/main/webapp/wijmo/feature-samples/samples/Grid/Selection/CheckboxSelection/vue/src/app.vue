<template>
    <div class="container-fluid">
        <label>
            Grouped Data
            <input type="checkbox"
                :checked="grouped" 
                @click="setGroups($event.target.checked)"/>
        </label>
        <label>
            Header Column
            <input type="checkbox"
                :checked="headers" 
                @click="setHeaders($event.target.checked)"/>
        </label>
        <p>
            There are now <b>{{selectedItems.length}}</b> items selected.
        </p>

        <wj-flex-grid
            :deferResizing="true"
            :showMarquee="true"
            :alternatingRowStep="0"
            :itemsSource="view"
            :initialized="initGrid">
            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" />
            <wj-flex-grid-column binding="country" header="Country" />
            <wj-flex-grid-column binding="product" header="Product" />
            <wj-flex-grid-column binding="discount" header="Discount" format="p0" />
            <wj-flex-grid-column binding="downloads" header="Downloads" />
            <wj-flex-grid-column binding="sales" header="Sales" />
            <wj-flex-grid-column binding="expenses" header="Expenses" />
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';

    import { FlexGrid, HeadersVisibility } from '@grapecity/wijmo.grid';
    import { Selector } from '@grapecity/wijmo.grid.selector';
    import { CollectionView, PropertyGroupDescription } from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                view: new CollectionView(getData(30)),
                grouped: true,
                headers: true,
                selectedItems: [],
                selector: null
            }
        },
        methods: {
            initGrid: function(grid) {
                this.setGroups(true);
                this.selector = new Selector(grid, {
                    itemChecked: () => {
                        this.selectedItems = grid.rows.filter(r => r.isSelected);
                    }
                });
            },
            setGroups: function(groupsOn) {
                let groups = this.view.groupDescriptions;
                groups.clear();
                if (groupsOn) {
                    groups.push(
                        new PropertyGroupDescription('country'),
                        new PropertyGroupDescription('product')
                    );
                }
                this.grouped = groupsOn;
            },
            setHeaders: function(headersOn) {
                let theGrid = this.selector.column.grid;
                theGrid.headersVisibility = headersOn
                    ? HeadersVisibility.All
                    : HeadersVisibility.Column;
                this.selector.column = headersOn
                    ? theGrid.rowHeaders.columns[0]
                    : theGrid.columns[0];
                this.headers = headersOn;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    /* fixed grid height */
    .wj-flexgrid {
        height: 350px;
    }

    /* some extra cell padding */
    .wj-flexgrid .wj-cell {
        padding: 8px;
    }

    /* some space after the labels */
    label {
        margin-right: 4em;
    }
</style>
