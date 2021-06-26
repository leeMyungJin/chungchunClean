<template>
    <div class='container-fluid'>
        <div class="row">
            <div class="col-sm-12">
                <wj-menu header="NumPoints" :value="numberOfPoints" :itemClicked="numPointsChanged">
                    <wj-menu-item :value="1000">1K</wj-menu-item>
                    <wj-menu-item :value="10000">10K</wj-menu-item>
                    <wj-menu-item :value="100000">100K</wj-menu-item>
                    <wj-menu-item :value="200000">200K</wj-menu-item>
                    <wj-menu-item :value="500000">500K</wj-menu-item>
                </wj-menu>

                <wj-menu header="NumSeries" :value="numberOfSeries" :itemClicked="numSeriesChanged">
                    <wj-menu-item :value="1">1</wj-menu-item>
                    <wj-menu-item :value="2">2</wj-menu-item>
                    <wj-menu-item :value="4">4</wj-menu-item>
                    <wj-menu-item :value="8">8</wj-menu-item>
                </wj-menu>

                <wj-menu header="Symbol" :value="seriesSymbol" :itemClicked="symbolChanged">
                    <wj-menu-item :value="'Dot'">Dot</wj-menu-item>
                    <wj-menu-item :value="'Box'">Box</wj-menu-item>
                </wj-menu>

                <wj-menu header="Size" :value="symbolSize" :itemClicked="sizeChanged">
                    <wj-menu-item :value="3">3</wj-menu-item>
                    <wj-menu-item :value="5">5</wj-menu-item>
                    <wj-menu-item :value="10">10</wj-menu-item>
                    <wj-menu-item :value="20">20</wj-menu-item>
                    <wj-menu-item :value="50">50</wj-menu-item>
                </wj-menu>

                <label>
                    Use WebGL
                    <input id="webgl" type="checkbox" v-model="useWebGL" />
                </label>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <wj-flex-chart :renderEngine="renderEngine" chartType="Scatter"
                               bindingX="x" binding="y" :symbolSize="symbolSize">
                    <wj-flex-chart-axis wjProperty="axisX" :min="-2" :max="2" />
                    <wj-flex-chart-axis wjProperty="axisY" :min="-2" :max="2"
                                        :axisLine="true" :majorGrid="false" />
                    <wj-flex-chart-gestures interactiveAxes="XY" mouseAction="Zoom"
                                            :initialized="gesturesInitialized"
                                            :scaleY="1" :posY="0.5" :scaleX="1" :posX="0.5" />
                    <wj-flex-chart-series v-for="(series, i) in data" :itemsSource="series"
                                          :name="'ser ' + (i + 1)" :symbolStyle = "{strokeWidth: 0}"
                                          :symbolMarker="seriesSymbol" />
                </wj-flex-chart>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <button id="btnNew" @click="refreshData">Refresh Data</button>
                <button id="btnReset" @click="resetZoom">Reset Zoom</button>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';

    import "@grapecity/wijmo.vue2.input";
    import "@grapecity/wijmo.vue2.chart";
    import "@grapecity/wijmo.vue2.chart.interaction";
    import * as wjChart from "@grapecity/wijmo.chart";
    import { WebGLRenderEngine } from '@grapecity/wijmo.chart.webgl';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                numberOfPoints: 100000,
                numberOfSeries: 1,
                seriesSymbol: 'Dot',
                symbolSize: 3,
                useWebGL: true,
                data: [],
            };
        },
        created() {
            this.webglEng = new WebGLRenderEngine();
            this.svgEng = new wjChart.SvgRenderEngine();
        },
        mounted() {
            this.refreshData();
        },
        computed: {
            renderEngine: function () {
                return this.useWebGL ? this.webglEng : this.svgEng;
            }
        },
        methods: {
            numPointsChanged: function (s) {
                this.numberOfPoints = s.selectedValue;
                this.refreshData();
            },
            numSeriesChanged: function (s) {
                this.numberOfSeries = s.selectedValue;
                this.refreshData();
            },
            symbolChanged: function (s) {
                this.seriesSymbol = s.selectedValue;
            },
            sizeChanged: function (s) {
                this.symbolSize = s.selectedValue;
            },
            refreshData: function () {
                const data = [];
                const nser = this.numberOfSeries;
                const npts = this.numberOfPoints;
                for (let i = 0; i < nser; i++) {
                    data.push(getData(Math.random() - 0.5, Math.random() - 0.5, npts / nser, 0.5 * (1 - i / nser)));
                }
                this.data = data;
            },
            gesturesInitialized: function (s) {
                this.gestures = s;
            },
            resetZoom: function() {
                this.gestures.reset();
            }
        },
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexchart {
        width: 600px;
        height: 500px !important;
        margin: 0;
    }
</style>
