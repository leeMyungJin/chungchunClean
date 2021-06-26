<template>
    <div class="container-fluid">
        <p>
            Use the <b>v-wj-context-menu</b> attribute directive to make <b>wj-menu</b>
            a context menu of an arbitrary HTML element or a component.
        </p>
        <p>
            The context menu component can be specified using a Vue <i>ref</i>, 
            an element <i>id</i>, an element or a Menu control instance.
        </p>

        <div class="owners">
            <div id="first" v-wjContextMenu="$refs.ctxMenu" style="background:#f0a0c9" tabindex="0">
                I have the same Context Menu (bound by Vue ref).
            </div>
            <div id="second" v-wjContextMenu="'ctxMenuId'" style="background:#f0a0a0" tabindex="0">
                I have a Context Menu (bound by id attribute).
            </div>
            <div id="third" v-wjContextMenu="ctxMenuEl" style="background:#a0f0a0" tabindex="0">
                I have the same Context Menu (bound by html element).
            </div>
            <div id="fourth" v-wjContextMenu="ctxMenuControl" style="background:#a0aef0" tabindex="0">
                I have the same Context Menu (bound by wijmo menu control).
            </div>
        </div>

        <h4>The same approach works with all Wijmo controls:</h4>

        <p>
            FlexChart with ContextMenu
        </p>
        <wj-flex-chart 
                id="FlexChart" 
                v-wjContextMenu="$refs.ctxMenu"
                :itemsSource="data" 
                bindingX="country">
            <wj-flex-chart-series binding="sales" name="Sales" />
            <wj-flex-chart-series binding="expenses" name="Expenses" />
        </wj-flex-chart>

        <p>
            FlexGrid with ContextMenu
        </p>
        <wj-flex-grid 
            id="FlexGrid" 
            v-wjContextMenu="'ctxMenuId'"
            :itemsSource="data">
        </wj-flex-grid>

        <!-- Menu -->
        <wj-menu
            id="ctxMenuId"
            ref="ctxMenu"
            selectedValuePath="cmd"
            style="display:none"
            header="Context Menu"
            dropDownCssClass="ctx-menu"
            :itemClicked="menuItemClicked"
            :initialized="menuInitialized">
            <wj-menu-item cmd="cmdNew">
                <span class="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;New
            </wj-menu-item>
            <wj-menu-item cmd="cmdOpen">
                <span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Open
            </wj-menu-item>
            <wj-menu-item cmd="cmdSave">
                <span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;Save
            </wj-menu-item>
            <wj-menu-separator />
            <wj-menu-item cmd="cmdExit">
                <span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Exit
            </wj-menu-item>
        </wj-menu>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { Control } from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                data: getData(),
                ctxMenuEl: null,
                ctxMenuControl: null,
            }
        },
        methods: {
            menuItemClicked: function(menu) {
                alert('Executing **' + menu.selectedValue + '** for element **' + menu.owner.id + '**');
            },
            menuInitialized: function(menu) {
                this.ctxMenuControl = menu;
            }
        },
        mounted() {
            this.ctxMenuEl = document.getElementById('ctxMenuId');
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .owners:after {
        content: "";
        clear: both;
        display: block;
    }

    .owners > div {
        float: left;
        margin: 20px;
        padding: 20px;
    }

    .container-fluid .wj-flexgrid {
        max-height: 250px;
    }

    .container-fluid .wj-flexchart {
        max-height: 250px;
    }

    .wj-content.ctx-menu {
        padding: 3px;
        min-width: 120px;
        background: #FFFBDD;
        overflow: hidden;
    }

    .ctx-menu .wj-listbox-item {
        text-align: center;
        margin: 6px;
    }

    #customDetail .glyphicon {
        font-size: 1.25em;
        margin-right: 0.5em;
        cursor: pointer;
        color: gray;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
