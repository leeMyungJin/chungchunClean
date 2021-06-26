import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Chart from '@grapecity/wijmo.react.chart';
import '@grapecity/wijmo.chart.render';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: getData(50, 0, 3),
            data2: getData(40, 100, 12),
            data3: getData(30, -100, 24)
        };
    }
    render() {
        return <div className="container">
            <div className="form-group">
                <p>
                    Save as:
                    <button className="btn btn-default" onClick={this.exportChart.bind(this, "png")}>PNG</button>
                    <button className="btn btn-default" onClick={this.exportChart.bind(this, "jpeg")}>JPEG</button>
                    <button className="btn btn-default" onClick={this.exportChart.bind(this, "svg")}>SVG</button>
                </p>

               <div className="form-group">
                    <Chart.FlexChart header="Phase II Test Results" chartType="Scatter" initialized={this.chartInitialized.bind(this)}>
                        <Chart.FlexChartSeries name="Experiment 1" itemsSource={this.state.data1} bindingX="x" binding="y">
                        </Chart.FlexChartSeries>
                        <Chart.FlexChartSeries name="Experiment 2" itemsSource={this.state.data2} bindingX="x" binding="y">
                        </Chart.FlexChartSeries>
                        <Chart.FlexChartSeries name="Experiment 3" itemsSource={this.state.data3} bindingX="x" binding="y">
                        </Chart.FlexChartSeries>
                        <Chart.FlexChartAxis wjProperty="axisY" axisLine={true}></Chart.FlexChartAxis>
                    </Chart.FlexChart>
                </div>
            </div>
        </div>;
    }
    exportChart(type) {
        this.theChart.saveImageToFile('FlexChart.' + type);
    }
    chartInitialized(flex) {
        this.theChart = flex;
    }
    textChanged(s) {
        if (this.theChart) {
            this.theChart.dataLabel.position = s.text;
        }
    }
    showLinesAndBordersChanged() {
        this.setState({
            showLinesAndBorders: !this.state.showLinesAndBorders
        });
        if (this.theChart) {
            let dl = this.theChart.dataLabel;
            dl.connectingLine = dl.border = this.state.showLinesAndBorders;
        }
    }
    downloadsOnlyChanged() {
        if (this.theChart) {
            this.setState({
                downloadsOnly: !this.state.downloadsOnly
            });
            this.theChart.invalidate();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
