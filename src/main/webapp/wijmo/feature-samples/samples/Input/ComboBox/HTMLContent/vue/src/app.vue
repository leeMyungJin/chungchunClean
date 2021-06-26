<template>
    <div class="container-fluid">
        <p>
            This ComboBox uses a <b>wj-item-template</b> component to customize the display 
            of the items in the drop-down list.
        </p>
        <wj-combo-box :displayMemberPath="'name'" :headerPath="'name'" :itemsSource="data">
            <wj-item-template v-slot="ctx">
                <!--
                    ctx.item - item in itemsSource of ListBox control
                    ctx.itemIndex - index of item in itemsSource of ListBox control
                    ctx.control - ListBox controll
                -->
                <div class="item">
                    <h1>{{ ctx.item.name }}</h1>
                    <b>{{ ctx.item.city }}</b> ({{ ctx.item.state }})<br/>
                    {{ ctx.item.address }}<br/>
                    Phone: <b>{{ ctx.item.phone }}</b><br/>
                    Fax: <b>{{ ctx.item.fax }}</b><br/>
                    Website: <a :href="ctx.item.site" target="_blank">{{ ctx.item.site }}</a><br/>
                </div>
            </wj-item-template>

        </wj-combo-box>
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

    .wj-listbox-item h1 {
        font-size: 12pt;
        font-weight: bold;
        margin: 4px -8px;
    }
</style>