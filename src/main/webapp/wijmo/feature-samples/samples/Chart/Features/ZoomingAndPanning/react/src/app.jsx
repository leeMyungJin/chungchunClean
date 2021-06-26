import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjChartInteraction from "@grapecity/wijmo.react.chart.interaction";
import { getData } from "./data";
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            action: "Zoom",
            axes: "XY",
            canReset: false,
            isTouch: navigator.userAgent.match(/iPad/i) != null || /Android/i.test(navigator.userAgent)
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="Candlestick" initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartAxis wjProperty="axisX" axisLine={false} rangeChanged={this.rangeChanged.bind(this)}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" rangeChanged={this.rangeChanged.bind(this)}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartSeries binding="high,low,open,close" name="Alphabet Inc" symbolSize={4}></wjChart.FlexChartSeries>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChartInteraction.FlexChartGestures initialized={this.initializeGestures.bind(this)} mouseAction={this.state.action} interactiveAxes={this.state.axes}></wjChartInteraction.FlexChartGestures>
                </wjChart.FlexChart>
                <wjInput.Menu value={this.state.action} header='Mouse Action' itemClicked={this.actionChanged.bind(this)}>
                    <wjInput.MenuItem value="Zoom">Zoom</wjInput.MenuItem>
                    <wjInput.MenuItem value="Pan">Pan</wjInput.MenuItem>
                </wjInput.Menu>
                <wjInput.Menu value={this.state.axes} header='Interactive Axes' itemClicked={this.axesChanged.bind(this)}>
                    <wjInput.MenuItem value="X">X</wjInput.MenuItem>
                    <wjInput.MenuItem value="Y">Y</wjInput.MenuItem>
                    <wjInput.MenuItem value="XY">XY</wjInput.MenuItem>
                </wjInput.Menu>
                <button id="btnReset" className="btn btn-default" hidden={this.state.isTouch} disabled={!this.state.canReset} onClick={this.reset.bind(this)}>Reset Zoom</button>
            </div>
        </div>;
    }
    //
    initializeChart(flex) {
        this.theChart = flex;
        this.theChart.axisX.axisLine = false;
    }
    //
    initializeGestures(gestures) {
        setTimeout(() => {
            gestures.posX = 0.5;
            gestures.posY = 0.5;
            gestures.scaleX = 0.5;
            gestures.scaleY = 0.5;
            this.chartGestures = gestures;
            setTimeout(() => this.setState({ canReset: false }), 100);
        }, 100);
    }
    //
    actionChanged(menu) {
        if (!menu.selectedValue) {
            return;
        }
        this.setState({
            action: menu.selectedValue
        });
    }
    //
    axesChanged(menu) {
        if (!menu.selectedValue) {
            return;
        }
        this.setState({
            axes: menu.selectedValue
        });
    }
    //
    rangeChanged() {
        if (this.chartGestures) {
            this.setState({
                canReset: true
            });
        }
    }
    //
    reset() {
        if (this.chartGestures) {
            this.chartGestures.reset();
        }
        setTimeout(() => this.setState({ canReset: false }), 100);
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
