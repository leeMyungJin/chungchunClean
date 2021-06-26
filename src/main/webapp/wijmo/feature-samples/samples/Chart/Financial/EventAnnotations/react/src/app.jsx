import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Chart from '@grapecity/wijmo.react.chart';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjAnnotation from '@grapecity/wijmo.chart.annotation';
import * as Interaction from '@grapecity/wijmo.react.chart.interaction';
import * as Finance from '@grapecity/wijmo.react.chart.finance';
import { getData, getAnnotations } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            tooltip: '<b>{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '<tr><td>volume</td><td>{volume:c}</td><tr/>' +
                '</table>'
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">

                <Finance.FinancialChart itemsSource={this.state.data} bindingX="date" chartType="Candlestick" tooltipContent="tooltip" rendered={this.renderFinancialChart.bind(this)} initialized={this.initializeChart.bind(this)}>
                    <Finance.FinancialChartSeries binding="high,low,open,close" name="HLOC"></Finance.FinancialChartSeries>
                    <Finance.FinancialChartSeries binding="volume" name="Volume" chartType="Column"></Finance.FinancialChartSeries>
                    <Chart.FlexChartLegend position="None"></Chart.FlexChartLegend>
                    <Chart.FlexChartAxis wjProperty="axisX" axisLine={false} format="MM/dd/yy"></Chart.FlexChartAxis>
                    <Chart.FlexChartAxis wjProperty="axisY" position="Right"></Chart.FlexChartAxis>
                </Finance.FinancialChart>

                <Finance.FinancialChart id="rsChart" itemsSource={this.state.data} bindingX="date" chartType="Area" tooltipContent="" rendered={this.rsRender.bind(this)} initialized={this.initializeRSChart.bind(this)}>
                    <Chart.FlexChartLegend position="None"></Chart.FlexChartLegend>
                    <Chart.FlexChartAxis wjProperty="axisX" labels={false}>
                    </Chart.FlexChartAxis>
                    <Chart.FlexChartAxis wjProperty="axisY" labels={false} majorGrid={false}>
                    </Chart.FlexChartAxis>
                    <Finance.FinancialChartSeries binding="close" name="Box Inc">
                    </Finance.FinancialChartSeries>
                    <Interaction.FlexChartRangeSelector seamless={true} rangeChanged={this.rangeChanged.bind(this)}>
                        </Interaction.FlexChartRangeSelector>
                </Finance.FinancialChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
        this.al = new wjAnnotation.AnnotationLayer(flex, getAnnotations());
    }
    initializeRSChart(flex) {
        this.rsChart = flex;
    }
    rsRender() {
        let chart = this.rsChart;
        let rs = this.selector;
        // set range
        if (rs) {
            var range = this.findRange(chart.axisX.actualMin, chart.axisX.actualMax);
            rs.min = range.min;
            rs.max = range.max;
        }
    }
    renderFinancialChart() {
        let volSeries = this.theChart.series[1];
        let volYAxis = new wjChart.Axis(0);
        volSeries.axisY = volYAxis;
        if (volSeries.getValues(0)) {
            volYAxis.max = Math.max.apply(null, volSeries.getValues(0)) * 8;
        }
    }
    rangeChanged(rs) {
        if (!this.selector) {
            this.selector = rs;
        }
        let chart = this.theChart;
        // update main chart's x & y range
        chart.axisX.min = rs.min;
        chart.axisX.max = rs.max;
        let yRange = this.findYRange(this.state.data, rs.min, rs.max);
        chart.axisY.min = yRange.min;
        chart.axisY.max = yRange.max;
        chart.invalidate();
    }
    // helper method to calculate (upper) percentage of total range
    // the default will show the top 20% of the available range
    findRange(min, max, percent) {
        var pctToShow = wjCore.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2, range = {
            min: NaN,
            max: NaN
        };
        if (wjCore.isDate(min) && wjCore.isDate(max)) {
            range.max = max.valueOf();
            range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
        }
        else if (wjCore.isNumber(min) && wjCore.isNumber(max)) {
            range.max = max;
            range.min = (max - min) * (1 - pctToShow) + min;
        }
        return range;
    }
    // assumes High, Low, Open, Close, and Volume data
    // also assumes category axis
    findYRange(data, xmin, xmax) {
        var item, i, ymin = null, ymax = null;
        for (i = 0; i < data.length; i++) {
            item = data[i];
            let v = item.date.valueOf();
            if (xmin > v || v > xmax) {
                continue;
            }
            if (ymax === null || item.close > ymax) {
                ymax = item.close;
            }
            if (ymin === null || item.close < ymin) {
                ymin = item.close;
            }
        }
        return {
            min: ymin,
            max: ymax
        };
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
