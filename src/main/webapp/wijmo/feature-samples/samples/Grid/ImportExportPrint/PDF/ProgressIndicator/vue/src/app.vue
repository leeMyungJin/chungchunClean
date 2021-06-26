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
                <button class="btn btn-default" @click="exportPdf()">Export</button>
                <button class="btn btn-default" @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as pdf from '@grapecity/wijmo.pdf';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';
    import { getData } from './data';
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.gauge';

    new Vue({
        el: '#app',
        data: {
            data: getData(3000),
            worker: null
        },
        methods: {
            gridInitialized(ctl) {
                this.flexGrid = ctl;
            },
            progressBarInitialized(ctl) {
                this.progressBar = ctl;
            },
            exportPdf() {
                this.cancel();
                //
                this.worker = this.loadWorker('./export-grid.js', () => {
                    gridPdf.PdfWebWorkerClient.exportGrid(this.worker, this.flexGrid, 'FlexGrid.pdf',
                        {
                            scaleMode: gridPdf.ScaleMode.PageWidth,
                            styles: {
                                cellStyle: {
                                    backgroundColor: '#ffffff',
                                    borderColor: '#c6c6c6'
                                },
                                altCellStyle: {
                                    backgroundColor: '#f9f9f9'
                                },
                                groupCellStyle: {
                                    backgroundColor: '#dddddd'
                                },
                                headerCellStyle: {
                                    backgroundColor: '#eaeaea'
                                }
                            }
                        },
                        null,
                        progress => this.progressBar.value = progress * 100
                    );
                });
            },
            cancel() {
                if (this.worker) {
                    this.worker.terminate();
                }
                this.progressBar.value = 0;
            },
            //
            // Creates web worker that executes the module from the specified URL.
            loadWorker(url, ready) {
                let worker = new Worker('src/workers/worker-loader.js');
                //
                worker.addEventListener('message', (e) => {
                    if (e.data === '#ready#') {
                        ready();
                    }
                });
                //
                worker.postMessage({ url: url });
                //
                return worker;
            }
        },
        destroyed: function() {
            if (this.worker) {
                this.worker.terminate();
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