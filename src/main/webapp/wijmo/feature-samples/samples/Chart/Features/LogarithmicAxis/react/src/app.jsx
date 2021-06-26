import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            logBase: 10
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="logScale">Log Scale</label>
                <input id="logScale" type="checkbox" defaultChecked onClick={this.changeLogBase.bind(this)}/>
                <wjChart.FlexChart itemsSource={this.state.data} chartType="Bubble" bindingX="pop" tooltipContent="&lt;b&gt;{country}&lt;/b&gt;:&lt;br/&gt;{pci:n0} US$/year/capita">
                    <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                    <wjChart.FlexChartSeries name="GDP" binding="gdp,pci"></wjChart.FlexChartSeries>
                    <wjChart.FlexChartAxis wjProperty="axisX" title="Population (millions)" axisLine={true} format="g4,," logBase={this.state.logBase}>
                    </wjChart.FlexChartAxis>
                    <wjChart.FlexChartAxis wjProperty="axisY" title="GDP (US$ billions)" format="g4," logBase={this.state.logBase}>
                    </wjChart.FlexChartAxis>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    changeLogBase(chk) {
        this.setState({
            logBase: chk.target.checked ? 10 : null
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
