<template>
    <div class="container-fluid">
        <wj-tab-panel>
            <wj-tab v-for="(tab, index) in tabsInfo" :key="index">
                <a>{{ tab.header }}</a>
                <div>
                    <wj-flex-grid :isReadOnly="true" :itemsSource="tab.data">
                    </wj-flex-grid>
                </div>
            </wj-tab>
        </wj-tab-panel>
    </div>
</template>

<script>
    import Vue from "vue";
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjOdata from '@grapecity/wijmo.odata';
    import '@grapecity/wijmo.vue2.grid';

    let App = Vue.extend({
        name: "app",
        data: () =>  {
            return {
                tabsInfo: [],
            };
        },
        mounted() {
            const headers = 'Employees,Categories,Products,Customers'.split(',');
            const url = 'https://services.odata.org/Northwind/Northwind.svc/';
            this.tabsInfo = [];
            headers.forEach((header) => {
            this.tabsInfo.push({
                header: header,
                data: new wjOdata.ODataCollectionView(url, header, {sortOnServer: false}),
            });
            })
        },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-tabpanes {
        padding: 12px 0;
    }
</style>
