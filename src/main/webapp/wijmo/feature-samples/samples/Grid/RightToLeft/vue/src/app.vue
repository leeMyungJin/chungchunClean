<template>
    <div class="container-fluid">
        <div class="col-md-6">
            <h2>
                Left to Right
            </h2>
            <wj-flex-grid :itemsSource="data" />
        </div>
        <div class="col-md-6" dir="rtl">
            <h2>
                Right to Left
            </h2>
            <wj-flex-grid :itemsSource="data" />
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import { CollectionView } from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: new CollectionView(this._getData())
            }
        },
        methods: {
            _getData: function() {
                let countries = 'US,Germany,UK,Japan,China,Korea,Italy,Greece,Spain'.split(','),
                    data = [];
                for (let i = 0; i < countries.length; i++) {
                    data.push({
                        id: i,
                        country: countries[i],
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
