import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as Input from '@grapecity/wijmo.react.input';
import * as Chart from '@grapecity/wijmo.react.chart';
import * as ChartAnimation from '@grapecity/wijmo.react.chart.animation';
import { getData, getRandomData, getRandomValue } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flexChartPoints: 10,
            duration: 400,
            chartType: "Line",
            easing: 'Swing',
            animationMode: "All"
        };
    }
    render() {
        return <div className="container">
            <div className="form-group">
                <div className="container-fluid well">
                    <div className="row">
                        <Input.Menu value={this.state.chartType} header="Chart type" itemClicked={this.selectedTypeChanged.bind(this)}>
                            <Input.MenuItem value="Bar">Bar</Input.MenuItem>
                            <Input.MenuItem value="Column">Column</Input.MenuItem>
                            <Input.MenuItem value="Area">Area</Input.MenuItem>
                            <Input.MenuItem value="Line">Line</Input.MenuItem>
                            <Input.MenuItem value="LineSymbols">LineSymbols</Input.MenuItem>
                            <Input.MenuItem value="Spline">Spline</Input.MenuItem>
                            <Input.MenuItem value="SplineSymbols">SplineSymbols</Input.MenuItem>
                            <Input.MenuItem value="SplineArea">SplineArea</Input.MenuItem>
                            <Input.MenuItem value="Scatter">Scatter</Input.MenuItem>
                        </Input.Menu>
                        
                        <Input.Menu value={this.state.animationMode} header="Animation mode" itemClicked={this.animationModeChanged.bind(this)}>
                            <Input.MenuItem value="Point">Point</Input.MenuItem>
                            <Input.MenuItem value="Series">Series</Input.MenuItem>
                            <Input.MenuItem value="All">All</Input.MenuItem>
                        </Input.Menu>

                        <Input.Menu value={this.state.easing} header="Easing" itemClicked={this.selectedEasingChanged.bind(this)}>
                            <Input.MenuItem value="Linear">Linear</Input.MenuItem>
                            <Input.MenuItem value="Swing">Swing</Input.MenuItem>
                            <Input.MenuItem value="EaseInQuad">EaseInQuad</Input.MenuItem>
                            <Input.MenuItem value="EaseOutQuad">EaseOutQuad</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutQuad">EaseInOutQuad</Input.MenuItem>
                            <Input.MenuItem value="EaseInCubic">EaseInCubic</Input.MenuItem>
                            <Input.MenuItem value="EaseOutCubic">EaseOutCubic</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutCubic">EaseInOutCubic</Input.MenuItem>
                            <Input.MenuItem value="EaseInQuart">EaseInQuart</Input.MenuItem>
                            <Input.MenuItem value="EaseOutQuart">EaseOutQuart</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutQuart">EaseInOutQuart</Input.MenuItem>
                            <Input.MenuItem value="EaseInQuint">EaseInQuint</Input.MenuItem>
                            <Input.MenuItem value="EaseOutQuint">EaseOutQuint</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutQuint">EaseInOutQuint</Input.MenuItem>
                            <Input.MenuItem value="EaseInSine">EaseInSine</Input.MenuItem>
                            <Input.MenuItem value="EaseOutSine">EaseOutSine</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutSine">EaseInOutSine</Input.MenuItem>
                            <Input.MenuItem value="EaseInExpo">EaseInExpo</Input.MenuItem>
                            <Input.MenuItem value="EaseOutExpo">EaseOutExpo</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutExpo">EaseInOutExpo</Input.MenuItem>
                            <Input.MenuItem value="EaseInCirc">EaseInCirc</Input.MenuItem>
                            <Input.MenuItem value="EaseOutCirc">EaseOutCirc</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutCirc">EaseInOutCirc</Input.MenuItem>
                            <Input.MenuItem value="EaseInBack">EaseInBack</Input.MenuItem>
                            <Input.MenuItem value="EaseOutBack">EaseOutBack</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutBack">EaseInOutBack</Input.MenuItem>
                            <Input.MenuItem value="EaseInBounce">EaseInBounce</Input.MenuItem>
                            <Input.MenuItem value="EaseOutBounce">EaseOutBounce</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutBounce">EaseInOutBounce</Input.MenuItem>
                            <Input.MenuItem value="EaseInElastic">EaseInElastic</Input.MenuItem>
                            <Input.MenuItem value="EaseOutElastic">EaseOutElastic</Input.MenuItem>
                            <Input.MenuItem value="EaseInOutElastic">EaseInOutElastic</Input.MenuItem>
                        </Input.Menu>

                        <span> Duration </span>
                        <Input.InputNumber valueChanged={this.valueChanged.bind(this)} value={this.state.duration} min={200} max={5000} step={200} format="n0">
                        </Input.InputNumber>
                    </div>

                    <div className="row">
                        <button id="chartResetData" onClick={this.resetChartData.bind(this)} type="button" className="btn btn-default">
                            reset data
                        </button>
                        <Input.Menu header="Add" itemClicked={this.itemAdd.bind(this)}>
                            <Input.MenuItem>Add Series</Input.MenuItem>
                            <Input.MenuItem>Add First Point</Input.MenuItem>
                            <Input.MenuItem>Add Last Point</Input.MenuItem>
                        </Input.Menu>
                        <Input.Menu header="Remove" itemClicked={this.itemRemove.bind(this)}>
                            <Input.MenuItem>Remove Series</Input.MenuItem>
                            <Input.MenuItem>Remove First Point</Input.MenuItem>
                            <Input.MenuItem>Remove Last Point</Input.MenuItem>
                        </Input.Menu>
                    </div>
                </div>
            </div>
           
            <Chart.FlexChart itemsSource={this.state.data} legendToggle={true} chartType={this.state.chartType} bindingX="x" initialized={this.initializeChart.bind(this)}>
                <Chart.FlexChartSeries binding="y0" name="Y1"></Chart.FlexChartSeries>
                <Chart.FlexChartSeries binding="y1" name="Y2"></Chart.FlexChartSeries>
                <Chart.FlexChartSeries binding="y2" name="Y3"></Chart.FlexChartSeries>
                <ChartAnimation.FlexChartAnimation initialized={this.initializeAnimation.bind(this)} easing={this.state.easing} duration={this.state.duration}>
                </ChartAnimation.FlexChartAnimation>
            </Chart.FlexChart>
        </div>;
    }
    initializeChart(chart) {
        this.flexChart = chart;
        this._setDataSource();
    }
    initializeAnimation(animation) {
        this.chartAnimation = animation;
    }
    _setDataSource() {
        this.setState({
            data: getData(this.state.flexChartPoints)
        });
    }
    resetChartData() {
        this._setDataSource();
    }
    selectedTypeChanged(e) {
        console.log("selectedTypeIndexChanged " + e.selectedValue);
        if (e.selectedValue) {
            this.setState({
                chartType: e.selectedValue
            });
        }
    }
    selectedEasingChanged(e) {
        if (e.selectedValue) {
            this.setState({
                easing: e.selectedValue
            });
        }
    }
    itemAdd(args) {
        var idx = args.selectedIndex;
        if (idx > -1) {
            this.func('add', idx);
        }
    }
    itemRemove(args) {
        var idx = args.selectedIndex;
        if (idx > -1) {
            this.func('remove', idx);
        }
    }
    func(oper, idx) {
        var str = '', funcName;
        if (idx === 1) {
            str = 'FirstPoint';
        }
        else if (idx === 2) {
            str = 'LastPoint';
        }
        funcName = oper + 'ChartSeries' + str;
        this[funcName]();
    }
    addChartSeriesFirstPoint() {
        this.state.data.insert(0, getRandomData('added' + getRandomValue(1000)));
    }
    addChartSeriesLastPoint() {
        var data = this.state.data;
        data.push(getRandomData('added' + getRandomValue(1000)));
        this.setState({
            data: data
        });
    }
    removeChartSeriesFirstPoint() {
        if (this.state.data.length) {
            var data = this.state.data;
            data.removeAt(0);
            this.setState({
                data: data
            });
        }
    }
    removeChartSeriesLastPoint() {
        if (this.state.data.length) {
            var data = this.state.data;
            data.pop();
            this.setState({
                data: data
            });
        }
    }
    valueChanged(sender) {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        //this.duration = sender.value;
        if (this.chartAnimation) {
            this.chartAnimation.duration = sender.value;
            this.setState({
                duration: sender.value
            });
        }
    }
    addChartSeries() {
        var chart = this.flexChart, len = chart.series.length;
        if (len >= 5) {
            return;
        }
        var series = new wjChart.Series();
        series.binding = len ? 'y' + len : 'y';
        series.name = 'Y' + (chart.series.length + 1);
        chart.series.push(series);
    }
    removeChartSeries() {
        var chart = this.flexChart;
        if (chart.series.length <= 0) {
            return;
        }
        chart.series.pop();
    }
    animationModeChanged(e) {
        if (e.selectedValue) {
            this.setState({
                animationMode: e.selectedValue
            });
        }
        if (this.chartAnimation) {
            this.chartAnimation.animationMode = this.state.animationMode;
            this.flexChart.refresh(true);
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
