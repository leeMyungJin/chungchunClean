import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wjInteraction from '@grapecity/wijmo.react.chart.interaction';
import { AggregateSeries } from './AggregateSeries';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initializeChart = (flex) => {
            this.theChart = flex;
            let series = new AggregateSeries();
            let theChart = this.theChart;
            let data = this.state.data;
            theChart.beginUpdate();
            series.itemsSource = data;
            series.chartType = wjCharts.ChartType.Column;
            series.binding = 'close';
            series.bindingX = 'date';
            series.name = 'Aggregate Avg';
            series.groupAggregate = wjCore.Aggregate.Avg;
            series.autoGroupIntervals = ["YYYY"];
            series.autoInterval = true;
            theChart.series.push(series);
            this.setState({ aggSeries: series });
            theChart.axisX.min = data[0].date;
            theChart.axisX.max = data[data.length - 1].date;
            theChart.endUpdate();
        };
        this.tooltip = (ht) => {
            if (!ht) {
                return '';
            }
            else if (ht.x && ht.y) {
                return '<b>Date:</b> ' + wjCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                    '<b>Value:</b> ' + ht.y.toFixed(2);
            }
        };
        this.rangeChanged = (sender) => {
            let theChart = this.theChart;
            theChart.beginUpdate();
            theChart.axisX.min = sender.min;
            theChart.axisX.max = sender.max;
            if (this.state.aggSeries.autoGroupIntervals.length === 1) {
                this.state.aggSeries.autoGroupIntervals = ['WW', 'MM', 'YYYY'];
            }
            theChart.endUpdate();
        };
        this.chartItemFormatter = (engine, hitTestInfo, defaultFormat) => {
            let ht = hitTestInfo;
            if (ht.series instanceof AggregateSeries && ht.chartElement == wjCharts.ChartElement.SeriesSymbol) {
                let s = ht.series, len = s.getValues(0).length, vLen = s._values.length, c = ht.chart, ax = c.axisX, dx = c._dataInfo.dx * vLen / len, pt = ht.point, y = c.axisY.convert(c.axisY.actualMin), x = Math.abs(ax.convert(dx) - ax.convert(0));
                engine.drawRect(pt.x - x / 2, pt.y, x, y - pt.y, null, s.symbolStyle /* ,'plotRect'*/);
            }
            else {
                // render element as usual
                defaultFormat();
            }
        };
        this.state = {
            data: getData(),
            aggSeries: null,
            palette: [
                'rgba(3,62,118,1)',
                'rgba(135,192,72,1)',
                'rgba(89,130,44,1)',
                'rgba(83,179,235,1)',
                'rgba(252,101,6,1)',
                'rgba(212,35,35,1)',
                'rgba(227,187,0,1)',
                'rgba(204,204,204,1)',
                'rgba(34,34,34,1)'
            ]
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="Line" legendToggle={true} tooltipContent={this.tooltip} plotMargin="NaN 60 NaN 60" itemFormatter={this.chartItemFormatter} palette={this.state.palette} initialized={this.initializeChart}>
                    <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartSeries binding="high" name="High"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="low" name="Low"></wjChart.FlexChartSeries>
                </wjChart.FlexChart>
                <wjChart.FlexChart className="chart-selector" itemsSource={this.state.data} bindingX="date" chartType="Area" palette={this.state.palette} plotMargin="NaN 60 NaN 60">
                    <wjChart.FlexChartSeries tooltipContent="" binding="close"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartAxis wjProperty="axisX" position="None"></wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" position="None"></wjChart.FlexChartAxis>
                    <wjInteraction.FlexChartRangeSelector seamless={true} rangeChanged={this.rangeChanged}></wjInteraction.FlexChartRangeSelector>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
