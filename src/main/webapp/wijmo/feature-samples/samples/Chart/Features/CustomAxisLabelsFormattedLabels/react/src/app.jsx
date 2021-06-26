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
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container">
            <div className="form-group">
                <Chart.FlexChart header="Country GDP" bindingX="country" itemsSource={this.state.data} palette={this.state.palette}>
                    <Chart.FlexChartAxis wjProperty="axisY" itemFormatter={this.itemFormatter.bind(this)}>
                    </Chart.FlexChartAxis>
                    <Chart.FlexChartSeries name="2014" binding="2014"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries name="2015" binding="2015"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries name="2016" binding="2016"></Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    itemFormatter(_, label) {
        if (label.val >= 10000000) {
            label.cls = 'high-value';
        }
        else if (label.val < 5000000) {
            label.cls = 'low-value';
        }
        return label;
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
