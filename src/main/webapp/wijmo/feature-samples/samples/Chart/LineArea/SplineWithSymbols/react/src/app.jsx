import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initChart = (chart) => {
            chart.dataLabel.content = "{y}";
            this.theChart = chart;
        };
        this._getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
            let rand = Math.floor(Math.random() * palettes.length);
            //
            return Palettes[palettes[rand]];
        };
        this.state = {
            data: getData(),
            palette: this._getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="Temperature of New York" tooltipContent="" bindingX="month" chartType="SplineSymbols" itemsSource={this.state.data} initialized={this.initChart} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="Right"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Temperature(°C)"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="low" name="Average Low"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="high" name="Average High"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="mean" name="Daily Mean"></wjChart.FlexChartSeries>
                <wjChartAnimate.FlexChartAnimation animationMode="Series"></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
