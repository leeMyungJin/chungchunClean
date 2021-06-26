import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Chart from '@grapecity/wijmo.react.chart';
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
        return <div className="container">
            <div className="form-group">
                <Chart.FlexChart chartType="Scatter" itemFormatter={this.itemFormatter.bind(this)}>
                    <Chart.FlexChartAxis wjProperty="axisY" axisLine={true}>
                    </Chart.FlexChartAxis>
                    <Chart.FlexChartSeries name="Series" bindingX="x" binding="y" itemsSource={this.state.data}>
                    </Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    itemFormatter(engine, hitTestInfo, defaultRenderer) {
        var ht = hitTestInfo;
        if (ht.x < 0) {
            engine.stroke = 'red';
            engine.fill = 'rgba(255,0,0,0.7)';
        }
        defaultRenderer();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
