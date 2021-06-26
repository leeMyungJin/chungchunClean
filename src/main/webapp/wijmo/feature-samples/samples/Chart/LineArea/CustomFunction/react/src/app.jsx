import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.yFunc = (x) => {
            return Math.sin(4 * x) * Math.cos(3 * x);
        };
        this.paramXFunc = (t) => {
            return 10 * Math.cos(5 * t);
        };
        this.paramYFunc = (t) => {
            return Math.sin(6 * t);
        };
        this.state = {
            max: 2 * Math.PI
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart>
                <wjChartAnalytics.FlexChartYFunctionSeries name="y = f(x)" min={-10} max={10} sampleCount={300} func={this.yFunc}>
                </wjChartAnalytics.FlexChartYFunctionSeries>
                <wjChartAnalytics.FlexChartParametricFunctionSeries name="x = f(t); y = g(t)" min={0} max={this.state.max} sampleCount={1000} xFunc={this.paramXFunc} yFunc={this.paramYFunc}>
                </wjChartAnalytics.FlexChartParametricFunctionSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
