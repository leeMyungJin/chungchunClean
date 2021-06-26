import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Chart from '@grapecity/wijmo.react.chart';
import * as Input from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        //
        this.chartInitialized = (sender) => {
            this.theChart = sender;
            //
            this.theChart.options = {
                step: {
                    position: 'center'
                }
            };
        };
        this.state = {
            data: getData(),
            chartType: 'Step',
            chartTypeSource: ['Step', 'StepSymbols', 'StepArea'],
            stepPositionSource: ['Start', 'Center', 'End'],
        };
    }
    //
    render() {
        return <div className="container-fluid">
            <div>
                <label>Chart Type: </label>
                <Input.ComboBox itemsSource={this.state.chartTypeSource} textChanged={this.chartTypeChanged.bind(this)} text={this.state.chartType}>
                </Input.ComboBox>
                <label>Step Position: </label>
                <Input.ComboBox itemsSource={this.state.stepPositionSource} textChanged={this.stepPositionChanged.bind(this)} text='Center'>
                </Input.ComboBox>
            </div>

            <div className="form-group">
                <Chart.FlexChart chartType={this.state.chartType} bindingX="month" itemsSource={this.state.data} initialized={this.chartInitialized}>
                    <Chart.FlexChartAxis wjProperty="axisX" axisLine={false} majorTickMarks="None"></Chart.FlexChartAxis>
                    <Chart.FlexChartAxis wjProperty="axisY" majorGrid={false}></Chart.FlexChartAxis>
                    <Chart.FlexChartSeries binding="sms" name="SMS Totals"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="email" name="Email Totals"></Chart.FlexChartSeries>
                    <Chart.FlexChartLegend position="Top"></Chart.FlexChartLegend>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    //
    chartTypeChanged(combo) {
        this.setState({
            chartType: combo.text
        });
    }
    //
    stepPositionChanged(combo) {
        if (this.theChart) {
            this.theChart.options.step.position = combo.text.toLowerCase();
            this.theChart.refresh();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
