<template>
    <div class="app container-fluid">
        <label htmlFor="cmb-pg-size">Page Size</label>
        <wj-combo-box id="cmb-pg-size" 
            :itemsSource="[0, 5, 10]"
            :selectedIndex="1"
            :textChanged="cbTextChanged"/>
        <br />

        <label htmlFor="cv-nav">Navigate By Item</label>
        <wj-collection-view-navigator
            :cv="view"
            :headerFormat="'Item {currentItem:n0} of {itemCount:n0} (on page {currentPage:n0})'"/>
        <br />                

        <label htmlFor="cv-pg">Navigate By Page</label>
        <wj-collection-view-navigator
            :cv="view"
            :byPage="true"
            :headerFormat="'Page {current:n0} of {count:n0}'"/>
        <br />                
    
        <wj-flex-grid
            :itemsSource="view"
            :selectionMode="'RowRange'"
            :showMarquee="true"/>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'src/app.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';
    import { CollectionView } from '@grapecity/wijmo';

    //let App = Vue.extend({
    new Vue({
        el: "#app",

        // component state
        data: function() {
            return {
                view: new CollectionView(this.getData(), {
                    pageSize: 5
                })
            };
        },

        // component methods
        methods: {
            getData() {
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    names = 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(','),
                    data = [];
                for (let i = 0; i < 50; i++) {
                    data.push({
                        id: i,
                        name: names[i % names.length],
                        country: countries[i % countries.length],
                        active: i % 5 != 0,
                        downloads: Math.round(Math.random() * 200000),
                        sales: Math.round(Math.random() * 20000),
                    });
                }
                return data;
            },
            cbTextChanged(cb) {
                this.view.pageSize = cb.selectedValue;
            }
        }
    });
</script>

