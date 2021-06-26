import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className='container-fluid'>
            <wjChart.FlexChart itemsSource={this.state.data} header='Device Temperature Monitor' chartType='Line' bindingX='x' rendering={this.chartRendering.bind(this)}>
                <wjChart.FlexChartLegend position='None'/>
                <wjChart.FlexChartSeries binding='y' name='Temperature'/>
                <wjChart.FlexChartAxis wjProperty='axisY' min={0} max={100} majorGrid={false} title='Temperature(°C)'/>
            </wjChart.FlexChart>

        </div>;
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({ data: getData() });
        }, 1000);
    }
    chartRendering(s, e) {
        var xMin = s.axisX.actualMin.valueOf(), xMax = s.axisX.actualMax.valueOf(), yMin = s.axisY.actualMin, yMax = s.axisY.actualMax;
        if (isNaN(xMin) && isNaN(xMax)) {
            return;
        }
        this.drawAlarmZone(s, e.engine, xMin, 80, xMax, yMax, 'alarm-zone');
        this.drawAlarmZone(s, e.engine, xMin, 50, xMax, 80, 'warning-zone');
        this.drawAlarmZone(s, e.engine, xMin, yMin, xMax, 50, 'safe-zone');
    }
    drawAlarmZone(chart, engine, xMin, yMin, xMax, yMax, className) {
        var pt1 = chart.dataToPoint(xMin, yMin);
        var pt2 = chart.dataToPoint(xMax, yMax);
        engine.drawRect(Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y), Math.abs(pt2.x - pt1.x), Math.abs(pt2.y - pt1.y), className);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
