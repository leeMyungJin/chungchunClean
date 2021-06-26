<template>
    <div class="container-fluid">
        <div class="form-group row">
            <div class="col-md-2">
                <input class="form-control" placeholder="country filter"
                    v-on:input="updateFilter($event)" />
            </div>
        </div>

        <p>
            Result ({{ view2.items.length }} items):
        </p>

        <wj-flex-grid :items-source="view2" :alternating-row-step=0 headers-visibility="Column">
            <wj-flex-grid-filter></wj-flex-grid-filter>
        </wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.grid.filter';

    new Vue({
        el: '#app',
        created: function () {
            this.view = new wjCore.CollectionView(getData());
            this.view2 = new wjCore.CollectionView(this.view.items);
        },
        methods:{
            updateFilter(e) {
                // update first CollectionView's filter
                this.view.filter = (item) => {
                    return e.srcElement.value
                        ? item.country.toLowerCase().indexOf(e.srcElement.value.toLowerCase()) > -1
                        : true;
                }
                //
                // update second collection view's sourceCollection
                this.view2.sourceCollection = this.view.items;
            }
        },
        data: {
            view2: null
        }
    })
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 250px;
    }

    label {
        width: 100%
    }
</style>