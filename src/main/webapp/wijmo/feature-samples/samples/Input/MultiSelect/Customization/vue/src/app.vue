<template>
    <div class="container-fluid">
        <p>
            This MultiSelect uses a <b>wj-item-template</b> component to customize 
            the display of the items in the drop-down list.
        </p>
        <div class="row">
            <div class="col-xs-5">
                <div class="form-group">
                    <wj-multi-select
                        :displayMemberPath="'name'"
                        :placeholder="'Countries'"
                        :headerPath="'name'"
                        :itemsSource="data"
                        :showSelectAllCheckbox="showSelectAllCheckbox"
                        :checkedItemsChanged="onCheckedItemsChanged">
                        <wj-item-template v-slot="ctx">
                            <!--
                                ctx.item - item in itemsSource of ListBox control
                                ctx.itemIndex - index of item in itemsSource of ListBox control
                                ctx.control - ListBox controll
                            -->
                            <div class="item">
                                <label><input type="checkbox"/>{{ ctx.item.name }}</label><br/>
                                <b>{{ ctx.item.city }}</b> ({{ ctx.item.state }})<br/>
                                {{ ctx.item.address }}<br/>
                                Phone: <b>{{ ctx.item.phone }}</b><br/>
                                Fax: <b>{{ ctx.item.fax }}</b><br/>
                                Website: <a :href="ctx.item.site" target="_blank">{{ ctx.item.site }}</a><br/>
                            </div>
                        </wj-item-template>
                    </wj-multi-select>
                </div>
                <div class="form-group">
                    <label>
                        Show "Select All" box
                        <input id="selectAll" type="checkbox" v-model="showSelectAllCheckbox">
                    </label>
                </div>
            </div>
            <div class="col-xs-7">
                <p>
                    <b>Checked Items:</b>
                </p>
                <ul>
                    <li v-for="item of checkedItems" :key="item">
                        {{ item.name }}
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
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                data: getData(),
                checkedItems: [],
                showSelectAllCheckbox: false
            }
        },
        methods: {
            onCheckedItemsChanged: function (sender) {
                this.checkedItems = sender.checkedItems;
            }
        },
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }

    .item {
        margin: 8px;
        font-size: 80%;
    }

    .item label {
        display: inline-flex;
    }

    .item input[type=checkbox] {
        margin: 0px;
    }

    .wj-listbox-item h1 {
        font-size: 12pt;
        font-weight: bold;
        margin: 4px -8px;
    }
</style>