<template>
    <div class="container-fluid">
        <input class="form-control" placeholder="country filter"
            v-on:input="updateFilter($event)" />
        <p>
            Result ({{ itemCount | format('n0') }} items):
        </p>
        <wj-flex-grid
            :items-source="view" 
            :alternating-row-step="0"
            headers-visibility="Column">
            <wj-flex-grid-filter></wj-flex-grid-filter>
        </wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
   
    import Vue from 'vue';

    import { CollectionView, Globalize } from '@grapecity/wijmo';
    import { getData } from './data';
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.grid.filter';

    new Vue({
        el: '#app',

        created: function () {

            // create CollectionView, add country filter
            this.view = new CollectionView(getData());
            this.view.filters.push(item => {
                let text = this.filterText;
                return !text || item.country.toLowerCase().indexOf(text) > -1;
            });
            this.filterText = '';
            this.itemCount = this.view.totalItemCount;

            this.view.collectionChanged.addHandler(() => {
                this.itemCount = this.view.totalItemCount;
            })
        },

        data: {
            itemCount: 0,
            filterText: '',
        },

        methods: {
            updateFilter(e) {
                this.filterText = e.target.value.toLowerCase();
                this.view.refresh();
            }
        },

        filters: {
            format(fmt, val) { // wijmo.Globalize filter
                return Globalize.format(fmt, val)
            }
        }
    })
</script>

<style>
    .wj-flexgrid {
        max-height: 250px;
    }

    .container-fluid > .form-control {
        max-width: 40em;
        margin-bottom: 1em;
    }
</style>