import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initChart = (sender) => {
            sender.tooltip.content = '{seriesName}: <b>{x}</b>';
        };
        this.randomizeData = () => {
            this.setState({ data: getData() });
        };
        this.updateInnerPointsStatus = (target) => {
            this.setState({ showInnerPoints: target.checked });
        };
        this.updateOutliers = (target) => {
            this.setState({ showOutliers: target.checked });
        };
        this.updateMeanLine = (target) => {
            this.setState({ showMeanLine: target.checked });
        };
        this.updateMeanMarker = (target) => {
            this.setState({ showMeanMarker: target.checked });
        };
        this.updateRrotated = (target) => {
            this.setState({ rotated: target.checked });
        };
        this.state = {
            data: getData(),
            rotated: false,
            showMeanLine: false,
            showMeanMarker: false,
            showInnerPoints: false,
            showOutliers: false,
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return Palettes[palettes[rand]];
            })()
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="innerPoints">Show Inner Points:</label>
                <input id="innerPoints" type="checkbox" defaultChecked={false} onChange={e => this.updateInnerPointsStatus(e.target)}/>

                <label htmlFor="outliers">Show Outliers:</label>
                <input id="outliers" type="checkbox" defaultChecked={false} onChange={e => this.updateOutliers(e.target)}/>
            </div>
            <div className="form-group">
                <label htmlFor="meanline">Show Mean Line:</label>
                <input id="meanline" type="checkbox" defaultChecked={false} onChange={e => this.updateMeanLine(e.target)}/>

                <label htmlFor="meanmarker">Show Mean Marker:</label>
                <input id="meanmarker" type="checkbox" defaultChecked={false} onChange={e => this.updateMeanMarker(e.target)}/>
            </div>
            <div className="form-group">
                <label htmlFor="rotated">Rotated:</label>
                <input id="rotated" type="checkbox" defaultChecked={false} onChange={e => this.updateRrotated(e.target)}/>

                <label htmlFor="btnRandomize">Randomize Data</label>
                <button id="btnRandomize" className="btn btn-default" onClick={this.randomizeData}>
                    Go
            </button>
            </div>

            <wjChart.FlexChart bindingX="country" itemsSource={this.state.data} initialized={this.initChart} palette={this.state.palette} rotated={this.state.rotated}>
                <wjChartAnalytics.FlexChartBoxWhisker binding="sales" name="Sales" groupWidth={0.7} gapWidth={0.2} showMeanLine={this.state.showMeanLine} showMeanMarker={this.state.showMeanMarker} showInnerPoints={this.state.showInnerPoints} showOutliers={this.state.showOutliers}>
                </wjChartAnalytics.FlexChartBoxWhisker>
                <wjChartAnalytics.FlexChartBoxWhisker binding="expenses" name="Expenses" groupWidth={0.7} gapWidth={0.2} showMeanLine={this.state.showMeanLine} showMeanMarker={this.state.showMeanMarker} showInnerPoints={this.state.showInnerPoints} showOutliers={this.state.showOutliers}>
                </wjChartAnalytics.FlexChartBoxWhisker>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
