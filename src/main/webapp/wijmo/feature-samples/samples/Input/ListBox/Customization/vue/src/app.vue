<template>
    <div class="container-fluid">
        <div class="row">
            <p>
                This ListBox uses a <b>formatItem</b> event to customize the display 
                of the items in the list.
            </p>
        </div>
        <div class="row">
            <div class="col-xs-4">
                <wj-list-box :itemsSource="glyphs" :selectedIndexChanged="onSelectedIndexChanged">
                    <wj-item-template v-slot="ctx">
                        <!--
                            ctx.item - item in itemsSource of ListBox control
                            ctx.itemIndex - index of item in itemsSource of ListBox control
                            ctx.control - ListBox controll
                        -->
                        <div class="wj-glyph">
                            <span :class="'wj-glyph-' + ctx.item"></span>
                        </div>
                        {{ ctx.item }}
                    </wj-item-template>
                </wj-list-box>
            </div>
            <div class="col-xs-8">
                <h1>
                    <span v-bind:class="'wj-glyph-'+ selectedItem"></span>
                </h1>
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

    new Vue({
        el: '#app',
        data: {
            glyphs: ['asterisk', 'calendar', 'check', 'circle', 'clock', 'diamond', 'down',
                'down-left', 'down-right', 'file', 'filter', 'left', 'minus', 'pencil', 'plus', 'right',
                'square', 'step-backward', 'step-forward', 'up', 'up-left', 'up-right'],
            selectedItem: 'asterisk'
        },
        methods: {
            onSelectedIndexChanged(sender) {
                this.selectedItem = sender.selectedValue;
            },
        },
    });
</script>

<style>
    .container-fluid .wj-listbox {
        max-height: 150px;
    }

    .container-fluid .wj-listbox .wj-glyph {
        display: inline-block;
        width: 2em;
        text-align: center;
    }

    .container-fluid .wj-listbox .wj-listbox-item:not(.wj-state-selected) .wj-glyph {
        color: navy;
    }

    body {
        margin-bottom: 24pt;
    }
</style>