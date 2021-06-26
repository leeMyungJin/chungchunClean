<template>
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="row">
                <wj-pdf-viewer serviceUrl="https://demos.componentone.com/ASPNET/c1webapi/4.5.20193.222/api/pdf"
                    filePath="PdfRoot/DefaultDocument.pdf"
                    :viewMode="viewMode" :mouseMode="mouseMode" :fullScreen="fullScreen" :zoomFactor="zoomFactor"
                    :viewModeChanged="viewModeChanged" :fullScreenChanged="fullScreenChanged" :zoomFactorChanged="zoomFactorChanged">
                </wj-pdf-viewer>
            </div>
            <br />
            <div class="row">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="continuousViewMode" />
                                    Continuous View Mode
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <wj-menu
                                :value="mouseMode"
                                :header="'Mouse Mode'"
                                :itemClicked="mouseModeChanged">
                                <wj-menu-item :value="mouseModes.SelectTool">
                                    SelectTool
                                </wj-menu-item>
                                <wj-menu-item :value="mouseModes.MoveTool">
                                    MoveTool
                                </wj-menu-item>
                                <wj-menu-item :value="mouseModes.RubberbandTool">
                                    RubberbandTool
                                </wj-menu-item>
                                <wj-menu-item :value="mouseModes.MagnifierTool">
                                    MagnifierTool
                                </wj-menu-item>
                            </wj-menu>
                        </div>
                        <div class="col-md-2">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="fullScreen" /> Full Screen
                                </label>
                            </div>
                        </div>
                        <div class="col-mod-4">
                            <label class="col-md-2 control-label">Zoom Factor</label>
                            <div class="col-md-2">
                                <wj-input-number :value="zoomFactor" :min=0.05 :max=10 :step=0.1 format="n2" :valueChanged="zoomFactorValueChanged">
                                </wj-input-number>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as viewer from '@grapecity/wijmo.viewer';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.viewer';
    //
    new Vue({
        el: '#app',
        data: {
            viewMode: viewer.ViewMode.Single,
            mouseMode: viewer.MouseMode.SelectTool,
            fullScreen: false,
            zoomFactor: 1,
            mouseModes: viewer.MouseMode
        },
        computed: {
            continuousViewMode: {
                get() {
                    return this.viewMode;
                },
                set(value) {
                    this.viewMode = value ? viewer.ViewMode.Continuous : viewer.ViewMode.Single;
                }
            }
        },
        methods: {
            viewModeChanged(sender) {
                this.viewMode = sender.viewMode;
            },
            mouseModeChanged(sender) {
                if (sender.selectedItem) {
                    this.mouseMode = sender.selectedItem.value;
                }
            },
            fullScreenChanged(sender) {
                this.fullScreen = sender.fullScreen;
            },
            zoomFactorChanged(sender) {
                this.zoomFactor = sender.zoomFactor;
            },
            zoomFactorValueChanged(sender) {
                this.zoomFactor = sender.value;
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-viewer {
        width: 100%;
        display: block;
    }
</style>