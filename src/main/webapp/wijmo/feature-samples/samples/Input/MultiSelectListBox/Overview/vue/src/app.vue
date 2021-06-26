<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <wj-multi-select-list-box
                        :displayMemberPath="'country'"
                        :showSelectAllCheckbox="showSelectAllCheckbox"
                        :showFilterInput="showFilterInput"
                        :itemsSource="data"
                        :checkedItemsChanged='onCheckedItemsChanged'
                    ></wj-multi-select>
                </div>
                <div class="form-group">
                    <label>
                        Show "Select All" box
                        <input id="selectAll" type="checkbox" v-model="showSelectAllCheckbox">
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        Show "Filter" input
                        <input id="filter" type="checkbox" v-model="showFilterInput">
                    </label>
                </div>
            </div>
            <div class="col-xs-6">
                <p>
                    <b>Checked Items:</b>
                </p>
                <ul>
                    <li v-for="item of checkedItems" :key="item">
                        {{ item.country }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                showFilterInput: true,
                showSelectAllCheckbox: false,
                data: getData(),
                checkedItems: []
            }
        },
        methods: {
            onCheckedItemsChanged: function(sender){
                this.checkedItems = sender.checkedItems;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-multiselectlistbox {
        max-height: 200px;
        min-width: 150px;
    }
    body {
        margin-bottom: 24pt;
    }
</style>
