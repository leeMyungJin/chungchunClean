import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as chart from '@grapecity/wijmo.chart';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.itemFormatter = (engine, ht, defaultFormat) => {
            let binding = 'downloads';
            //
            // check that this is the right series/element
            if (ht.series.binding == binding && ht.pointIndex > 0 &&
                ht.chartElement == chart.ChartElement.SeriesSymbol) {
                //
                // get current and previous values
                let chart = ht.series.chart, items = chart.collectionView.items, valNow = items[ht.pointIndex][binding], valPrev = items[ht.pointIndex - 1][binding];
                //
                // add line if value is increasing
                if (valNow > valPrev) {
                    let pt1 = chart.dataToPoint(ht.pointIndex, valNow), pt2 = chart.dataToPoint(ht.pointIndex - 1, valPrev);
                    //
                    engine.drawLine(pt1.x, pt1.y, pt2.x, pt2.y, null, {
                        stroke: 'gold',
                        strokeWidth: 6
                    });
                }
            }
            //
            // render element as usual
            defaultFormat();
        };
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="country" itemFormatter={this.itemFormatter}>
                <wjChart.FlexChartSeries binding="sales" name="Sales">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="expenses" name="Expenses">
                </wjChart.FlexChartSeries>
                <wjChart.FlexChartSeries binding="downloads" name="Downloads" chartType="Line">
                </wjChart.FlexChartSeries>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
