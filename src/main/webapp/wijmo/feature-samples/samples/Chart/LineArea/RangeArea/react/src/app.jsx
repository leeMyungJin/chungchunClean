import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getRawData } from './data';
class App extends React.Component {
    render() {
        let rawData = getRawData();
        return <wjChart.FlexChart chartType='Area'>
            <wjChart.FlexChartSeries itemsSource={calcRanges(rawData, 5, 95)} bindingX='day' binding='min,max' name='5% - 95%' style={{ fill: 'rgba(136, 189, 230, 0.2)', stroke: 'transparent' }}/>
            <wjChart.FlexChartSeries itemsSource={calcRanges(rawData, 25, 75)} bindingX='day' binding='min,max' name='25% - 75%' style={{ fill: 'rgba(136, 189, 230, 0.4)', stroke: 'transparent' }}/>
            <wjChart.FlexChartSeries itemsSource={rawData} bindingX='day' binding='time' name='raw data' chartType='Scatter' style={{ fill: 'black', stroke: 'transparent' }} symbolSize={4}/>
            <wjChart.FlexChartAxis wjProperty="axisY" title='time'/>
            <wjChart.FlexChartAxis wjProperty="axisX" title='day'/>
        </wjChart.FlexChart>;
    }
}
const calcRanges = (rawData, minPct, maxPct) => {
    let dict = {};
    let data = [];
    for (let i = 0; i < rawData.length; i++) {
        let day = rawData[i].day;
        if (!dict[day]) {
            dict[day] = [];
        }
        dict[day].push(rawData[i].time);
    }
    for (let d in dict) {
        let vals = dict[d];
        vals.sort((a, b) => a - b);
        let min = calcPecentile(vals, minPct); // vals[Math.ceil(minPct / 100 * vals.length)];
        let max = calcPecentile(vals, maxPct); //vals[Math.ceil(maxPct / 100 * vals.length)];
        data.push({ day: parseInt(d), min: min, max: max });
    }
    return data;
};
const calcPecentile = (vals, pct) => {
    let i = Math.ceil(pct / 100 * vals.length);
    if (i < 0) {
        i = 0;
    }
    else if (i >= vals.length) {
        i = vals.length - 1;
    }
    return vals[i];
};
ReactDOM.render(<App />, document.getElementById('app'));
