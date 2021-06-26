import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//    
import { isArray, addClass, toggleClass } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
//
import * as Chart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    //  
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette(),
            customGridlines: true,
            customUnits: true,
            xMajor: true,
            xMinor: true,
            yMajor: true,
            yMinor: true,
            xMajorUnit: 7,
            xMinorUnit: 1,
            yMajorUnit: 20,
            yMinorUnit: 5
        };
    }
    //
    render() {
        return <div className="container">
            <div className="form-group">
                <h4>
                    Gridlines
                </h4>
                <div className="row">
                    <div className="col-xs-4">
                        <label>
                            <input id="customGridlines" type="checkbox" checked={this.state.customGridlines} onChange={this.customGridlinesChanged.bind(this)}/>
                            Custom CSS
                        </label>
                        <br />
                        <label>
                            <input id="customGridlines" type="checkbox" checked={this.state.customUnits} onChange={this.customUnitsChanged.bind(this)}/>
                            Custom Units
                        </label>
                    </div>
                    <div className="col-xs-4">
                        <label>
                            <input id="x-major" type="checkbox" checked={this.state.xMajor} onChange={this.xMajorChanged.bind(this)}/>
                            X Major
                        </label>
                        <br />
                        <label>
                            <input id="x-minor" type="checkbox" checked={this.state.xMinor} onChange={this.xMinorChanged.bind(this)}/>
                            X Minor
                        </label>

                    </div>
                    <div className="col-xs-4">
                        <label>
                            <input id="y-major" type="checkbox" checked={this.state.yMajor} onChange={this.yMajorChanged.bind(this)}/>
                            Y Major
                        </label>
                        <br />
                        <label>
                            <input id="y-minor" type="checkbox" checked={this.state.yMinor} onChange={this.yMinorChanged.bind(this)}/>
                            Y Minor
                        </label>
                    </div>
                </div>

            </div>

            <div className="form-group">
                <Chart.FlexChart chartType="Candlestick" bindingX="date" palette={this.state.palette} itemsSource={this.state.data} initialized={this.chartInitialized.bind(this)}>
                    <Chart.FlexChartSeries binding="high,low,open,close" name="Alphabet Inc"></Chart.FlexChartSeries>
                    <Chart.FlexChartLegend position="None"></Chart.FlexChartLegend>
                    <Chart.FlexChartAxis wjProperty="axisX" format="MMM dd" axisLine={true} majorTickMarks="Cross" minorTickMarks="None" majorGrid={this.state.xMajor} minorGrid={this.state.xMinor} majorUnit={this.state.xMajorUnit} minorUnit={this.state.xMinorUnit}>
                    </Chart.FlexChartAxis>
                    <Chart.FlexChartAxis min={790} max={860} wjProperty="axisY" format="c0" axisLine={true} majorTickMarks="Cross" minorTickMarks="None" majorGrid={this.state.yMajor} minorGrid={this.state.yMinor} majorUnit={this.state.yMajorUnit} minorUnit={this.state.yMinorUnit}>
                    </Chart.FlexChartAxis>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    //
    chartInitialized(flex) {
        this.theChart = flex;
        addClass(this.theChart.hostElement, 'custom-gridlines');
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
    //
    customGridlinesChanged() {
        let customGridlines = !this.state.customGridlines;
        toggleClass(this.theChart.hostElement, 'custom-gridlines', customGridlines);
        this.setState({
            customGridlines: customGridlines
        });
    }
    //  
    customUnitsChanged() {
        let theChart = this.theChart;
        if (theChart) {
            let customUnits = !this.state.customUnits;
            if (customUnits) {
                this.setState({
                    customUnits: customUnits,
                    xMajorUnit: 7,
                    xMinorUnit: 1,
                    yMajorUnit: 20,
                    yMinorUnit: 5
                });
            }
            else {
                this.setState({
                    customUnits: customUnits,
                    xMajorUnit: null,
                    xMinorUnit: null,
                    yMajorUnit: null,
                    yMinorUnit: null
                });
            }
        }
    }
    //
    xMajorChanged() {
        if (this.theChart) {
            let xMajor = !this.state.xMajor;
            this.setState({
                xMajor: xMajor
            });
        }
    }
    //
    xMinorChanged() {
        if (this.theChart) {
            let xMinor = !this.state.xMinor;
            this.setState({
                xMinor: xMinor
            });
        }
    }
    //  
    yMajorChanged() {
        if (this.theChart) {
            let yMajor = !this.state.yMajor;
            this.setState({
                yMajor: yMajor
            });
        }
    }
    //
    yMinorChanged() {
        if (this.theChart) {
            let yMinor = !this.state.yMinor;
            this.setState({
                yMinor: yMinor
            });
        }
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
