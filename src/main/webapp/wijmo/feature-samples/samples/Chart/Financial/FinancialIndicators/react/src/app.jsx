import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjFinance from '@grapecity/wijmo.react.chart.finance';
import * as wjFinanceAnalytics from '@grapecity/wijmo.react.chart.finance.analytics';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData, getIndicatorList } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initializeChart = (flex) => {
            flex.tooltip.content = this.state.tooltip;
            this.theChart = flex;
        };
        this.initializeIChart = (flex) => {
            flex.tooltip.content = this.state.tooltip;
            this.iChart = flex;
        };
        this.typeChanged = (combo) => {
            this.setState({ selectedIndicator: combo.selectedValue });
        };
        this.chartRendered = () => {
            this.iChart.axisX.min = this.theChart.axisX.actualMin;
            this.iChart.axisX.max = this.theChart.axisX.actualMax;
        };
        this.fastPeriodChanged = (input) => {
            var data = this.state.data, props = this.state.properties, len, smoothing;
            if (data.length <= 0) {
                return;
            }
            len = data.length;
            smoothing = props.smoothingPeriod;
            props.fastPeriod = wjCore.clamp(input.value, 2, Math.abs(len - smoothing));
            this.setState({ properties: props });
        };
        this.slowPeriodChanged = (input) => {
            var data = this.state.data, props = this.state.properties, len, smoothing;
            if (data.length <= 0) {
                return;
            }
            len = data.length;
            smoothing = props.smoothingPeriod;
            props.slowPeriod = wjCore.clamp(input.value, 2, Math.abs(len - smoothing));
            this.setState({ properties: props });
        };
        this.smoothingPeriodChanged = (input) => {
            var data = this.state.data, props = this.state.properties, len, max;
            if (data.length <= 0) {
                return;
            }
            len = data.length;
            max = Math.max(props.fastPeriod, props.slowPeriod);
            props.smoothingPeriod = wjCore.clamp(input.value, 2, Math.abs(len - max));
            this.setState({ properties: props });
        };
        this.stochKPeriodChanged = (input) => {
            var data = this.state.data, props = this.state.properties, len, max;
            if (data.length <= 0) {
                return;
            }
            len = data.length;
            max = Math.abs(len - props.stochDPeriod);
            if (props.stochSmoothingPeriod > 1) {
                max -= props.stochSmoothingPeriod;
            }
            props.stochKPeriod = wjCore.clamp(input.value, 2, max);
            this.setState({ properties: props });
        };
        this.stochDPeriodChanged = (input) => {
            var data = this.state.data, props = this.state.properties, len, max;
            if (data.length <= 0) {
                return;
            }
            len = data.length;
            max = Math.abs(len - props.stochKPeriod);
            if (props.stochSmoothingPeriod > 1) {
                max -= props.stochSmoothingPeriod;
            }
            props.stochDPeriod = wjCore.clamp(input.value, 2, max);
            this.setState({ properties: props });
        };
        this.stochSmoothingPeriodChanged = (input) => {
            var data = this.state.data, props = this.state.properties, len, max;
            if (data.length <= 0 || input.value <= 1) {
                return;
            }
            len = data.length;
            max = Math.abs(len - props.stochKPeriod - props.stochDPeriod);
            max = max || 1;
            props.stochSmoothingPeriod = wjCore.clamp(input.value, 1, max);
            this.setState({ properties: props });
        };
        this.atrPeriodChanged = (input) => {
            if (input.value < input.min || input.value > input.max) {
                return;
            }
            let properties = this.state.properties;
            properties.atrPeriod = input.value;
            this.setState({ properties: properties });
        };
        this.rsiPeriodChanged = (input) => {
            if (input.value < input.min || input.value > input.max) {
                return;
            }
            let properties = this.state.properties;
            properties.rsiPeriod = input.value;
            this.setState({ properties: properties });
        };
        this.cciPeriodChanged = (input) => {
            if (input.value < input.min || input.value > input.max) {
                return;
            }
            let properties = this.state.properties;
            properties.cciPeriod = input.value;
            this.setState({ properties: properties });
        };
        this.wrPeriodChanged = (input) => {
            if (input.value < input.min || input.value > input.max) {
                return;
            }
            let properties = this.state.properties;
            properties.williamsRPeriod = input.value;
            this.setState({ properties: properties });
        };
        this.state = {
            data: getData(),
            tooltip: '<b>Date:{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '</table>',
            indicators: getIndicatorList(),
            selectedIndicator: 'atr',
            properties: {
                // ATR, CCI, RSI, Williams %R
                atrPeriod: 14,
                cciPeriod: 20,
                rsiPeriod: 14,
                williamsRPeriod: 14,
                // MACD
                fastPeriod: 12,
                slowPeriod: 26,
                smoothingPeriod: 9,
                macdStyles: {
                    macdLine: {
                        stroke: '#bfa554'
                    },
                    signalLine: {
                        stroke: '#bf8c54'
                    }
                },
                // Fast Stochastic
                stochKPeriod: 14,
                stochDPeriod: 3,
                stochSmoothingPeriod: 1,
                stochStyles: {
                    kLine: {
                        stroke: '#eddd46'
                    },
                    dLine: {
                        stroke: '#edb747'
                    }
                }
            }
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div id="settingsBody" className="panel-collapse collapse in">
                <div className="panel-body">
                    <ul className="list-inline">
                        <li>
                            <label>Indicator Type</label>
                            <wjInput.ComboBox itemsSource={this.state.indicators} textChanged={this.typeChanged} selectedValuePath="abbreviation" displayMemberPath="name" selectedValue={this.state.selectedIndicator}>
                            </wjInput.ComboBox>
                        </li>
                    </ul>

                    {this.state.selectedIndicator === 'atr'
            ? <ul className="list-inline">
                                <li>
                                    <label>Period</label>
                                    <wjInput.InputNumber valueChanged={this.atrPeriodChanged} value={this.state.properties.atrPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.atrPeriod} step={1} format="n0">
                                    </wjInput.InputNumber>
                                </li>
                            </ul>
            : null}

                    {this.state.selectedIndicator === 'rsi'
            ? <ul className="list-inline">
                                <li>
                                    <label>Period</label>
                                    <wjInput.InputNumber valueChanged={this.rsiPeriodChanged} value={this.state.properties.rsiPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.rsiPeriod} step={1} format="n0">
                                    </wjInput.InputNumber>
                                </li>
                            </ul>
            : null}

                    {this.state.selectedIndicator === 'cci'
            ? <ul className="list-inline">
                                <li>
                                    <label>Period</label>
                                    <wjInput.InputNumber valueChanged={this.cciPeriodChanged} value={this.state.properties.cciPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.cciPeriod} step={1} format="n0">
                                    </wjInput.InputNumber>
                                </li>
                            </ul>
            : null}

                    {this.state.selectedIndicator === 'williamsR'
            ? <ul className="list-inline">
                                <li>
                                    <label>Period</label>
                                    <wjInput.InputNumber valueChanged={this.wrPeriodChanged} value={this.state.properties.williamsRPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.williamsRPeriod} step={1} format="n0">
                                    </wjInput.InputNumber>
                                </li>
                            </ul>
            : null}

                    {this.state.selectedIndicator === 'macd'
            ? <ul className="list-inline">
                                <li>
                                    <label>Fast Period</label>
                                    <wjInput.InputNumber value={this.state.properties.fastPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.fastPeriod} step={1} format="n0" valueChanged={this.fastPeriodChanged}>
                                    </wjInput.InputNumber>
                                </li>
                                <li>
                                    <label>Slow Period</label>
                                    <wjInput.InputNumber value={this.state.properties.slowPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.slowPeriod} step={1} format="n0" valueChanged={this.slowPeriodChanged}>
                                    </wjInput.InputNumber>
                                </li>
                                <li>
                                    <label>Signal Smoothing Period</label>
                                    <wjInput.InputNumber value={this.state.properties.smoothingPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.smoothingPeriod} step={1} format="n0" valueChanged={this.smoothingPeriodChanged}>
                                    </wjInput.InputNumber>
                                </li>
                            </ul>
            : null}

                    {this.state.selectedIndicator === 'stoch'
            ? <ul className="list-inline">
                                <li>
                                    <label>K Period</label>
                                    <wjInput.InputNumber value={this.state.properties.stochKPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.stochKPeriod} step={1} format="n0" valueChanged={this.stochKPeriodChanged}>
                                    </wjInput.InputNumber>
                                </li>
                                <li>
                                    <label>D Period</label>
                                    <wjInput.InputNumber value={this.state.properties.stochDPeriod} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.stochDPeriod} step={1} format="n0" valueChanged={this.stochDPeriodChanged}>
                                    </wjInput.InputNumber>
                                </li>
                                <li>
                                    <label>Smoothing Period</label>
                                    <wjInput.InputNumber value={this.state.properties.stochSmoothingPeriod} min={1} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.stochSmoothingPeriod} step={1} format="n0" valueChanged={this.stochSmoothingPeriodChanged}>
                                    </wjInput.InputNumber>
                                </li>
                            </ul>
            : null}
                </div>
            </div>

            <wjFinance.FinancialChart itemsSource={this.state.data} bindingX="date" initialized={this.initializeChart}>
                <wjFinance.FinancialChartSeries binding="close" name="Box Inc"></wjFinance.FinancialChartSeries>
                <wjChart.FlexChartLegend position="Top"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisX" labelAngle={0} axisLine={true}></wjChart.FlexChartAxis>
            </wjFinance.FinancialChart>
            <wjFinance.FinancialChart itemsSource={this.state.data} style={{ height: '200px' }} bindingX="date" rendered={this.chartRendered} initialized={this.initializeIChart}>
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjChart.FlexChartAxis wjProperty="axisX" labelAngle={0} axisLine={true}></wjChart.FlexChartAxis>
                <wjFinanceAnalytics.FlexChartAtr binding="high,low,open,close" name="ATR" period={this.state.properties.atrPeriod} visibility={this.state.selectedIndicator === 'atr' ? 'Visible' : 'Hidden'}>
                </wjFinanceAnalytics.FlexChartAtr>
                <wjFinanceAnalytics.FlexChartRsi binding="close" name="RSI" period={this.state.properties.rsiPeriod} visibility={this.state.selectedIndicator === 'rsi' ? 'Visible' : 'Hidden'}>
                </wjFinanceAnalytics.FlexChartRsi>
                <wjFinanceAnalytics.FlexChartCci binding="high,low,open,close" name="CCI" period={this.state.properties.cciPeriod} visibility={this.state.selectedIndicator === 'cci' ? 'Visible' : 'Hidden'}>
                </wjFinanceAnalytics.FlexChartCci>
                <wjFinanceAnalytics.FlexChartWilliamsR binding="high,low,open,close" name="Williams %R" period={this.state.properties.williamsRPeriod} visibility={this.state.selectedIndicator === 'williamsR' ? 'Visible' : 'Hidden'}>
                </wjFinanceAnalytics.FlexChartWilliamsR>
                <wjFinanceAnalytics.FlexChartMacd binding="close" name="MACD,Signal" styles={this.state.properties.macdStyles} fastPeriod={this.state.properties.fastPeriod} slowPeriod={this.state.properties.slowPeriod} smoothingPeriod={this.state.properties.smoothingPeriod} visibility={this.state.selectedIndicator === 'macd' ? 'Visible' : 'Hidden'}>
                </wjFinanceAnalytics.FlexChartMacd>
                <wjFinanceAnalytics.FlexChartMacdHistogram binding="close" name="MACD Histogram" fastPeriod={this.state.properties.fastPeriod} slowPeriod={this.state.properties.slowPeriod} smoothingPeriod={this.state.properties.smoothingPeriod} visibility={this.state.selectedIndicator === 'macd' ? 'Visible' : 'Hidden'}>
                </wjFinanceAnalytics.FlexChartMacdHistogram>
                <wjFinanceAnalytics.FlexChartStochastic binding="high,low,open,close" name="%K,%D" kPeriod={this.state.properties.stochKPeriod} dPeriod={this.state.properties.stochDPeriod} smoothingPeriod={this.state.properties.stochSmoothingPeriod} visibility={this.state.selectedIndicator === 'stoch' ? 'Visible' : 'Hidden'} styles={this.state.properties.stochStyles}>
                </wjFinanceAnalytics.FlexChartStochastic>
            </wjFinance.FinancialChart>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
