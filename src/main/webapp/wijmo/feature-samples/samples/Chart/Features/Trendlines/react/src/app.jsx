import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcChart from "@grapecity/wijmo.chart";
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjChartAnalysis from "@grapecity/wijmo.react.chart.analytics";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            comboData: 'Linear,Exponential,Logarithmic,Power,Fourier,Polynomial,MinX,MinY,MaxX,MaxY,AverageX,AverageY'.split(','),
            order: 2
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="fitType">Trendline Type: </label>
                <wjInput.ComboBox isRequired={false} placeholder="None" itemsSource={this.state.comboData} textChanged={this.textChanged.bind(this)} initialized={this.initializeCombo.bind(this)}></wjInput.ComboBox><br />
                <label htmlFor="order">Order: </label>
                <wjInput.InputNumber step={1} min={1} max={6} value={this.state.order} valueChanged={this.orderChanged.bind(this)} initialized={this.initializeInput.bind(this)}></wjInput.InputNumber><br />
                <label>Equation: </label>
                <div id="equation" className="equation"></div><br />
                <label htmlFor="btnRandomize">Randomize Data</label>
                <button id="btnRandomize" className="btn btn-default" onClick={this.randomData.bind(this)}>
                    Go
                </button>
                <wjChart.FlexChart itemsSource={this.state.data} chartType="Scatter" bindingX="x" initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisY" axisLine={true}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries name="Raw Data" binding="y"></wjChart.FlexChartSeries>
                    <wjChartAnalysis.FlexChartTrendLine binding="y" order={this.state.order} style={{ stroke: 'darkred', strokeWidth: 3 }}>
                    </wjChartAnalysis.FlexChartTrendLine>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    componentDidMount() {
        this.eqEle = document.querySelector('#equation');
        this.reset(this.combo.selectedValue);
    }
    initializeInput(flex) {
        this.orderIpt = flex;
    }
    initializeCombo(flex) {
        this.combo = flex;
    }
    initializeChart(flex) {
        this.trendLine = flex.series[1];
    }
    orderChanged(s) {
        if (s.value >= s.min && s.value <= s.max) {
            this.setState({
                order: s.value
            });
            this.showEquation();
        }
    }
    showEquation() {
        if (this.eqEle) {
            this.eqEle.innerHTML = '';
            setTimeout(() => this.eqEle.innerHTML = this.trendLine.getEquation(), 100);
        }
    }
    randomData() {
        this.setState({
            data: getData()
        });
        this.showEquation();
    }
    textChanged(s) {
        this.reset(s.text);
    }
    reset(text) {
        let trendLine = this.trendLine;
        if (!trendLine) {
            return;
        }
        trendLine.name = text;
        if (text) { // show trendline
            trendLine.fitType = text;
            trendLine.visibility = wjcChart.SeriesVisibility.Visible;
        }
        else { // hide trendline
            trendLine.visibility = wjcChart.SeriesVisibility.Hidden;
        }
        switch (text) { // enable/disable order input
            case 'Polynomial':
            case 'Fourier':
                this.orderIpt.isDisabled = false;
                break;
            default:
                this.orderIpt.isDisabled = true;
                break;
        }
        this.showEquation();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
