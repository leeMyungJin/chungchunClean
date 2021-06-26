<template>
    <div class="container-fluid">
        <wj-tree-view :itemsSource="data" displayMemberPath="header"
            childItemsPath="items" :initialized="onTreeViewInitialized">
        </wj-tree-view>
        <wj-menu
            :itemClicked="menuItemClick"
            :initialized="onMenuInitialized"
            style="display: none">
            <wj-menu-item value="option1">Option 1</wj-menu-item>
            <wj-menu-item value="option2">Option 2</wj-menu-item>
            <wj-menu-separator></wj-menu-separator>
            <wj-menu-item value="option3">Option 3</wj-menu-item>
            <wj-menu-item value="option4">Option 4</wj-menu-item>
        </wj-menu>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.nav';
    import { getData } from './data';

    new Vue({
        el: '#app',
        data: {
            data: getData()
        },
        methods: {
            onTreeViewInitialized(sender) {
                sender.hostElement.addEventListener('contextmenu', e => {
                    e.preventDefault();
                    if (this.menu) {
                        this.menu.show(e);
                    }
                });
            },
            onMenuInitialized(sender) {
                this.menu = sender;
            },
            menuItemClick() {
                alert('thanks for selecting ' + this.menu.selectedValue);
            }
        }
    });
</script>

<style>
    /* context menu */
    .wj-dropdown-panel.wj-listbox {
        padding: 6px 12px;
    }

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
