import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//    
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as Chart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            legendToggle: true,
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
           <div className="form-group">
                Legend Toggle: 
                <input id="legendToggle" type="checkbox" checked={this.state.legendToggle} onChange={this.legendToggleChanged.bind(this)}></input>

                <Chart.FlexChart legendToggle={this.state.legendToggle} bindingX="country" palette={this.state.palette} itemsSource={this.state.data}>
                    <Chart.FlexChartSeries binding="2014" name="2014"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="2015" name="2015"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="2016" name="2016"></Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    legendToggleChanged() {
        this.setState({
            legendToggle: !this.state.legendToggle
        });
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
