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
            palette: [
                'rgba(70,107,176,1)',
                'rgba(200,180,34,1)',
                'rgba(20,136,110,1)',
                'rgba(181,72,54,1)',
                'rgba(110,89,68,1)',
                'rgba(139,56,114,1)',
                'rgba(115,178,43,1)',
                'rgba(184,115,32,1)',
                'rgba(20,20,20,1)'
            ]
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart header="Country GDP" chartType="Bar" bindingX="year" stacking="Stacked" itemsSource={this.state.data} palette={this.state.palette}>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjChart.FlexChartSeries name="US" binding="US"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="China" binding="China"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Japan" binding="Japan"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Germany" binding="Germany"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="UK" binding="UK"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="France" binding="France"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="India" binding="India"></wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries name="Italy" binding="Italy"></wjChart.FlexChartSeries>
                <wjChart.FlexChartAxis wjProperty="axisY" reversed={true}></wjChart.FlexChartAxis>
                <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
