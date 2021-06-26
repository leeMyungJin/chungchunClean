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
            //
            return Palettes[palettes[rand]];
        };
        this.onCheckboxClick = (target) => {
            this.setState({ interpolateNulls: target.checked });
        };
        this.state = {
            data: getData(),
            interpolateNulls: false,
            palette: this._getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-check">
                <label htmlFor="interpolateNulls" className="form-check-label">interpolateNulls:</label>
                <input id="interpolateNulls" type="checkbox" className="form-check-input" defaultChecked={false} onClick={e => this.onCheckboxClick(e.target)}/>
            </div>

            <wjChart.FlexChart itemsSource={this.state.data} header="24 Hours CPU Utilization and Temperature" bindingX="time" chartType="Line" interpolateNulls={this.state.interpolateNulls} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries binding="utilization" name="Utilization(%)"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="temperature" name="Temperature(°C)"></wjChart.FlexChartSeries>
                <wjChartAnimate.FlexChartAnimation animationMode="Point"></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
