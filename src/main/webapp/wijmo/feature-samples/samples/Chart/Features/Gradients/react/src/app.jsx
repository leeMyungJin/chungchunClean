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
            data: getData()
        };
    }
    render() {
        return <div className="container">
            <div className="form-group">
                <Chart.FlexChart chartType="Area" stacking="Stacked" bindingX="country" itemsSource={this.state.data} initialized={this.chartInitialized.bind(this)}>
                    <Chart.FlexChartSeries binding="expenses" name="Expenses"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="sales" name="Sales"></Chart.FlexChartSeries>
               </Chart.FlexChart>
            </div>
        </div>;
    }
    chartInitialized(flex) {
        flex.series[0].style = { fill: 'l(0, 0, 0, 1)#ff0000-#ff0000:1:0.5', stroke: 'darkred', strokeWidth: 1 };
        flex.series[1].style = { fill: 'l(0, 0, 0, 1)#00b050-#00b050:1:0.5', stroke: 'darkgreen', strokeWidth: 1 };
        flex.invalidate();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
