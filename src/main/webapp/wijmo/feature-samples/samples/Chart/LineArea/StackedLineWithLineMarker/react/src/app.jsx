import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._getRandomPalette = () => {
            let palettes = Object.getOwnPropertyNames(wjCharts.Palettes)
                .filter(prop => isArray(wjCharts.Palettes[prop]));
            let rand = Math.floor(Math.random() * palettes.length);
            //
            return wjCharts.Palettes[palettes[rand]];
        };
        this.onChartInitialized = (sender) => {
            sender.hostElement.addEventListener('mouseenter', () => this.setState({ showMarker: true }));
            sender.hostElement.addEventListener('mouseleave', () => this.setState({ showMarker: false }));
        };
        this.getMarkerContent = (ht) => {
            if (ht.item) {
                let s = `<b>Poplations(in millions)</b></br>Year: ${ht.item.year}`;
                for (let key in ht.item) {
                    if (key !== 'year') {
                        s += `</br> ${key}: ${ht.item[key]}`;
                    }
                }
                return s;
            }
            else {
                return 'No items here...';
            }
        };
        this.state = {
            data: getData(),
            showMarker: false,
            // Get random palette
            palette: this._getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} tooltipContent="" bindingX="year" palette={this.state.palette} chartType="LineSymbols" stacking="Stacked" initialized={this.onChartInitialized}>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Populations(in millions)"></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="africa" name="Africa"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="asia" name="Asia"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="europe" name="Europe"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="southAmerica" name="South America"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="northAmerica" name="North America"></wjChart.FlexChartSeries>

                <wjChart.FlexChartLineMarker isVisible={this.state.showMarker} lines="Both" interaction="Move" content={this.getMarkerContent}>
                </wjChart.FlexChartLineMarker>

                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
