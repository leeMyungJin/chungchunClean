<template>
    <div class="container-fluid">
        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :itemsSource="data">

            <wj-flex-grid-column binding="id" header="ID" :isReadOnly="true" :width="80" />
            <wj-flex-grid-column binding="country" header="Country" :dataMap="countries" />

            <wj-flex-grid-column
                binding="country"
                header="Simple Button"
                :width="150"
                :cellTemplate="tplSimpleButton" />
            <wj-flex-grid-column
                binding="country"
                header="Custom Button"
                :width="150"
                :cellTemplate="tplCustomButton" />
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
                tplSimpleButton: CellMaker.makeButton({
                    click: (e, ctx) => alert('Clicked Button ** ' + ctx.item.country + ' **')
                }),
                tplCustomButton: CellMaker.makeButton({
                    text: '<b>${item.country}</b> Button',
                    click: (e, ctx) => alert('Clicked Button ** ' + ctx.item.country + ' **')
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
</style>
