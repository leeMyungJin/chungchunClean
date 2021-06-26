<template>
    <div class="container-fluid">
      <wj-tab-panel :selectedIndex="1" :selectedIndexChanged="selectedIndexChanged">
            <wj-tab>
                <a>Africa</a>
                <div></div>
            </wj-tab>
            <wj-tab>
                <a>America</a>
                <div></div>
            </wj-tab>
            <wj-tab>
                <a>Asia</a>
                <div></div>
            </wj-tab>
            <wj-tab>
                <a>Europe</a>
                <div></div>
            </wj-tab>
            <wj-tab>
                <a>Oceania</a>
                <div></div>
            </wj-tab>
        </wj-tab-panel>
        <div class="panel panel-success">
            <!-- separate div to show the content -->
            <div class="panel-heading">
                <h3 id="detachedContent" class="panel-title" v-html="selectedTabContent"></h3>
            </div>
        </div>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from "vue";
    import '@grapecity/wijmo.vue2.nav';

    let App = Vue.extend({
        name: "app",
        data: () => ({
            selectedTabContent: '',
        }),
        methods: {
            selectedIndexChanged(control) {
                this.selectedTabContent = `Content for tab <b>${control.selectedTab.header.textContent}</b>...`;
            }
        },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-tabpanes {
        padding: 12px 0;
    }
</style>
