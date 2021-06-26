import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as Chart from '@grapecity/wijmo.react.chart';
import * as Input from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        //
        let d = getData(), minD = d[d.length - 1].date, maxD = d[0].date;
        this.state = {
            data: getData(),
            minDate: minD,
            maxDate: maxD,
            min: new Date(minD.getFullYear(), minD.getMonth(), 1),
            max: new Date(maxD.getFullYear(), maxD.getMonth() + 1, 0),
            palette: this.getRandomPalette()
        };
    }
    //
    render() {
        return <div className="container">
            <div className="form-group">
                <p>
                    <b>Filter: </b>
                    <Input.InputDate placeholder="Select Month" selectionMode="Month" format="MMMM yyyy" isRequired={false} value={this.state.maxDate} min={this.state.min} max={this.state.max} initialized={this.inputInitialized.bind(this)} valueChanged={this.dateChanged.bind(this)}>
                    </Input.InputDate>
                    <button id="btnResetFilter" className="btn btn-default" onClick={this.resetFilter.bind(this)}>Reset</button>
                </p>

                <p>
                    <b>Zoom: </b>
                    <button id="btnZoomIn" className="btn btn-default" onClick={this.applyZoom.bind(this, 0.9)}>In</button>
                    <button id="btnZoomOut" className="btn btn-default" onClick={this.applyZoom.bind(this, 1.1)}>Out</button>
                    <button id="btnResetZoom" className="btn btn-default" onClick={this.applyZoom.bind(this, null)}>Reset</button>
                    <span>You can also zoom with ctrl+mouse wheel.</span>
                </p>

                <Chart.FlexChart chartType="Candlestick" bindingX="date" itemsSource={this.state.data} palette={this.state.palette} initialized={this.chartInitialized.bind(this)}>
                    <Chart.FlexChartLegend position="None"></Chart.FlexChartLegend>
                    <Chart.FlexChartSeries binding="high,low,open,close" name="Alphabet Inc">
                    </Chart.FlexChartSeries>
                </Chart.FlexChart>
            </div>
        </div>;
    }
    //
    inputInitialized(flex) {
        this.theMonth = flex;
    }
    //
    chartInitialized(flex) {
        this.theChart = flex;
        this.dateChanged();
        // zoom with the mouse wheel
        flex.hostElement.addEventListener('wheel', e => {
            if (e.ctrlKey) {
                let center = this.theChart.pointToData(e.clientX, e.clientY);
                this.applyZoom(e.deltaY > 0 ? 1.1 : .9, center);
                e.preventDefault();
            }
        });
    }
    //
    dateChanged() {
        // reset the chart zoom
        this.applyZoom(null);
        //
        // apply filter to chart data
        this.theChart.collectionView.filter = item => {
            if (this.theMonth.value == null) {
                return true; // no filter
            }
            //
            return (item.date.getFullYear() == this.theMonth.value.getFullYear()) &&
                (item.date.getMonth() == this.theMonth.value.getMonth());
        };
    }
    //
    resetFilter() {
        this.theMonth.value = null;
    }
    //
    applyZoom(factor, center) {
        let chart = this.theChart;
        this.applyZoomAxis(chart.axisX, factor, center ? center.x : null);
        this.applyZoomAxis(chart.axisY, factor, center ? center.y : null);
    }
    //
    applyZoomAxis(axis, factor, center) {
        if (!factor) { // reset
            axis.min = axis.max = null;
        }
        else {
            let min = (axis.min != null ? axis.min : axis.actualMin).valueOf(), max = (axis.max != null ? axis.max : axis.actualMax).valueOf();
            //
            if (center == null) {
                center = (min + max) / 2;
            }
            //
            axis.min = center - (center - min) * factor;
            axis.max = center + (max - center) * factor;
        }
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
