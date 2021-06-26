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
            data: getData(),
            tooltip: `<b>{date:MMM dd}</b><br/>
                    <table>
                    <tr><td>high</td><td>{high:c}</td><tr/>
                    <tr><td>low</td><td>{low:c}</td><tr/>
                    <tr><td>open</td><td>{open:c}</td><tr/>
                    <tr><td>close</td><td>{close:c}</td><tr/>
                    </table>`,
            palette: ['rgba(70,107,176,1)', 'rgba(200,180,34,1)', 'rgba(20,136,110,1)', 'rgba(181,72,54,1)',
                'rgba(110,89,68,1)', 'rgba(139,56,114,1)', 'rgba(115,178,43,1)', 'rgba(184,115,32,1)', 'rgba(20,20,20,1)']
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <Chart.FlexChart bindingX="date" itemsSource={this.state.data} chartType="Candlestick" tooltipContent="tooltip" palette={this.state.palette}>
                    <Chart.FlexChartSeries binding="high,low,open,close" name="Box Inc"></Chart.FlexChartSeries>
                    <Chart.FlexChartLegend position="None"></Chart.FlexChartLegend>
                </Chart.FlexChart>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
