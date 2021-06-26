import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as chart from '@grapecity/wijmo.chart';
import * as wjChartAnnotation from '@grapecity/wijmo.react.chart.annotation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: chart.Palettes.light
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart chartType="Scatter" palette={this.state.palette}>
                <wjChart.FlexChartAxis wjProperty="axisY" title="weight(kg)" min={40} max={120} axisLine={true} majorGrid={false} majorUnit={10}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisX" title="height(cm)" min={140} max={200} majorUnit={10} axisLine={true}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries name="Male" itemsSource={this.state.data[0]} bindingX="height" binding="weight">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Female" itemsSource={this.state.data[1]} bindingX="height" binding="weight">
                </wjChart.FlexChartSeries>
                <wjChartAnnotation.FlexChartAnnotationLayer>
                    <wjChartAnnotation.FlexChartAnnotation type="Polygon" attachment="DataCoordinate" style={{ 'fill': 'red', 'opacity': 0.1 }}>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={147} y={105}></wjChart.FlexChartDataPoint>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={183} y={105}></wjChart.FlexChartDataPoint>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={183} y={42}></wjChart.FlexChartDataPoint>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={147} y={42}></wjChart.FlexChartDataPoint>
                    </wjChartAnnotation.FlexChartAnnotation>
                    <wjChartAnnotation.FlexChartAnnotation type="Polygon" attachment="DataCoordinate" style={{ 'fill': 'green', 'opacity': 0.1 }}>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={157} y={117}></wjChart.FlexChartDataPoint>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={199} y={117}></wjChart.FlexChartDataPoint>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={199} y={54}></wjChart.FlexChartDataPoint>
                        <wjChart.FlexChartDataPoint wjProperty="points" x={157} y={54}></wjChart.FlexChartDataPoint>
                    </wjChartAnnotation.FlexChartAnnotation>
                </wjChartAnnotation.FlexChartAnnotationLayer>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
