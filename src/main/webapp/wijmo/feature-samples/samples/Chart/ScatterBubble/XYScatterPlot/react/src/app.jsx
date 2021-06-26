import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.chartInitialized = (sender) => {
            this.chart = sender;
        };
        this.changeAxisOrigin = (target) => {
            let origin = target.checked ? 0 : null;
            this.chart.axisX.origin = origin;
            this.chart.axisY.origin = origin;
        };
        this.state = {
            series1: getData(50, 0, 3),
            series2: getData(40, 100, 12),
            series3: getData(30, -100, 24)
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-check">
                <label htmlFor="axisOrigin">Set Axis Origin to Zero</label>
                <input id="axisOrigin" onClick={e => this.changeAxisOrigin(e.target)} type="checkbox" defaultChecked={false}/>
            </div>

            <wjChart.FlexChart chartType="Scatter" bindingX="x" initialized={this.chartInitialized}>
                <wjChart.FlexChartAxis wjProperty="axisY" axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries name="Experiment 1" itemsSource={this.state.series1} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Experiment 2" itemsSource={this.state.series2} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Experiment 3" itemsSource={this.state.series3} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
