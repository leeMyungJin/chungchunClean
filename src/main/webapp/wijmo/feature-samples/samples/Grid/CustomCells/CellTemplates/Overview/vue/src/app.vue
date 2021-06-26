<template>
<div class="container-fluid">
    <p>
        Use a <b>wj-flex-grid-cell-template</b> element to define a cell template.
        The content of the <b>wj-flex-grid-cell-template</b> element defines the cell content.
        The <b>cellType</b> property specifies the type of the cells represented by the template.
        Use a <b>v-slot</b> directive to define a variable that contains an object with cell 
        specific data, including the data item (<b>item</b>), row (<b>row</b>) and 
        column (<b>col</b>) that the cell represents. 
    </p>
    <p>
        Note that column-specific templates should be defined as children of 
        the corresponding <b>wj-flex-grid-column</b> component, while the others 
        are defined under the <b>wj-flex-grid</b> element.
    </p>
    <wj-flex-grid 
        :itemsSource="itemsSource"
        :allowSorting="false"
        autoSizeMode="Both"
        allowResizing="Both"
        :deferResizing="true"
        :initialized="initialized">

        <wj-flex-grid-cell-template cellType="TopLeft" v-if="customTopLeft">
            №
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="BottomLeft" v-if="customBottomLeft">
            &#931;
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="RowHeader" v-if="customRowHeader" v-slot="cell">
            {{cell.row.index + 1}}
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="RowHeaderEdit" v-if="customRowHeaderEdit">
            ...
        </wj-flex-grid-cell-template>

        <wj-flex-grid-column header="Country" binding="country" width="*">
            <wj-flex-grid-cell-template cellType="Cell" v-if="customCell" v-slot="cell">   
                <img :src="'resources/' + cell.item.country + '.png'" />                        
                {{cell.item.country}}
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="CellEdit" v-if="customCellEdit" v-slot="cell">
                <wj-combo-box
                    :itemsSource="countries" class="cell-editor"
                    :selectedValue.sync="cell.value"
                    :isEditable="false">
                </wj-combo-box>
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="GroupHeader" v-if="customGroupHeader" v-slot="cell">
                <input type="checkbox" v-model="cell.row.isCollapsed" />
                {{cell.item.name}} ({{cell.item.items.length}} items)
            </wj-flex-grid-cell-template>
        </wj-flex-grid-column>

        <wj-flex-grid-column header="Downloads" binding="downloads" :width="170" aggregate="Sum">
            <wj-flex-grid-cell-template cellType="ColumnHeader" v-if="customColumnHeader">
                <input type="checkbox" v-model="highlightDownloads" />
                Downloads
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="Cell" v-if="customCell" v-slot="cell">
                <span :style="{color: highlightDownloads? (cell.item.downloads>10000 ?'green':'red'):''}"
                    style="font-weight:700">
                    {{cell.item.downloads}}
                </span>
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="CellEdit" v-if="customCellEdit" v-slot="cell">
                <wj-input-number class="cell-editor"
                    v-model="cell.value"
                    :step="1"></wj-input-number>
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="Group" v-if="customGroup" v-slot="cell">
                Sum = {{formatNumber(cell.value, 'N0')}}
            </wj-flex-grid-cell-template>
            <wj-flex-grid-cell-template cellType="ColumnFooter" v-if="customColumnFooter" v-slot="cell">
                Sum = {{formatNumber(cell.value, 'N0')}}
            </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
    </wj-flex-grid>

    <div class="checkbox-list">
        <div class="checkbox-list-title">Column level templates:</div>
        <div class="checkbox-cell">
            <label class="checkbox">
                <input type="checkbox" v-model="customCell" /> Cell
            </label>
            <label class="checkbox">
                <input type="checkbox" v-model="customCellEdit" /> CellEdit
            </label>
        </div>
        <div class="checkbox-cell">
            <label class="checkbox">
                <input type="checkbox" v-model="customColumnHeader" /> ColumnHeader
            </label>
            <label class="checkbox">
                <input type="checkbox" v-model="customColumnFooter" /> ColumnFooter
            </label>
        </div>
        <div class="checkbox-cell">
            <label class="checkbox">
                <input type="checkbox" v-model="customGroupHeader" /> GroupHeader
            </label>
            <label class="checkbox">
                <input type="checkbox" v-model="customGroup" /> Group
            </label>
        </div>

        <div class="checkbox-list-title">Grid level templates:</div>
        <div class="checkbox-cell">
            <label class="checkbox">
                <input type="checkbox" v-model="customTopLeft" /> TopLeft
            </label>
            <label class="checkbox">
                <input type="checkbox" v-model="customBottomLeft" /> BottomLeft
            </label>
        </div>
        <div class="checkbox-cell">
            <label class="checkbox">
                <input type="checkbox" v-model="customRowHeader" /> RowHeader
            </label>
            <label class="checkbox">
                <input type="checkbox" v-model="customRowHeaderEdit" /> RowHeaderEdit
            </label>
        </div>
    </div>
</div>    
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";

import Vue from "vue";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid";
import * as dataService from './data';

let App = Vue.extend({
    name: "app",
    data: function () {
        return {
            itemsSource: dataService.getCv(dataService.getData()),
            countries: dataService.getCountries(),
            customTopLeft: true,
            customBottomLeft: true,
            customRowHeader: true,
            customRowHeaderEdit: true,
            customCell: true,
            customCellEdit: true,
            customGroupHeader: true,
            customColumnHeader: true,
            customGroup: true,
            customColumnFooter: true,
            highlightDownloads: true
        }
    },
    methods: {
        initialized: function(grid, e) {
            grid.columnFooters.rows.push(new wjcGrid.GroupRow());
        },
        formatNumber: function(value, format) {
            return wjcCore.Globalize.formatNumber(value, format);
        }
    },
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }

    .checkbox-list {
        padding: 0 20px;
    }

    .checkbox-cell {
        display: table-cell; 
        padding-right: 50px;
    }

    .checkbox-list .checkbox {
        margin: 10px 0 0 0;
    }

    .checkbox-list-title {
        font-size: 18px;
        margin: 10px 0px 2px -20px;
    }

    .wj-flexgrid {
        max-height: 350px;
        max-width: 600px;
        margin: 10px 0;
    }

    .wj-cell .cell-editor {
        position: absolute; 
        left: 0px;
        width: 100%; 
        border-radius: 0px;
        margin: -4px 0 -3px 0;
    }
</style>