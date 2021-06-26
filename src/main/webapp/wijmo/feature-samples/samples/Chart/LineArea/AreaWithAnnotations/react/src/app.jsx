import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import * as wjChartAnnotation from '@grapecity/wijmo.react.chart.annotation';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: ['rgba(0,95,173,1)', 'rgba(240,100,0,1)', 'rgba(0,147,48,1)', 'rgba(228,0,177,1)', 'rgba(182,88,0,1)', 'rgba(106,39,156,1)', 'rgba(213,162,17,1)', 'rgba(220,1,39,1)', 'rgba(0,0,0,1)']
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="date" chartType="SplineArea" palette={this.state.palette}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisY" min={797}></wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="close" name="Alphabet Inc"></wjChart.FlexChartSeries>

                <wjChartAnnotation.FlexChartAnnotationLayer>
                    <wjChartAnnotation.FlexChartAnnotation type='Rectangle' attachment="DataIndex" pointIndex={33} position="Top" tooltip="Something <b>negative</b><br/>happened today..." content="N" width={20} height={20} style={{ fill: '#01DFD7', stroke: '#000000' }}>
                    </wjChartAnnotation.FlexChartAnnotation>

                    <wjChartAnnotation.FlexChartAnnotation type='Rectangle' attachment="DataIndex" pointIndex={27} position="Top" tooltip="Something <b>positive</b><br/>happened today..." content="P" width={20} height={20} style={{ fill: '#01DFD7', stroke: '#000000' }}>
                    </wjChartAnnotation.FlexChartAnnotation>

                    <wjChartAnnotation.FlexChartAnnotation type='Image' href="https://maps.google.com/mapfiles/marker_green.png" width={15} point={{ x: new Date(2017, 1, 7), y: 800 }} height={30} attachment="DataCoordinate" tooltip="Time to buy!">
                    </wjChartAnnotation.FlexChartAnnotation>

                    <wjChartAnnotation.FlexChartAnnotation type='Image' href="https://maps.google.com/mapfiles/marker_yellow.png" width={15} point={{ x: new Date(2017, 1, 24), y: 800 }} height={30} attachment="DataCoordinate" tooltip="Turbulence ahead...">
                    </wjChartAnnotation.FlexChartAnnotation>

                    <wjChartAnnotation.FlexChartAnnotation type='Image' href="https://maps.google.com/mapfiles/marker_green.png" width={15} point={{ x: new Date(2017, 2, 5), y: 800 }} height={30} attachment="DataCoordinate" tooltip="All is fine again...">
                    </wjChartAnnotation.FlexChartAnnotation>
                </wjChartAnnotation.FlexChartAnnotationLayer>

                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
