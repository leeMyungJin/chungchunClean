import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as chart from '@grapecity/wijmo.chart';
import * as wjRadar from '@grapecity/wijmo.react.chart.radar';
import * as wjChartAnimate from '@grapecity/wijmo.react.chart.animation';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjRadar.FlexRadar initialized={this.initialized.bind(this)} palette={chart.Palettes.cocoa} bindingX="country" chartType="Area">
                <wjRadar.FlexRadarAxis wjProperty="axisY" min={0} max={100}></wjRadar.FlexRadarAxis>
                <wjRadar.FlexRadarSeries binding="sales" name="Sales"></wjRadar.FlexRadarSeries>
                <wjRadar.FlexRadarSeries binding="downloads" name="Downloads"></wjRadar.FlexRadarSeries>
                <wjChartAnimate.FlexChartAnimation easing="Swing" animationMode="Series" duration={500}>
                </wjChartAnimate.FlexChartAnimation>
            </wjRadar.FlexRadar>
        </div>;
    }
    initialized(theChart) {
        let app = this;
        setTimeout(function () {
            theChart.itemsSource = app.state.data;
        }, 200);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
