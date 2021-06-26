import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjcChart from "@grapecity/wijmo.chart";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjChartInteraction from "@grapecity/wijmo.react.chart.interaction";
import { getData } from "./data";
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.pt = new wjCore.Point();
        this.state = {
            data: getData(),
            isViewInitialized: false,
            palette: ['#88bde6', 'blue', 'red'],
            props: ['MeanPressure', 'Precipitation']
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                
                <wjChart.FlexChart style={{ height: '150px' }} plotMargin={"NaN 30 2 110"} itemsSource={this.state.data} palette={this.state.palette} chartType="Line" initialized={this.initChart1.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisX" position="Top" format="MMM-dd" labelAngle={90}>
                    </wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries bindingX="Date" binding="MeanTemp" name="MeanTemp">
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries bindingX="Date" binding="MinTemp" name="MinTemp">
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries bindingX="Date" binding="MaxTemp" name="MaxTemp">
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="Left"></wjChart.FlexChartLegend>
                </wjChart.FlexChart>
                
                <wjChart.FlexChart id="chart2" style={{ height: '120px' }} plotMargin={"0 30 0 110"} itemsSource={this.state.data} chartType="Area" initialized={this.initChart2.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisX" labels={false} axisLine={false} format="MMM-dd" labelAngle={90}>
                    </wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" title="MeanPressure"></wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries bindingX="Date" binding="MeanTemp" name="MeanTemp">
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                </wjChart.FlexChart>
                
                <wjChart.FlexChart id="chart3" style={{ height: '120px' }} plotMargin={"0 30 NaN 110"} itemsSource={this.state.data} chartType="Column" initialized={this.initChart3.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisX" labels={false} axisLine={false} format="MMM-dd" labelAngle={90}>
                    </wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" title="Precipitation"></wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries bindingX="Date" binding="Precipitation" name="Precipitation">
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                </wjChart.FlexChart>
                
                <wjChart.FlexChart id="chart4" style={{ height: '100px' }} plotMargin={"0 30 NaN 110"} itemsSource={this.state.data} chartType="Line" initialized={this.initChart.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisX" format="MMM-dd" labelAngle={45}>
                    </wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" labels={false} majorGrid={false}>
                    </wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries bindingX="Date" binding="MeanTemp" name="MeanTemp">
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChartInteraction.FlexChartRangeSelector seamless={true} rangeChanged={this.rangeChanged.bind(this)}>
                    </wjChartInteraction.FlexChartRangeSelector>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    //
    initChart1(flex) {
        this.chart1 = flex;
        this.createMarker(flex);
    }
    //
    initChart2(flex) {
        this.chart2 = flex;
        this.createMarker(flex);
    }
    //
    initChart3(flex) {
        this.chart3 = flex;
        this.createMarker(flex);
    }
    //
    initChart(chart) {
        chart.tooltip.content = null; // disable tooltips
    }
    //
    createMarker(chart) {
        let marker = new wjcChart.LineMarker(chart, {
            lines: 'Both',
            interaction: 'Move',
            content: () => {
                return this.getMarkercontent(new wjCore.Point(this.pt.x, NaN));
            }
        });
        marker.positionChanged.addHandler((marker, point) => {
            this.pt = point;
            this.changeMarker(chart, marker);
        });
        chart.tooltip.content = null; // disable tooltips
        chart.rendered.addHandler(function () {
            chart.hostElement.querySelector('.wj-chart-linemarker').style.display = 'none';
        });
    }
    //
    rangeChanged(flex) {
        this.update(flex.min, flex.max);
    }
    //
    update(min, max) {
        [this.chart1, this.chart2, this.chart3].forEach(function (chart) {
            chart.axisX.min = min;
            chart.axisX.max = max;
            chart.invalidate();
        });
    }
    //
    changeMarker(curChart, marker) {
        let curHost = curChart.hostElement, vline = curHost.querySelector('.wj-chart-linemarker-vline');
        [this.chart1, this.chart2, this.chart3].forEach(chart => {
            if (chart) {
                var ele = chart.hostElement.querySelector('.wj-chart-linemarker');
                if (chart === curChart) {
                    ele.style.display = 'block';
                }
                else {
                    ele.style.display = 'none';
                }
            }
        });
        vline.style.height = 326 + 'px';
    }
    //
    getMarkercontent(pt) {
        if (!this.chart1 || !this.chart1.itemsSource) {
            return;
        }
        let props = ['MeanPressure', 'Precipitation'];
        var chart = this.chart1, ht = chart.series[0].hitTest(pt), item = chart.itemsSource[ht.pointIndex], content = '', len = props.length;
        if (!item) {
            return;
        }
        for (var i = 0; i < chart.series.length; i++) {
            var series = chart.series[i];
            // find series lines to get its color
            var polyline = series.hostElement.querySelector('polyline');
            // add series info to the marker content
            if (ht.x && ht.y !== null) {
                if (i == 0) {
                    content += wjCore.Globalize.formatDate(ht.x, 'dd-MMM');
                }
                content += '<div style="color:' + polyline.getAttribute('stroke') + '">' + series.name + ' = ' + item[series.name].toFixed() + '</div>';
            }
        }
        for (var i = 0; i < len; i++) {
            content += '<div>' + props[i] + ' = ' + item[props[i]].toFixed() + '</div>';
        }
        return content;
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
