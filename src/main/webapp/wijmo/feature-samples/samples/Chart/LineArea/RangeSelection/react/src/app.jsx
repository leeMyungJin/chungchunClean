import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartInteraction from '@grapecity/wijmo.react.chart.interaction';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onChartInitialized = (sender) => {
            this.chart = sender;
        };
        this.rangeChanged = (sender) => {
            this.chart.axisX.min = sender.min;
            this.chart.axisX.max = sender.max;
        };
        this.state = {
            data: getData(),
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
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} plotMargin="NaN 60 NaN 60" bindingX="date" chartType="Area" palette={this.state.palette} initialized={this.onChartInitialized}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries binding="low,high,open,close" name="Alphabet Inc"></wjChart.FlexChartSeries>
            </wjChart.FlexChart>

            <wjChart.FlexChart className="chart-selector" itemsSource={this.state.data} plotMargin="NaN 60 NaN 60" tooltipContent="" bindingX="date" chartType="Area" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisX" position="None"></wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisY" position="None"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="close" name="Alphabet Inc"></wjChart.FlexChartSeries>

                <wjChartInteraction.FlexChartRangeSelector minScale={0.05} maxScale={0.75} rangeChanged={this.rangeChanged}>
                </wjChartInteraction.FlexChartRangeSelector>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
