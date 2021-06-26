import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wjChartInteraction from '@grapecity/wijmo.react.chart.interaction';
import { AggregateSeries } from './aggregate-series';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onMenuItemClick = (sender) => {
            this.setState({ groupAggregate: sender.selectedValue }, () => {
                this.series.groupAggregate = this.state.groupAggregate;
            });
        };
        this.onChartInitialized = (sender) => {
            sender.tooltip.content = this.getTooltipContent;
            this.chart = sender;
        };
        this.rangeChanged = (sender) => {
            this.chart.axisX.min = sender.min;
            this.chart.axisX.max = sender.max;
        };
        this.getTooltipContent = (ht) => {
            return (ht && ht.x && ht.y)
                ? `<b>Date:</b> ${wijmo.Globalize.formatDate(ht.x, 'MM-dd-yyyy')}<br><b>Value:</b> ${ht.y.toFixed(2)}`
                : '';
        };
        this.state = {
            data: getData(),
            palette: ['rgba(55,90,127,1)', 'rgba(0,188,140,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(231,76,60,1)', 'rgba(143,97,179,1)', 'rgba(176,135,37,1)', 'rgba(74,73,73,1)', 'rgba(0,0,0,1)'],
            groupAggregate: 'Sum',
            tooltipContent: ''
        };
    }
    componentDidMount() {
        this.series = new AggregateSeries();
        this.chart.beginUpdate();
        this.series.itemsSource = this.state.data;
        this.series.chartType = wjCharts.ChartType.LineSymbols;
        this.series.binding = 'close';
        this.series.bindingX = 'date';
        this.series.groupAggregate = this.state.groupAggregate;
        this.series.autoGroupIntervals = ['DD', 'WW', 'MM', 'YYYY'];
        this.series.autoInterval = true;
        this.chart.series.push(this.series);
        this.chart.endUpdate();
    }
    render() {
        return <div className="container-fluid">
            <div id="options">
                <wjInput.Menu header='Aggregate' value={this.state.groupAggregate} itemClicked={this.onMenuItemClick}>
                    <wjInput.MenuItem value="None">None</wjInput.MenuItem>
                    <wjInput.MenuItem value="Sum">Sum</wjInput.MenuItem>
                    <wjInput.MenuItem value="Cnt">Count</wjInput.MenuItem>
                    <wjInput.MenuItem value="Avg">Average</wjInput.MenuItem>
                    <wjInput.MenuItem value="Max">Max</wjInput.MenuItem>
                    <wjInput.MenuItem value="Min">Min</wjInput.MenuItem>
                    <wjInput.MenuItem value="Rng">Range</wjInput.MenuItem>
                    <wjInput.MenuItem value="Std">Std</wjInput.MenuItem>
                    <wjInput.MenuItem value="StdPop">StdPop</wjInput.MenuItem>
                    <wjInput.MenuItem value="Var">Var</wjInput.MenuItem>
                    <wjInput.MenuItem value="VarPop">VarPop</wjInput.MenuItem>
                </wjInput.Menu>
            </div>

            <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="LineSymbols" plotMargin="NaN 60 NaN 60" palette={this.state.palette} initialized={this.onChartInitialized}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
            </wjChart.FlexChart>

            <wjChart.FlexChart className="chart-selector" itemsSource={this.state.data} bindingX="date" chartType="Area" tooltipContent="" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisX" position="None"></wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisY" position="None"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="close"></wjChart.FlexChartSeries>
                <wjChartInteraction.FlexChartRangeSelector seamless={true} rangeChanged={this.rangeChanged}>
                </wjChartInteraction.FlexChartRangeSelector>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
