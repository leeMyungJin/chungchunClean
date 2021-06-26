<template>
    <div class="container-fluid">
        <div class="form-group">
            <div class="container-fluid well">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <wj-menu
                            :value="chartType"
                            :header="'Chart type'"
                            :itemClicked="selectedTypeChanged">
                            <wj-menu-item value="Bar">Bar</wj-menu-item>
                            <wj-menu-item value="Column">Column</wj-menu-item>
                            <wj-menu-item value="Area">Area</wj-menu-item>
                            <wj-menu-item value="Line">Line</wj-menu-item>
                            <wj-menu-item value="LineSymbols">LineSymbols</wj-menu-item>
                            <wj-menu-item value="Spline">Spline</wj-menu-item>
                            <wj-menu-item value="SplineSymbols">SplineSymbols</wj-menu-item>
                            <wj-menu-item value="SplineArea">SplineArea</wj-menu-item>
                            <wj-menu-item value="Scatter">Scatter</wj-menu-item>
                        </wj-menu>
                        <wj-menu
                            :value="animationMode"
                            :header="'Animation mode'"
                            :itemClicked="animationModeChanged">
                            <wj-menu-item value="Point">Point</wj-menu-item>
                            <wj-menu-item value="Series">Series</wj-menu-item>
                            <wj-menu-item value="All">All</wj-menu-item>
                        </wj-menu>
                        <wj-menu
                            :value="easing"
                            :header="'Easing'"
                            :itemClicked="selectedEasingChanged">
                            <wj-menu-item value="Linear">Linear</wj-menu-item>
                            <wj-menu-item value="Swing">Swing</wj-menu-item>
                            <wj-menu-item value="EaseInQuad">EaseInQuad</wj-menu-item>
                            <wj-menu-item value="EaseOutQuad">EaseOutQuad</wj-menu-item>
                            <wj-menu-item value="EaseInOutQuad">EaseInOutQuad</wj-menu-item>
                            <wj-menu-item value="EaseInCubic">EaseInCubic</wj-menu-item>
                            <wj-menu-item value="EaseOutCubic">EaseOutCubic</wj-menu-item>
                            <wj-menu-item value="EaseInOutCubic">EaseInOutCubic</wj-menu-item>
                            <wj-menu-item value="EaseInQuart">EaseInQuart</wj-menu-item>
                            <wj-menu-item value="EaseOutQuart">EaseOutQuart</wj-menu-item>
                            <wj-menu-item value="EaseInOutQuart">EaseInOutQuart</wj-menu-item>
                            <wj-menu-item value="EaseInQuint">EaseInQuint</wj-menu-item>
                            <wj-menu-item value="EaseOutQuint">EaseOutQuint</wj-menu-item>
                            <wj-menu-item value="EaseInOutQuint">EaseInOutQuint</wj-menu-item>
                            <wj-menu-item value="EaseInSine">EaseInSine</wj-menu-item>
                            <wj-menu-item value="EaseOutSine">EaseOutSine</wj-menu-item>
                            <wj-menu-item value="EaseInOutSine">EaseInOutSine</wj-menu-item>
                            <wj-menu-item value="EaseInExpo">EaseInExpo</wj-menu-item>
                            <wj-menu-item value="EaseOutExpo">EaseOutExpo</wj-menu-item>
                            <wj-menu-item value="EaseInOutExpo">EaseInOutExpo</wj-menu-item>
                            <wj-menu-item value="EaseInCirc">EaseInCirc</wj-menu-item>
                            <wj-menu-item value="EaseOutCirc">EaseOutCirc</wj-menu-item>
                            <wj-menu-item value="EaseInOutCirc">EaseInOutCirc</wj-menu-item>
                            <wj-menu-item value="EaseInBack">EaseInBack</wj-menu-item>
                            <wj-menu-item value="EaseOutBack">EaseOutBack</wj-menu-item>
                            <wj-menu-item value="EaseInOutBack">EaseInOutBack</wj-menu-item>
                            <wj-menu-item value="EaseInBounce">EaseInBounce</wj-menu-item>
                            <wj-menu-item value="EaseOutBounce">EaseOutBounce</wj-menu-item>
                            <wj-menu-item value="EaseInOutBounce">EaseInOutBounce</wj-menu-item>
                            <wj-menu-item value="EaseInElastic">EaseInElastic</wj-menu-item>
                            <wj-menu-item value="EaseOutElastic">EaseOutElastic</wj-menu-item>
                            <wj-menu-item value="EaseInOutElastic">EaseInOutElastic</wj-menu-item>
                        </wj-menu>
                        <label>Duration</label>
                        <wj-input-number :valueChanged="valueChanged" :value=400 :min=200 :max=5000 :step=200 format="n0">
                        </wj-input-number>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-xs-12 flexchart">
                        <button id="chartResetData" type="button" class="btn btn-default" v-on:click="resetChartData">reset data</button>
                        <wj-menu header="Add" :itemClicked="itemAdd">
                            <wj-menu-item>Add Series</wj-menu-item>
                            <wj-menu-item>Add First Point</wj-menu-item>
                            <wj-menu-item>Add Last Point</wj-menu-item>
                        </wj-menu>
                        <wj-menu header="Remove" :itemClicked="itemRemove">
                            <wj-menu-item>Remove Series</wj-menu-item>
                            <wj-menu-item>Remove First Point</wj-menu-item>
                            <wj-menu-item>Remove Last Point</wj-menu-item>
                        </wj-menu>
                    </div>
                </div>
            </div>
            <wj-flex-chart
                    :itemsSource="data"
                    :legendToggle="true"
                    :chartType="chartType"
                    bindingX="x"
                    :initialized="initializeChart">
                <wj-flex-chart-series binding="y0" name="Y1"></wj-flex-chart-series>
                <wj-flex-chart-series binding="y1" name="Y2"></wj-flex-chart-series>
                <wj-flex-chart-series binding="y2" name="Y3"></wj-flex-chart-series>
                <wj-flex-chart-animation :initialized="initializeAnimation" :easing="easing" :duration="duration"></wj-flex-chart-animation>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.chart';
