import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: ['rgba(42,159,214,1)', 'rgba(119,179,0,1)', 'rgba(153,51,204,1)', 'rgba(255,136,0,1)', 'rgba(204,0,0,1)', 'rgba(0,204,163,1)', 'rgba(61,109,204,1)', 'rgba(82,82,82,1)', 'rgba(0,0,0,1)']
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="month" chartType="Line" header="Temperature of New York" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Temperature(°C)"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="low" name="Average Low"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="high" name="Average High"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="mean" name="Daily Mean"></wjChart.FlexChartSeries>

                <wjChartAnimate.FlexChartAnimation animationMode="Point"></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
