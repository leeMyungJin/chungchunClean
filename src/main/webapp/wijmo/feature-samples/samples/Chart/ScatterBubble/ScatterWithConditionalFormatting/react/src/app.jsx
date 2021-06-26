import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(120, -100, 24)
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart chartType="Scatter" itemFormatter={this.customFormatter}>
                <wjChart.FlexChartAxis wjProperty="axisY" axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisX" axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries name="Series" itemsSource={this.state.data} bindingX="x" binding="y">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
    customFormatter(engine, ht, defaultRenderer) {
        if (ht.x < 0) {
            engine.stroke = 'red';
            engine.fill = 'rgba(255,0,0,0.7)';
        }
        defaultRenderer();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
