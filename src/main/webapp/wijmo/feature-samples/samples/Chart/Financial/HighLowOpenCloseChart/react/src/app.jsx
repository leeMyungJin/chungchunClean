import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            lmVisible: false
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="HighLowOpenClose" tooltipContent="" initialized={this.initializeChart.bind(this)}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries binding="high,low,open,close" name="Box Inc"></wjChart.FlexChartSeries>
                <wjChart.FlexChartLineMarker lines="Both" interaction="Move" isVisible={this.state.lmVisible} content={this.markerContent.bind(this)}></wjChart.FlexChartLineMarker>
            </wjChart.FlexChart>
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
    markerContent(ht) {
        if (ht.item) {
            let s = `<b>Date</b>: ${wjCore.Globalize.formatDate(ht.item.date, 'yyyy-MM-dd')}`;
            for (let key in ht.item) {
                if (key !== 'date') {
                    s += `</br> ${key}: ${ht.item[key]}`;
                }
            }
            return s;
        }
        else {
            return 'No items here...';
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
