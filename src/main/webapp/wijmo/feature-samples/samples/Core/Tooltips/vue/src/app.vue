<template>
    <div class="container-fluid">
        <p>
            This paragraph has a <b v-wjTooltip="'This is the <b>first</b> span.'">span with a tooltip</b>.
        </p>
        <p>
            This paragraph has a <b v-wjTooltip="'#spanTooltip'">span with a tooltip</b> whose
            content is taken from another element.
        </p>
        <p>
            The button below also has a tooltip:
        </p>
        <button class="btn btn-default"
                v-wjTooltip="{tooltip: 'This tooltip appears on the right of the button.', position: 'Right'}">
            Button
        </button>

        <div id="spanTooltip" style="display:none">
            <div class="panel panel-info">
                <div class="panel-heading">
                    Title
                </div>
                <div class="panel-body">
                    This is the second span.
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import '@grapecity/wijmo.vue2.core';

    let App = Vue.extend({
        name: "app",
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>


<style>
    body {
        margin-bottom: 3em;
    }
</style>
