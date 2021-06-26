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
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
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
            <wjChart.FlexChart itemsSource={this.state.data} header="Logarithmic Axis" bindingX="x" chartType="Scatter" palette={this.state.palette}>
                <wjChart.FlexChartSeries binding="y"></wjChart.FlexChartSeries>
                <wjChartAnalytics.FlexChartTrendLine name="Trendline" binding="y" sampleCount={100}>
                </wjChartAnalytics.FlexChartTrendLine>
                <wjChart.FlexChartAxis wjProperty="axisX" logBase={10}></wjChart.FlexChartAxis>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
