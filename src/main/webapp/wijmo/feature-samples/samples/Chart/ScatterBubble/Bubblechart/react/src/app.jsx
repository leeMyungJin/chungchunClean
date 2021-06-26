import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initChart = (sender) => {
            sender.tooltip.content = this.customTooltip;
            this.chart = sender;
        };
        this.customTooltip = (ht) => {
            let item = ht.item;
            //
            return `<b>${item.country}</b>:<table className="chart-tip">` +
                `<tr><td>Sales</td><td>${wijmo.Globalize.format(item.sales, 'c0')}</td></tr>` +
                `<tr><td>Expenses</td><td>${wijmo.Globalize.format(item.expenses, 'c0')}</td></tr>` +
                `<tr><td>Downloads</td><td>${wijmo.Globalize.format(item.downloads, 'n0')}</td></tr>` +
                `</table>`;
        };
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart chartType="Bubble" bindingX="sales" itemsSource={this.state.data} initialized={this.initChart}>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Expenses" min={0}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Expenses" min={0} axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries binding="expenses,downloads">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
