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
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjChart.FlexChart header="Country GDP" itemsSource={this.state.data} bindingX="country">
                    <wjChart.FlexChartSeries binding="2014" name="2014" style={{ fill: 'green', stroke: 'darkgreen', strokeWidth: 1 }}>
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="2015" name="2015" style={{ fill: 'red', stroke: 'darkred', strokeWidth: 1 }}>
                    </wjChart.FlexChartSeries>
                    <wjChart.FlexChartSeries binding="2016" name="2016" chartType="LineSymbols" style={{ stroke: 'orange', strokeWidth: 5 }} symbolStyle={{ fill: 'gold', stroke: 'gold' }}>
                    </wjChart.FlexChartSeries>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
