import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import { getSales } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initializeChart = (flex) => {
            this.theChart = flex;
        };
        this.initializePie = (flex) => {
            flex.dataLabel.content = function (ht) {
                let sum = ht.chart.itemsSource.map((c) => c.actual).reduce((sum, cur) => sum + cur);
                return `${wjCore.Globalize.format(ht.value / sum, 'p0')}`;
            };
            this.thePie = flex;
        };
        this.chartSelectionChanged = () => {
            var selIndex = this.theChart._selectionIndex;
            let data = this.state.data;
            //
            if (selIndex == null || selIndex == -1) {
                this.setState({
                    pieData: data.category,
                    pieHeader: '2018 Product Sales',
                    bulletsData: data.category
                });
            }
            else {
                let d = data.month[selIndex];
                this.setState({
                    pieData: d.items,
                    pieHeader: d.month + ' Product Sales',
                    bulletsData: d.items
                });
            }
        };
        let data = getSales();
        this.state = {
            data: data,
            chartData: data.month,
            pieData: data.category,
            bulletsData: data.category,
            pieHeader: '2018 Product Sales'
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <div className="row">
                    <wjChart.FlexChart header="2018 Annual Sales" bindingX="month" selectionMode="Point" initialized={this.initializeChart} itemsSource={this.state.chartData} selectionChanged={this.chartSelectionChanged}>
                        <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                        <wjChart.FlexChartSeries binding="actual" name="Sales"></wjChart.FlexChartSeries>
                    </wjChart.FlexChart>
                </div>
                <div className="row">
                    <div className="col">
                        <wjChart.FlexPie header={this.state.pieHeader} bindingName="category" binding="actual" itemsSource={this.state.pieData} initialized={this.initializePie}>
                            <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                        </wjChart.FlexPie>
                    </div>
                    <div className="col">
                        <ul className="bullets">
                            {this.state.bulletsData.map((item) => {
            return <li key={item}>
                                        <label>{item.category}</label>
                                        <wjGauge.BulletGraph showText="Value" target={item.target} max={item.max} good={item.good} bad={item.bad} value={item.actual}>
                                        </wjGauge.BulletGraph>
                                    </li>;
        })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
