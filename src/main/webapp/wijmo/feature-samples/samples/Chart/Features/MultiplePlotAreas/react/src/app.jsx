import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import { Palettes, PlotArea } from "@grapecity/wijmo.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            plot: null
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjChart.FlexChart itemsSource={this.state.data} header="Sales, Expenses, and Downloads" bindingX="country" palette={this.state.palette} initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartSeries binding="sales" name="Sales"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="expenses" name="Expenses"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="downloads" name="Downloads" chartType="LineSymbols">
                        <wjChart.FlexChartAxis wjProperty="axisY" position="Left" plotArea={this.state.plot}>
                        </wjChart.FlexChartAxis>
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartPlotArea row={0} name="amounts" height="2*">
                    </wjChart.FlexChartPlotArea>
                    <wjChart.FlexChartPlotArea row={1} name="spacer" height={25}>
                    </wjChart.FlexChartPlotArea>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        let p = new PlotArea();
        p.row = flex.plotAreas.length;
        p.name = 'quantities';
        p.height = '*';
        flex.plotAreas.push(p);
        this.setState({
            plot: p
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
