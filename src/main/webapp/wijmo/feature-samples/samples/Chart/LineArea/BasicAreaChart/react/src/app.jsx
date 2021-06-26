import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: wjCharts.Palettes.cyborg
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="Date" chartType="Area" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisX" labelAngle={-45}></wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Temperature(°C)"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="MeanTemp" name="Mean Temperature"></wjChart.FlexChartSeries>

                <wjChartAnimate.FlexChartAnimation animationMode="Point"></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
