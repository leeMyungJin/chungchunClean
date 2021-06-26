import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart chartType="Scatter" bindingX="x" itemsSource={this.state.data}>
                <wjChart.FlexChartSeries name="Raw Data" binding="y">
                </wjChart.FlexChartSeries>
                <wjChartAnalytics.FlexChartTrendLine name="TrendLine" binding="y" fitType="Polynomial" order={2} style={{ stroke: 'darkred', strokeWidth: 3 }}></wjChartAnalytics.FlexChartTrendLine>
                <wjChartAnalytics.FlexChartMovingAverage name="MovingAverage" binding="y" period={6} style={{ stroke: 'orange', strokeWidth: 3 }}></wjChartAnalytics.FlexChartMovingAverage>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
