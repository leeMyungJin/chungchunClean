<template>
    <div class="container-fluid">
        <!-- Export settings -->
        <div class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        Export Settings
                    </h4>
                </div>
                <div class="panel-body">
                    <ul class="list-inline">
                        <li>
                            <wj-menu
                                :value="scaleMode"
                                :header="'Scale mode'"
                                :itemClicked="selectScaleMode">
                                <wj-menu-item :value="ScaleModeEnum.ActualSize">ActualSize</wj-menu-item>
                                <wj-menu-item :value="ScaleModeEnum.PageWidth">PageWidth</wj-menu-item>
                                <wj-menu-item :value="ScaleModeEnum.SinglePage">SinglePage</wj-menu-item>
                            </wj-menu>
                        </li>
                        <li>
                            <wj-menu
                                :value="orientation"
                                :header="'Orientation'"
                                :itemClicked="selectOrientation">
                                <wj-menu-item :value="PdfPageOrientationEnum.Portrait">Portrait</wj-menu-item>
                                <wj-menu-item :value="PdfPageOrientationEnum.Landscape">Landscape</wj-menu-item>
                            </wj-menu>
                        </li>
                        <li>
                            <wj-menu
                                :value="exportMode"
                                :header="'Export mode'"
                                :itemClicked="selectExportMode">
                                <wj-menu-item :value="ExportModeEnum.All">All</wj-menu-item>
                                <wj-menu-item :value="ExportModeEnum.Selection">Selection</wj-menu-item>
                            </wj-menu>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>

        <!-- FlexGrid -->
        <wj-flex-grid
            class="grid"
            :autoGenerateColumns=false
            selectionMode="ListBox"
            headersVisibility="All"
            :itemsSource="data"
            :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Amount" binding="amount" format="c" aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="Color" binding="color"></wj-flex-grid-column>
            <wj-flex-grid-column header="Pending" binding="amount2" format="c2"></wj-flex-grid-column>
            <wj-flex-grid-column header="Discount" binding="discount" format="p1"></wj-flex-grid-column>
            <wj-flex-grid-column header="Active" binding="active"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getData } from './data';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';
    import * as wijmo from '@grapecity/wijmo';
    import * as grid from '@grapecity/wijmo.grid';
    import * as pdf from '@grapecity/wijmo.pdf';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';

    new Vue({
        el: '#app',
        data: {
            data: getData(25),
            // Reference enumerations to use them in markup.
            ScaleModeEnum: gridPdf.ScaleMode,
            ExportModeEnum: gridPdf.ExportMode,
            OrientationEnum: gridPdf.PdfPageOrientation,
            selectedOrientation: 'PdfPageOrientationEnum.Portrait',
            PdfPageOrientationEnum : pdf.PdfPageOrientation,
            scaleMode : gridPdf.ScaleMode.ActualSize,
            exportMode : gridPdf.ExportMode.All,
            orientation: pdf.PdfPageOrientation.Portrait
        },
        methods:{
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            selectScaleMode(e) {
                if (e.selectedValue) {
                    this.scaleMode =  e.selectedValue - 1;
                }
            },
            selectOrientation(e) {
                if (e.selectedValue) {
                    this.orientation = e.selectedValue - 1;
                }
            },
            selectExportMode(e) {
                if (e.selectedValue) {
                    this.exportMode = e.selectedValue - 1;
                }
            },
            exportPDF() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
                    maxPages: 10,
                    exportMode: this.exportMode,
                    scaleMode: this.scaleMode,
                    documentOptions: {
                        pageSettings: {
                            layout: this.orientation
                        },
                        header: {
                            declarative: {
                                text: '\t&[Page]\\&[Pages]'
                            }
                        },
                        footer: {
                            declarative: {
                                text: '\t&[Page]\\&[Pages]'
                            }
                        }
                    },
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
                });
            },
            _applyGroupBy(flexGrid) {
                let groupNames = ['Product', 'Country', 'Amount'];
                //
                // get the collection view, start update
                let cv = flexGrid.collectionView;
                cv.beginUpdate();
                //
                // clear existing groups
                cv.groupDescriptions.clear();
                //
                // add new groups
                for (let i = 0; i < groupNames.length; i++) {
                    let propName = groupNames[i].toLowerCase();
                    //
                    if (propName == 'amount') {
                        // group amounts in ranges
                        // (could use the mapping function to group countries into continents, 
                        // names into initials, etc)
                        let groupDesc = new wijmo.PropertyGroupDescription(propName, (item, prop) => {
                            let value = item[prop];
                            if (value > 1000) return 'Large Amounts';
                            if (value > 100) return 'Medium Amounts';
                            if (value > 0) return 'Small Amounts';
                            return 'Negative';
                        });
                        //
                        cv.groupDescriptions.push(groupDesc);
                    } else {
                        if (propName) {
                            // group other properties by their specific values
                            let groupDesc = new wijmo.PropertyGroupDescription(propName);
                            cv.groupDescriptions.push(groupDesc);
                        }
                    }
                }
                //
                // done updating
                cv.endUpdate();
            }
        },
        mounted: function(){
            if (this.flexGrid) {
                this._applyGroupBy(this.flexGrid);
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .grid {
        margin-top: 20px;
        height: 300px;
    }
</style>