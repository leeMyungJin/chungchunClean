<template>
    <div class="container-fluid">
        <label>
            Layout option:
            <wj-combo-box 
                :itemsSource="layoutDefs"
                :displayMemberPath="'name'"
                v-model="currentLayout" />
        </label>
        <p>{{ currentLayout.descriptions.main }}</p>
        <label>Transposed MultiRow</label>
        <p>{{ currentLayout.descriptions.transposedView }}</p>
        <wj-transposed-multi-row
            :itemsSource="orders"
            :layoutDefinition="currentLayout.def"
            :initialized="gridInitialized" />
        <div>
            <button @click="exportToExcel" class="btn btn-default">
                Export To Excel
            </button>
            <button @click="exportToPdf" class="btn btn-default">
                Export To PDF
            </button>
        </div>
        <label>Ordinary MultiRow</label>
        <p>{{ currentLayout.descriptions.ordinaryView }}</p>
        <wj-multi-row
            :itemsSource="orders"
            :layoutDefinition="currentLayout.def" />
    </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.grid.multirow';
import '@grapecity/wijmo.vue2.grid.transposedmultirow';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { getData } from './data';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            orders: null,
            layoutDefs: null,
            currentLayout: null
        };
    },
    created: function() {
        let appData = getData();
        this.orders = appData.orders;
        this.layoutDefs = appData.layoutDefs;
        this.currentLayout = appData.layoutDefs.currentItem;
    },
    methods: {
        gridInitialized: function (ctl) {
            this.trnMultirow = ctl;
        },
        exportToExcel: function() {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.trnMultirow, { 
                includeRowHeaders: true
            }, 'FlexGrid.xlsx');
        },
        exportToPdf: function() {
            wjGridPdf.FlexGridPdfConverter.export(this.trnMultirow, 'FlexGrid.pdf', {
                documentOptions: {
                    pageSettings: {
                        layout: wjPdf.PdfPageOrientation.Landscape
                    }
                },
                scaleMode: wjGridPdf.ScaleMode.ActualSize
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-transposed-multirow {
    height: 300px;
    margin: 6px 0;
}

.wj-multirow {
    height: 400px;
    margin: 6px 0;
}
</style>