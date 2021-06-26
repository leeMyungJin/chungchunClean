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
            data: getData(750),
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container">
            <div className="form-group">
                <Chart.FlexChart palette={this.state.palette} itemsSource={this.state.data} chartType="Scatter" tooltipContent="" bindingX="x">
                    <Chart.FlexChartAxis wjProperty="axisY" axisLine={true} majorGrid={false} origin={0} majorUnit={1} max={1} min={-1} labels={false}>
                    </Chart.FlexChartAxis>
                    <Chart.FlexChartAxis wjProperty="axisX" axisLine={true} majorGrid={false} origin={0} majorUnit={1} max={1} min={-1} labels={false}>
                    </Chart.FlexChartAxis>
                    <Chart.FlexChartLegend position="None"></Chart.FlexChartLegend>
                    <Chart.FlexChartSeries name="data1" binding="y1"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries name="data2" binding="y2"></Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
