import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import { getData } from "./data";
import { AxisScrollbar } from "./AxisScrollbar";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjChart.FlexChart tooltipContent="" itemsSource={this.state.data} chartType="Line" bindingX="date" plotMargin={[NaN, NaN, NaN, 80]} initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisX" axisLine={false}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries name="Data" binding="yval"></wjChart.FlexChartSeries>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        let axisXScrollbar = new AxisScrollbar(flex.axisX, {
            minScale: 0.02
        });
        let axisYScrollbar = new AxisScrollbar(flex.axisY, {
            buttonsVisible: false,
            minScale: 0.05
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
