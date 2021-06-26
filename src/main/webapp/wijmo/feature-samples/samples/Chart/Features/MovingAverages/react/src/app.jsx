import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjChartAnalysis from "@grapecity/wijmo.react.chart.analytics";
import * as wjInput from "@grapecity/wijmo.react.input";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            typeData: 'Simple,Weighted,Exponential,Triangular'.split(','),
            type: 'Simple',
            period: 6
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label>MovingAverage Type: </label>
                <wjInput.ComboBox text={this.state.type} itemsSource={this.state.typeData} textChanged={this.typeChanged.bind(this)}></wjInput.ComboBox>
                <label>Period: </label>
                <wjInput.InputNumber value={this.state.period} step={1} min={2} max={20} valueChanged={this.periodChanged.bind(this)}></wjInput.InputNumber>
                <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="Line">
                    <wjChart.FlexChartAxis wjProperty="axisY" min={0}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries name="Sales" binding="sales"></wjChart.FlexChartSeries>
                    <wjChartAnalysis.FlexChartMovingAverage name="Moving Average" itemsSource={this.state.data} binding="sales" period={this.state.period} style={{ stroke: 'darkred', strokeWidth: 3 }} type={this.state.type}></wjChartAnalysis.FlexChartMovingAverage>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    typeChanged(combo) {
        this.setState({
            type: combo.text
        });
    }
    periodChanged(input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.setState({
            period: input.value
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
