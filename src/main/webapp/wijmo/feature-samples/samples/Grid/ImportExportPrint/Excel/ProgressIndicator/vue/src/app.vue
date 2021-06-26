<template>
    <div class="container-fluid">
        <wj-flex-grid class="grid" :autoGenerateColumns=false
            :itemsSource="data" :initialized="gridInitialized">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Amount" binding="amount" format="c"></wj-flex-grid-column>
            <wj-flex-grid-column header="Pending" binding="amount2" format="c2"></wj-flex-grid-column>
            <wj-flex-grid-column header="Discount" binding="discount" format="p1"></wj-flex-grid-column>
            <wj-flex-grid-column header="Active" binding="active"></wj-flex-grid-column>
        </wj-flex-grid>

        <div class="row ">
            <div class="col-md-6 col-xs-12 well well-sm">
                <wj-linear-gauge :isReadOnly=true :min=0 :max=100 :value=0 :showText="'Value'" :initialized="progressBarInitialized">
                </wj-linear-gauge>
                <button class="btn btn-default" @click="exportXlsx()">Export</button>
                <button class="btn btn-default" @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as gridXlsx from '@grapecity/wijmo.grid.xlsx';
    import { getData } from './data';
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.gauge';

    new Vue({
        el: '#app',
        data: {
            data: getData(5000)
        },
        methods: {
            gridInitialized(ctl) {
                this.flexGrid = ctl;
            },
            progressBarInitialized(ctl) {
                this.progressBar = ctl;
            },
            exportXlsx() {
                gridXlsx.FlexGridXlsxConverter.saveAsync(this.flexGrid, {}, 
                    'FlexGrid.xlsx', null, null, 
                    progress => this.progressBar.value = progress,
                    true);
            },
            cancel() {
                gridXlsx.FlexGridXlsxConverter.cancelAsync(() => this.progressBar.value = 0);
            }
        }
    });
</script>

<style>
    .wj-flexgrid {
        height: 400px;
        margin: 6px 0;
    }

    .wj-gauge {
        margin: 20px auto;
    }
</style>