<template>
    <div class="container-fluid">
        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :itemsSource="data">

            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" :width="80" />
            <wj-flex-grid-column binding="country" header="Country" :dataMap="countries" />

            <wj-flex-grid-column binding="rating" header="Rating (no stars)" />
            <wj-flex-grid-column
                binding="rating"
                header="Rating (editable)"
                align="center"
                :width="220"
                :cellTemplate="tplRating" />
            <wj-flex-grid-column
                binding="rating"
                header="Rating (read-only)"
                align="center"
                cssClass="custom-rating"
                :width="220"
                :isReadOnly="true"
                :cellTemplate="tplRatingReadOnly" />
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';

    import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
    import { CollectionView } from '@grapecity/wijmo';
    import { getData, getCountries } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {

                // data
                countries: getCountries(),
                data: new CollectionView(getData(1000), {
                    getError: function(item, prop) {
                        if (prop == 'rating') {
                            if (item.rating < 0 || item.rating > 5) {
                                return 'Ratings should be between zero and five.'
                            }
                        }
                        return null; // no errors
                    }
                }),

                // cell templates
                tplRating: CellMaker.makeRating({
                    range: [0, 5],
                    label: 'Edit Product Rating'
                }),
                tplRatingReadOnly: CellMaker.makeRating({
                    range: [0, 5],
                    label: 'See Product Rating'
                })
            }
        },
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexgrid {
        max-height: 300px;
    }
    .wj-flexgrid .wj-cell {
        padding: 6px 10px;
    }

    /* customize the rating symbol/color/size */
    .wj-flexgrid .wj-cell.wj-cell-maker.wj-radio-map.custom-rating label {
        width: .25em;
        color: green;
    }
    .wj-flexgrid .wj-cell.wj-cell-maker.wj-radio-map.custom-rating label:after {
        transform: scale(12);
        content: '\2b24';
    }
</style>
