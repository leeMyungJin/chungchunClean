import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Chart from '@grapecity/wijmo.react.chart';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            tooltipContent: `<b>Country: </b>{country} <img src="resources/{country}.png" /></br>downloads: {downloads}</br>sales: {sales}`
        };
    }
    //
    render() {
        return <div className="container">
            <div className="form-group">
                <Chart.FlexChart bindingX="country" itemsSource={this.state.data} palette={this.state.palette}>
                    <Chart.FlexChartLegend position="Bottom"></Chart.FlexChartLegend>
                    <Chart.FlexChartSeries name="Sales" binding="sales" tooltipContent={this.state.tooltipContent}></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries name="Downloads" binding="downloads" tooltipContent={this.state.tooltipContent}></Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
