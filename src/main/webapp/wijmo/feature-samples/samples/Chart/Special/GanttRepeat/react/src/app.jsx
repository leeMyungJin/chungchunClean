import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.chartInitialized = (sender) => {
            sender.tooltip.content = this.getTooltipContent;
        };
        this.getTooltipContent = (ht) => {
            var str = wijmo.format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
                name: ht.item.name,
                start: ht.item.start,
                end: ht.item.end
            });
            return str;
        };
        // replace item index with item name in Y axis
        this.formatter = (engine, label) => {
            for (let i = 0; i < this.state.data.length; i++) {
                let item = this.state.data[i];
                if (item.index == label.val) {
                    label.text = item.name;
                    break;
                }
            }
            return label;
        };
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} chartType="Bar" bindingX="index" plotMargin="auto auto auto 180" initialized={this.chartInitialized}>
                <wjChart.FlexChartSeries binding="start,end"/>
                <wjChart.FlexChartAxis wjProperty="axisY" majorGrid={false} minorGrid={true} reversed={true} itemFormatter={this.formatter}/>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
