import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
import { getData, getComboData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.randomizeData = () => {
            this.setState({ data: getData() });
        };
        this.onChartTypeChanged = (sender) => {
            this.setState({ chartType: sender.selectedValue });
        };
        this.onErrorChanged = (sender) => {
            this.setState({
                errorValue: sender.selectedItem.value,
                errorMode: sender.selectedItem.mode
            });
        };
        this.state = {
            data: getData(),
            comboData: getComboData(),
            chartTypes: ['Column', 'Bar', 'Scatter', 'Line', 'LineSymbols', 'Area', 'Spline', 'SplineSymbols', 'SplineArea'],
            chartType: 'Column',
            errorValue: null,
            errorMode: 'Custom',
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
                <label htmlFor="chartType">Chart Type:</label>
                <wjInput.ComboBox id="chartType" itemsSource={this.state.chartTypes} selectedIndexChanged={this.onChartTypeChanged}>
                </wjInput.ComboBox>
            </div>
            <div className="form-group">
                <label htmlFor="error">Error</label>
                <wjInput.ComboBox id="error" displayMemberPath="hdr" itemsSource={this.state.comboData} selectedIndexChanged={this.onErrorChanged}>
                </wjInput.ComboBox>
            </div>
            <div className="form-group">
                <label htmlFor="btnRandomize">Randomize Data</label>
                <button id="btnRandomize" className="btn btn-default" onClick={this.randomizeData}>
                    Go
                </button>
            </div>

            <wjChart.FlexChart bindingX="date" itemsSource={this.state.data} palette={this.state.palette} chartType={this.state.chartType}>
                <wjChartAnalytics.FlexChartErrorBar binding={this.state.errorValue ? 'amount' : 'amount,errorPlus,errorMinus'} name="Sales" groupWidth={0.7} gapWidth={0.2} errorBarStyle={{ stroke: 'darkred', strokeWidth: 3 }} value={this.state.errorValue} errorAmount={this.state.errorMode}>
                </wjChartAnalytics.FlexChartErrorBar>
            </wjChart.FlexChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
