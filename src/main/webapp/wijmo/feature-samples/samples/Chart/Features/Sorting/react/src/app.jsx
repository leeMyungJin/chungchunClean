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
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <p>
                    Sort by:
                    <button id="btnNone" className="btn btn-default" onClick={this.sortOnClick.bind(this, null)}>None</button>
                    <button id="btnCountry" className="btn btn-default" onClick={this.sortOnClick.bind(this, 'country')}>Country</button>
                    <button id="btnSales" className="btn btn-default" onClick={this.sortOnClick.bind(this, 'sales')}>Sales</button>
                    <button id="btnExpenses" className="btn btn-default" onClick={this.sortOnClick.bind(this, 'expenses')}>Expenses</button>
                    <button id="btnDownloads" className="btn btn-default" onClick={this.sortOnClick.bind(this, 'downloads')}>Downloads</button>
                </p>
                <wjChart.FlexChart itemsSource={this.state.data} bindingX="country" initialized={this.initializeChart.bind(this)}>
                    <wjChart.FlexChartSeries binding="sales" name="Sales"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="expenses" name="Expenses"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="downloads" name="Downloads"></wjChart.FlexChartSeries>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
    }
    sortOnClick(prop) {
        let sd = this.theChart.collectionView.sortDescriptions;
        //
        sd.clear();
        sd.push(new wjCore.SortDescription(prop, true));
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
