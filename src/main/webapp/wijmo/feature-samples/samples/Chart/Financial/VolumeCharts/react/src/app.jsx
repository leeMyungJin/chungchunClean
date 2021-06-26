import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjChartInteraction from "@grapecity/wijmo.react.chart.interaction";
import * as wjFinance from "@grapecity/wijmo.react.chart.finance";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjFinance.FinancialChart initialized={this.initChart.bind(this)} itemsSource={this.state.data} bindingX="date" chartType="ColumnVolume" tooltipContent="tooltip">
                    <wjFinance.FinancialChartSeries binding="close,volume" name="Column Volume" chartType="ColumnVolume">
                    </wjFinance.FinancialChartSeries>
                    <wjFinance.FinancialChartSeries binding="high,low,open,close,volume" name="Equi Volume" chartType="EquiVolume">
                        <wjChart.FlexChartAxis wjProperty="axisY" position="Left"></wjChart.FlexChartAxis>
                    </wjFinance.FinancialChartSeries>
                    <wjFinance.FinancialChartSeries binding="high,low,open,close,volume" name="Candle Volume" chartType="CandleVolume">
                        <wjChart.FlexChartAxis wjProperty="axisY" position="Left"></wjChart.FlexChartAxis>
                    </wjFinance.FinancialChartSeries>
                    <wjFinance.FinancialChartSeries binding="high,low,open,close,volume" name="Arms CandleVolume" chartType="ArmsCandleVolume">
                        <wjChart.FlexChartAxis wjProperty="axisY" position="Left"></wjChart.FlexChartAxis>
                    </wjFinance.FinancialChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartPlotArea row={0} height={100}></wjChart.FlexChartPlotArea>
                    <wjChart.FlexChartPlotArea row={1} height={100}></wjChart.FlexChartPlotArea>
                    <wjChart.FlexChartPlotArea row={2} height={100}></wjChart.FlexChartPlotArea>
                    <wjChart.FlexChartPlotArea row={3} height={100}></wjChart.FlexChartPlotArea>
                </wjFinance.FinancialChart>
                <wjFinance.FinancialChart initialized={this.initRSChart.bind(this)} id="rsChart" itemsSource={this.state.data} bindingX="date" chartType="ColumnVolume" tooltipContent="" rendered={this.rsRendered.bind(this)}>
                    <wjFinance.FinancialChartSeries binding="close,volume" name="Box Inc" chartType="ColumnVolume">
                    </wjFinance.FinancialChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartAxis wjProperty="axisX" labels={false}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" labels={false} majorGrid={false}></wjChart.FlexChartAxis>
                    <wjChartInteraction.FlexChartRangeSelector seamless={true} rangeChanged={this.rangeChanged.bind(this)}></wjChartInteraction.FlexChartRangeSelector>
                </wjFinance.FinancialChart>
            </div>
        </div>;
    }
    initChart(flex) {
        this.theChart = flex;
        let ser = flex.series[1];
        this.axisY1 = ser.axisY;
        this.axisY1.plotArea = flex.plotAreas[1];
        ser = flex.series[2];
        this.axisY2 = ser.axisY;
        this.axisY2.plotArea = flex.plotAreas[2];
        ser = flex.series[3];
        this.axisY3 = ser.axisY;
        this.axisY3.plotArea = flex.plotAreas[3];
    }
    initRSChart(flex) {
        this.rsChart = flex;
    }
    tooltip(ht) {
        var date = ht.item && ht.item.date ? ht.item.date : null, content = '';
        if (wjCore.isDate(date)) {
            date = wjCore.Globalize.formatDate(date, 'MM/dd/yy');
        }
        if (ht && ht.item) {
            content =
                '<b>' + ht.name + '</b><br/>' +
                    'Date: ' + date + '<br/>' +
                    'Open: ' + wjCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                    'High: ' + wjCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                    'Low: ' + wjCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                    'Close: ' + wjCore.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                    'Volume: ' + wjCore.Globalize.format(ht.item.volume, 'n0');
        }
        return content;
    }
    rsRendered() {
        let rsChart = this.rsChart;
        let rs = this.selector;
        // set range
        if (rs) {
            var range = this.findRange(rsChart.axisX.actualMin, rsChart.axisX.actualMax);
            rs.min = range.min;
            rs.max = range.max;
        }
    }
    rangeChanged(rs) {
        if (this.selector) {
            this.selector = rs;
        }
        let theChart = this.theChart;
        // find visible y-range
        var yRange = this.findYRange(this.state.data, rs.min, rs.max);
        // update main chart's x & y range
        theChart.axisX.min = rs.min;
        theChart.axisX.max = rs.max;
        [theChart.axisY, this.axisY1, this.axisY2, this.axisY3].forEach(axis => {
            axis.min = yRange.min;
            axis.max = yRange.max;
        });
        theChart.invalidate();
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
        //
        for (i = 0; i < data.length; i++) {
            item = data[i];
            if (xmin > i || i > xmax) {
                continue;
            }
            if (ymax === null || item.high > ymax) {
                ymax = item.high;
            }
            if (ymin === null || item.low < ymin) {
                ymin = item.low;
            }
        }
        return {
            min: ymin,
            max: ymax
        };
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
