<template>
    <div class="container-fluid">
        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :itemsSource="data">

            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" :width="80" />
            <wj-flex-grid-column binding="country" header="Country" :dataMap="countries" />

            <wj-flex-grid-column
                binding="img"
                header="Images"
                cssClass="cell-img"
                :cellTemplate="tplImage" />
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
    import { getData, getCountries } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {

                // data
                countries: getCountries(),
                data: getData(1000),

                // cell templates
                tplImage: CellMaker.makeImage({
                    label: 'image for ${item.country}',
                    click: (e, ctx) => alert('Clicked image for ' + ctx.item.country)
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

    /* images (applying formats to the cell, not to the inner IMG element */
    .wj-flexgrid .wj-cell.cell-img {
        padding: 0;
        text-align: center;
    }
    .wj-flexgrid .wj-cell.cell-img:hover {
        z-index: 1;
        overflow: visible;
    }
    .wj-flexgrid .wj-cell.cell-img:hover img {
        transform: scale(3);
        transition: all 600ms;
    }
</style>