import  '@grapecity/wijmo.vue2.chart.animation';
import { getData, getRandomData, getRandomValue } from './data';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnimation from '@grapecity/wijmo.chart.animation';

var chartAnimation= null;
new Vue({
      el: "#app",
      data: {
        data: null,
        flexChartPoints: 10,
        duration: 400,
        chartType: 'Line',
        easing: 'Swing',
        animationMode: 'All'
    },
    methods:{
        initializeChart(chart){
            this.flexChart = chart;
            this._setDataSource();
        },
        initializeAnimation(animation){
            this.chartAnimation = animation;
        },
        _setDataSource() {
            this.data = getData(this.flexChartPoints);
        },
        resetChartData() {
            this._setDataSource();
        },
        selectedTypeChanged(e){
            if (e.selectedValue) {
                this.chartType = e.selectedValue;
            }
        },
        selectedEasingChanged(e){
            if (e.selectedValue) {
                this.easing = e.selectedValue;
            }
        },
        itemAdd(args) {
            var idx = args.selectedIndex;
            if (idx > -1) {
                this.func('add', idx);
            }
        },
        itemRemove(args) {
            var idx = args.selectedIndex;
            if (idx > -1) {
                this.func('remove', idx);
            }
        },
        func(oper, idx) {
            var str = '', funcName;
            if (idx === 1) {
                str = 'FirstPoint';
            } else if (idx === 2) {
                str = 'LastPoint';
            }
            funcName = oper + 'ChartSeries' + str;
            this[funcName]();
        },
        addChartSeriesFirstPoint: function () {
            this.data.insert(0, getRandomData('added' + getRandomValue(1000)));
        },
        addChartSeriesLastPoint: function () {
            this.data.push(getRandomData('added' + getRandomValue(1000)));
        },
        removeChartSeriesFirstPoint: function () {
            if (this.data.length) {
                this.data.removeAt(0);
            }
        },
        removeChartSeriesLastPoint: function () {
            if (this.data.length) {
                this.data.pop();
            }
        },
        valueChanged: function(sender) {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            if(this.chartAnimation) {
                this.chartAnimation.duration = sender.value;
            }
        },
        addChartSeries: function () {
            var chart = this.flexChart,
                len = chart.series.length;

            if (len >= 5) {
                return;
            }
            var series = new wjChart.Series();
            series.binding = len ? 'y' + len : 'y';
            series.name = 'Y' + (chart.series.length + 1);
            chart.series.push(series);
        
        },
        removeChartSeries: function () {
            var chart = this.flexChart;

            if (chart.series.length <= 0) {
                return;
            }
            chart.series.pop();
        },
        animationModeChanged(e) {
            this.animationMode = e.selectedValue;
            this.chartAnimation.animationMode = this.animationMode;
            this.flexChart.refresh(true);
        }

    }
});
</script>

<style>
    .wj-flexchart {
        height: 300px;
    }

    .wj-data-label {
        font-size: 75%;
        opacity: .9;
    }

    label {
        width: 150px;
        text-align: right;
    }

    .wj-control {
        margin-bottom: 3px;
    }
</style>
