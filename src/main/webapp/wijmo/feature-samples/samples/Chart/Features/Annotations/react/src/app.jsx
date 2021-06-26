import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Chart from '@grapecity/wijmo.react.chart';
import * as wjAnnotation from '@grapecity/wijmo.chart.annotation';
import { getData, getAnnotation } from './data';
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
                <Chart.FlexChart initialized={this.initializeFlexGrid.bind(this)} itemsSource={this.state.data} chartType="Line" bindingX="date">
                    <Chart.FlexChartSeries binding="sale"></Chart.FlexChartSeries>
                    <Chart.FlexChartLegend position="Left"></Chart.FlexChartLegend>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    initializeFlexGrid(flexChart) {
        this.flexChart = flexChart;
        this.annotationLayer = new wjAnnotation.AnnotationLayer(flexChart, getAnnotation());
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
