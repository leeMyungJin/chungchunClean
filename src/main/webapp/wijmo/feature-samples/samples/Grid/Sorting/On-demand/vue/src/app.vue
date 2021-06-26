<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="data">
            <wj-flex-grid-filter />
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.grid.filter';
    import { CollectionView } from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: new CollectionView(this._getData(), {
                    refreshOnEdit: false // on-demand sorting and filtering
                })
            }
        },
        methods: {
            _getData: function() {
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    data = [];
                for (let i = 0; i < countries.length; i++) {
                    data.push({
                        id: i,
                        country: countries[i],
                        active: i % 5 != 0,
                        downloads: Math.round(Math.random() * 20000),
                        sales: Math.random() * 10000,
                        expenses: Math.random() * 5000
                    });
                }
                return data;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>
