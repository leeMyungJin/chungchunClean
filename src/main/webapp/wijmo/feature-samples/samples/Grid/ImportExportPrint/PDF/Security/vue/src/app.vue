<template>
    <div class="container-fluid">
        <div class="panel panel-default">
            <div class="panel-heading">
                Security settings
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-3">
                        <input type="text" class="form-control" placeholder="User password" v-model="opts.userPassword" />
                    </div>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" placeholder="Owner password" v-model="opts.ownerPassword" />
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-3">
                        <wj-menu :value="opts.version" :header="'PDF version'" :itemClicked="versionChanged">
                            <wj-menu-item :value="PdfVersionEnum.v1_3">1.3</wj-menu-item>
                            <wj-menu-item :value="PdfVersionEnum.v1_4">1.4</wj-menu-item>
                            <wj-menu-item :value="PdfVersionEnum.v1_5">1.5</wj-menu-item>
                            <wj-menu-item :value="PdfVersionEnum.v1_6">1.6</wj-menu-item>
                            <wj-menu-item :value="PdfVersionEnum.v1_7">1.7</wj-menu-item>
                            <wj-menu-item :value="PdfVersionEnum.v1_7Ext3">1.7 ExtensionLevel 3</wj-menu-item>
                        </wj-menu>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col">
                        <b>Permissions</b> (require owner password)
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="opts.permissions.annotating" />Annotating
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="opts.permissions.contentAccessibility" />ContentAccessibility
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="opts.permissions.copying" />Copying
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="opts.permissions.documentAssembly" />DocumentAssembly
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="opts.permissions.fillingForms" />FillingForms
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="opts.permissions.modifying" />Modifying
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2">Printing</div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="radio-inline">
                            <input name="printing" type="radio"
                                :value="PdfPrintPermissionEnum.NotAllowed"
                                v-model="opts.permissions.printing" checked />NotAllowed
                        </label>
                        <label class="radio-inline">
                            <input name="printing" type="radio"
                                :value="PdfPrintPermissionEnum.AllowLowResolution"
                                v-model="opts.permissions.printing" />AllowLowResolution
                        </label>
                        <label class="radio-inline">
                            <input name="printing" type="radio"
                                :value="PdfPrintPermissionEnum.AllowHighResolution"
                                v-model="opts.permissions.printing" />AllowHighResolution
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Export button -->
        <button class="btn btn-default" @click="exportPdf">Export</button>

        <!-- FlexGrid -->
        <wj-flex-grid class="grid" :autoGenerateColumns=false selectionMode="ListBox" headersVisibility="All"
            :itemsSource="data" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    //
    import Vue from 'vue';
    import { PdfVersion, PdfPrintPermission } from '@grapecity/wijmo.pdf';
    import { FlexGridPdfConverter } from '@grapecity/wijmo.grid.pdf';
    import '@grapecity/wijmo.pdf.security';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            PdfVersionEnum: PdfVersion,
            PdfPrintPermissionEnum: PdfPrintPermission,
            data: getData(10),
            opts: {
                userPassword: undefined,
                ownerPassword: undefined,
                version: PdfVersion.v1_3,
                permissions: {
                    annotating: false,
                    contentAccessibility: false,
                    copying: false,
                    documentAssembly: false,
                    fillingForms: false,
                    modifying: false,
                    printing: PdfPrintPermission.NotAllowed
                }
            }
        },
        methods: {
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            exportPdf() {
                let p = this.opts.permissions,
                    settings = {
                        documentOptions: {
                            userPassword: this.opts.userPassword,
                            ownerPassword: this.opts.ownerPassword,
                            version: this.opts.version,
                            permissions: {
                                annotating: p.annotating,
                                contentAccessibility: p.contentAccessibility,
                                copying: p.copying,
                                documentAssembly: p.documentAssembly,
                                fillingForms: p.fillingForms,
                                modifying: p.modifying,
                                printing: p.printing
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
                    };
                //
                FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', settings);
            },
            versionChanged(sender) {
                if (sender.selectedValue) {
                    this.opts.version = sender.selectedValue;
                }
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