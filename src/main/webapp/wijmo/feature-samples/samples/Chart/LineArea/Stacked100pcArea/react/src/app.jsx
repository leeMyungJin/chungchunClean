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
        this._getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
            let rand = Math.floor(Math.random() * palettes.length);
            return Palettes[palettes[rand]];
        };
        this.state = {
            data: getData(),
            palette: this._getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="year" chartType="Area" stacking="Stacked100pc" palette={this.state.palette}>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Populations"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="africa" name="Africa"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="oceania" name="Oceania"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="asia" name="Asia"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="europe" name="Europe"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="southAmerica" name="South America"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="northAmerica" name="North America"></wjChart.FlexChartSeries>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
