<template>
    <div class="container-fluid">
        <label>
            Custom Headers:
            <input
                type="checkbox"
                checked @click="checkboxClicked($event)"/>
        </label> 
        <wj-multi-row
            :itemsSource="data"
            :layoutDefinition="layout"
            :headerLayoutDefinition="headerLayout"
        ></wj-multi-row>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";

    import "@grapecity/wijmo.vue2.grid.multirow";
    import { getData, getLayoutDefinition, getHeaderLayoutDefinition } from './data';

    let App = Vue.extend({
        name: "app",
        data: function() {
            let customHeaderLayout = getHeaderLayoutDefinition();
            return {
                data: getData(),
                layout: getLayoutDefinition(),
                headerLayout: customHeaderLayout,
                customHeaderLayout: customHeaderLayout
            }
        },
        methods: {
            checkboxClicked: function (event) {
                this.headerLayout = event.target.checked ? this.customHeaderLayout : null;
            }
        },
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-multirow {
        height: 400px;
        margin: 6px 0;
    }
</style>