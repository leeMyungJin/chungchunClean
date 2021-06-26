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
            data: getData(),
            palette: ['rgba(24,188,156,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)', 'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)']
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="Country GDP(B$)" bindingX="country" itemsSource={this.state.data} tooltipContent="" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries name="2016" binding="2016"></wjChart.FlexChartSeries>
                <wjChart.FlexChartDataLabel content="{y}"></wjChart.FlexChartDataLabel>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
