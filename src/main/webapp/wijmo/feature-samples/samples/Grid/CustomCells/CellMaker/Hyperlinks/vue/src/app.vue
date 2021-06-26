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
                header="Simple Link"
                :width="150"
                :cellTemplate="tplSimpleLink" />
            <wj-flex-grid-column
                binding="country"
                header="Real Link"
                :width="150"
                :cellTemplate="tplRealLink" />
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
                tplSimpleLink: CellMaker.makeLink({
                    click: (e, ctx) => alert('Clicked Link ** ' + ctx.item.country + ' **')
                }),
                tplRealLink: CellMaker.makeLink({
                    text: 'Visit <b>${item.country}</b>',
                    href: '${item.url}',
                    attributes: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        tabIndex: -1
                    }
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
