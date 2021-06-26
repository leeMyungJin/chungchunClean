import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjCharts from '@grapecity/wijmo.chart';
import * as wiChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: wjCharts.Palettes.zen
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="Average Temperature of Tokyo" bindingX="month" itemsSource={this.state.data} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wiChartAnalytics.FlexChartErrorBar binding="temperature" value={1} errorAmount="StandardError" errorBarStyle={{ stroke: 'darkred', strokeWidth: 3 }}>
                </wiChartAnalytics.FlexChartErrorBar>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
