import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onWaterfallInitialized = (sender) => {
            sender.styles = {
                start: { fill: 'blue', stroke: 'blue' },
                total: { fill: 'yellow', stroke: 'yellow' },
                falling: { fill: 'red', stroke: 'red' },
                rising: { fill: 'green', stroke: 'green' },
                connectorLines: { stroke: 'blue', 'stroke-dasharray': '3, 1' }
            };
        };
        this.randomizeData = () => {
            this.setState({ data: getData() });
        };
        this.updateConnectorLinesStatus = (target) => {
            this.setState({ connectorLines: target.checked });
        };
        this.updateTotalStatus = (target) => {
            this.setState({ showTotal: target.checked });
        };
        this.state = {
            data: getData(),
            connectorLines: false,
            showTotal: false
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="iptConnectorLines">Show Connector Lines: </label>
                <input id="iptConnectorLines" type="checkbox" defaultChecked={false} onChange={e => this.updateConnectorLinesStatus(e.target)}/>
            </div>

            <div className="form-group">
                <label htmlFor="iptShowTotal">Show Total Bar: </label>
                <input id="iptShowTotal" type="checkbox" defaultChecked={false} onChange={e => this.updateTotalStatus(e.target)}/>
            </div>

            <div className="form-group">
                <label htmlFor="btnRandomize">Randomize Data</label>
                <button id="btnRandomize" className="btn btn-default" onClick={this.randomizeData}>
                    Go
            </button>
            </div>
            <wjChart.FlexChart itemsSource={this.state.data} bindingX="date">
                <wjChartAnalytics.FlexChartWaterfall name="Increase,Decrease,Total" binding="sales" connectorLines={this.state.connectorLines} showTotal={this.state.showTotal} initialized={this.onWaterfallInitialized}></wjChartAnalytics.FlexChartWaterfall>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
