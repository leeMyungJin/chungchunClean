<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :allowSorting="'MultiColumn'"
        />
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: getData(200)
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
  max-height: 250px;
  margin-bottom: 12px;
}
</style>
