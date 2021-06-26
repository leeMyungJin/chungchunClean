import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import { isArray } from "@grapecity/wijmo";
import { Palettes } from "@grapecity/wijmo.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="secondaryAxis">Secondary Y Axis</label>
                <input id="secondaryAxis" type="checkbox" defaultChecked onClick={this.saChange.bind(this)}/>
                <wjChart.FlexChart bindingX="country" initialized={this.initializeChart.bind(this)} itemsSource={this.state.data} palette={this.state.palette}>
                    <wjChart.FlexChartSeries binding="sales" name="Sales"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="expenses" name="Expenses"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="downloads" name="Downloads" chartType="LineSymbols">
                        <wjChart.FlexChartAxis wjProperty="axisY" position="Right" title="Downloads (k)" format="n0," min={0} axisLine={true}>
                        </wjChart.FlexChartAxis>
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartAxis wjProperty="axisY" format="n0," title="Sales/Expenses (US$ k)" axisLine={true}>
                    </wjChart.FlexChartAxis>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        this.ser = flex.series[2];
        this.axisY = this.ser.axisY;
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
    saChange(sa) {
        this.ser.axisY = sa.target.checked ? this.axisY : null;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
