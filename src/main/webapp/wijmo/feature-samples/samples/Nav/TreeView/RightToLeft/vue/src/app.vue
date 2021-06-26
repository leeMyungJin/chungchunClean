<template>
    <div class="container-fluid">
        <wj-tree-view dir="rtl"
            :itemsSource="data"
            displayMemberPath="header"
            childItemsPath="items">
        </wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import { getData } from './data';

    new Vue({
        el: '#app',
        data: {
            data: getData()
        }
    });
</script>

<style>
    /* default trees on this sample */
    .container-fluid .wj-treeview {
        font-size: 120%;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    body {
        margin-bottom: 24pt;
    }
</style>
