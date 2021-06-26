import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnnotation from '@grapecity/wijmo.react.chart.annotation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initChart = (sender) => {
            sender.dataLabel.content = this.customDataLabel;
            sender.tooltip.content = this.customTooltip;
        };
        this.customTooltip = (ht) => {
            let item = ht.item;
            return `<b>Movie:</b> ${item.movie} </br><b>Grossing:</b> ${item.gross}</br><b>rating:</b> ${item.rating}`;
        };
        this.customDataLabel = (ht) => {
            return ht.item.movie;
        };
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart chartType="Scatter" initialized={this.initChart}>
                <wjChart.FlexChartAxis wjProperty="axisY" labels={false} min={6} max={9} axisLine={true} majorGrid={false} origin={400000} majorUnit={1.5}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisX" labels={false} min={0} max={800000} axisLine={true} majorUnit={200000} origin={7.5}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartDataLabel connectingLine={true} offset={10}></wjChart.FlexChartDataLabel>
                <wjChart.FlexChartSeries name="data" itemsSource={this.state.data} bindingX="gross" binding="rating">
                </wjChart.FlexChartSeries>
                <wjChartAnnotation.FlexChartAnnotationLayer>
                    <wjChartAnnotation.FlexChartAnnotation type="Text" attachment="DataCoordinate" text="Lower Grossing, Higher Rating" position={2} point={{ x: 200000, y: 9 }}>
                    </wjChartAnnotation.FlexChartAnnotation>
                    <wjChartAnnotation.FlexChartAnnotation type="Text" attachment="DataCoordinate" text="Higher Grossing, Higher Rating" position={2} point={{ x: 600000, y: 9 }}>
                    </wjChartAnnotation.FlexChartAnnotation>
                    <wjChartAnnotation.FlexChartAnnotation type="Text" attachment="DataCoordinate" text="Lower Grossing, Lower Rating" point={{ x: 200000, y: 6 }}>
                    </wjChartAnnotation.FlexChartAnnotation>
                    <wjChartAnnotation.FlexChartAnnotation type="Text" attachment="DataCoordinate" text="Higher Grossing, Lower Rating" point={{ x: 600000, y: 6 }}>
                    </wjChartAnnotation.FlexChartAnnotation>
                </wjChartAnnotation.FlexChartAnnotationLayer>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
