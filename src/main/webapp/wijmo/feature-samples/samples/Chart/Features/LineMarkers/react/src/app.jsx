import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            linesData: 'None,Vertical,Horizontal,Both'.split(','),
            interactionData: 'None,Move,Drag'.split(','),
            lines: 'Both',
            interaction: 'Move',
            lmVisible: false
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="lines">Lines: </label>
                <wjInput.ComboBox itemsSource={this.state.linesData} selectedValue={this.state.lines} textChanged={this.lineChanged.bind(this)}></wjInput.ComboBox><br />
                <label htmlFor="interaction">Interaction: </label>
                <wjInput.ComboBox itemsSource={this.state.interactionData} selectedValue={this.state.interaction} textChanged={this.interactionChanged.bind(this)}></wjInput.ComboBox>
                <wjChart.FlexChart chartType="Line" bindingX="date" itemsSource={this.state.data} initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartSeries binding="value" name="Value" tooltipContent=""></wjChart.FlexChartSeries>
                    <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false}></wjChart.FlexChartAxis>
                    <wjChart.FlexChartLineMarker lines={this.state.lines} interaction={this.state.interaction} isVisible={this.state.lmVisible} content={this.markerContent.bind(this)}>
                    </wjChart.FlexChartLineMarker>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        // show the marker when the mouse is over the chart
        flex.addEventListener(flex.hostElement, 'mouseenter', () => {
            this.setState({
                lmVisible: true
            });
        });
        flex.addEventListener(flex.hostElement, 'mouseleave', () => {
            this.setState({
                lmVisible: false
            });
        });
    }
    lineChanged(flex) {
        this.setState({
            lines: flex.selectedValue
        });
    }
    interactionChanged(flex) {
        this.setState({
            interaction: flex.selectedValue
        });
    }
    markerContent(ht) {
        return ht.item
            ? wjCore.format('The value on <b>{date:MMM d, yyyy}</b><br/>is <b>{value:c}</b>', ht.item)
            : 'No items here...';
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
