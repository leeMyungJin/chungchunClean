import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = () => {
            let view = this.state.data;
            //
            view.deferUpdate(() => {
                view.items.forEach(item => {
                    item.sales += (Math.random() - .5) * .5 * item.sales;
                });
            });
        };
        this.state = {
            data: getData(),
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return Palettes[palettes[rand]];
            })()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <button id="btnUpdate" className="btn btn-default" onClick={this.updateData}>Update</button>
            </div>
            <wjChart.FlexChart itemsSource={this.state.data} palette={this.state.palette} chartType="Column" binding="make">
                <wjChart.FlexChartAxis wjProperty="axisY" format="n0" title="Sales (thousands)" axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisX" labelAngle={-90}></wjChart.FlexChartAxis>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries binding="sales" name="Sales (thousands)"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="cumSales" name="Cumulative Sales" chartType="Line" style={{ 'stroke': 'orange', 'strokeWidth': 4 }}>
                    <wjChart.FlexChartAxis wjProperty="axisY" position="Right" title="Cumulative Sales" format="p0" min={0} axisLine={true}>
                    </wjChart.FlexChartAxis>
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
