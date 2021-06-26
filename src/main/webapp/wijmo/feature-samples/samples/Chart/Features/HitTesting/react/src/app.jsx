import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//    
import { isArray, format, Rect, Tooltip } from '@grapecity/wijmo';
import { ChartElement, Palettes } from '@grapecity/wijmo.chart';
import * as Chart from '@grapecity/wijmo.react.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container">
           <div className="form-group">
                <Chart.FlexChart tooltipContent="" header="Header" footer="Footer" chartType="LineSymbols" bindingX="country" palette={this.state.palette} itemsSource={this.state.data} initialized={this.chartInitialized.bind(this)}>
                    <Chart.FlexChartDataLabel content="{value:n0}" position="Top" offset={5}></Chart.FlexChartDataLabel>
                    <Chart.FlexChartSeries binding="sales" name="Sales"></Chart.FlexChartSeries>
                    <Chart.FlexChartSeries binding="expenses" name="Expenses"></Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    chartInitialized(flex) {
        this.theChart = flex;
        this.theChart.tooltip.content = null;
        // use tooltip to show hit-test information
        let tt = new Tooltip(), tip = '';
        //
        this.theChart.hostElement.addEventListener('mousemove', e => {
            // build tooltip text
            let ht = this.theChart.hitTest(e), elem = ht.chartElement, series = (ht.series && [1, 2, 3].indexOf(elem) < 0) ? ht.series : null, index = (ht.pointIndex != null && series) ? ht.pointIndex : null, newTip = format('chartElement: <b>{elem}</b><br/>series: <b>{series}</b><br/>pointIndex: <b>{index}</b>', {
                elem: ChartElement[elem],
                series: series ? series.name : 'none',
                index: index != null ? index : 'none'
            });
            //
            // update tooltip
            if (newTip != tip) {
                tip = newTip;
                tt.show(e.target, tip, new Rect(e.clientX, e.clientY, 0, 0));
            }
        });
        //
        this.theChart.hostElement.addEventListener('mouseleave', e => {
            tt.hide();
            tip = '';
        });
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
