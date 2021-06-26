import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="Balance of trade in 2015 ($Billions) of the United States" bindingX="product" itemsSource={this.state.data}>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries name="Exports" binding="exports"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Imports" binding="imports"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Difference" binding="difference"></wjChart.FlexChartSeries>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
