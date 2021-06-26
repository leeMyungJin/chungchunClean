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
        this.onChartInitialized = (sender) => {
            this.chart = sender;
        };
        this.$_addPoints = () => {
            // append new points, remove old points
            let arr = this.chart.collectionView.sourceCollection, pt = arr[arr.length - 1], y = Math.random() * 100;
            //
            arr.push({ x: pt.x + 1, y: y });
            arr.splice(0, 1);
            //
            // update chart
            this.chart.collectionView.refresh();
            //
            // and keep updating
            setTimeout(() => this.$_addPoints(), 1000);
        };
        this.state = {
            data: getData(200)
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} header="CPU Utilization" bindingX="x" chartType="Line" initialized={this.onChartInitialized}>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisX" position="None"></wjChart.FlexChartAxis>
                <wjChart.FlexChartAxis wjProperty="axisY" title="Utilization(%)" min={0} max={100}>
                </wjChart.FlexChartAxis>
                <wjChart.FlexChartSeries binding="y"></wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
    componentDidMount() {
        this.$_addPoints();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
