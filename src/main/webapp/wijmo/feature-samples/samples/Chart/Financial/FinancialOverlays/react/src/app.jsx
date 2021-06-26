import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjFinance from "@grapecity/wijmo.react.chart.finance";
import * as wjFinanceAnalytics from "@grapecity/wijmo.react.chart.finance.analytics";
import { getData, getOverlays } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            tooltip: '<b>Date:{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '</table>',
            overlays: getOverlays(),
            selectedOverlay: 'bollinger',
            input: {
                period: 20,
                multiplier: 2,
                size: 0.03
            },
            properties: {
                // Bollinger Bands
                bollingerPeriod: 20,
                bollingerMultiplier: 2,
                // Moving Average Envelopes
                envelopePeriod: 20,
                envelopeType: 'Simple',
                envelopeSize: 0.03
            }
        };
    }
    render() {
        return <div className="container-fluid">
            
            <div className="panel-group" id="settingsShort">
                <div className="panel panel-default">
                    <div id="settingsBody" className="panel-collapse collapse in">
                        <div className="panel-body">
                            
                            <ul className="list-inline">
                                <li>
                                    <label>Overlay</label>
                                    <wjInput.ComboBox itemsSource={this.state.overlays} selectedValuePath="abbreviation" displayMemberPath="name" selectedValue={this.state.selectedOverlay} textChanged={this.overlayChanged.bind(this)}></wjInput.ComboBox>
                                </li>
                            </ul>

                            
                            {this.state.selectedOverlay === 'bollinger' ?
            <ul className="list-inline">
                                    <li>
                                        <label>Period</label>
                                        <wjInput.InputNumber valueChanged={this.bpChanged.bind(this)} value={this.state.input.period} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.bollingerPeriod} step={1} format="n0"></wjInput.InputNumber>
                                    </li>
                                    <li>
                                        <label>Multiplier</label>
                                        <wjInput.InputNumber valueChanged={this.bmChanged.bind(this)} value={this.state.input.multiplier} min={1} max={100} step={1} format="n0"></wjInput.InputNumber>
                                    </li>
                                </ul> : null}

                            
                            {this.state.selectedOverlay === 'envelopes' ?
            <ul className="list-inline">
                                    <li>
                                        <label>Period</label>
                                        <wjInput.InputNumber valueChanged={this.epChanged.bind(this)} value={this.state.input.period} min={2} max={this.state.data.length > 0 ? this.state.data.length - 1 : this.state.properties.envelopePeriod} step={1} format="n0"></wjInput.InputNumber>
                                    </li>
                                    <li>
                                        <label>Size</label>
                                        <wjInput.InputNumber valueChanged={this.esChanged.bind(this)} value={this.state.input.size} min={0} max={1} step={0.01} format="p0"></wjInput.InputNumber>
                                    </li>
                                    <li>
                                        <wjInput.Menu header="Type" value={this.state.properties.envelopeType} itemClicked={this.typeChanged.bind(this)}>
                                            <wjInput.MenuItem value="Simple">Simple</wjInput.MenuItem>
                                            <wjInput.MenuItem value="Exponential">Exponential</wjInput.MenuItem>
                                        </wjInput.Menu>
                                    </li>
                                </ul> : null}

                        </div>
                    </div>
                </div>
            </div>
            
            <wjFinance.FinancialChart itemsSource={this.state.data} bindingX="date" tooltipContent={this.state.tooltip} chartType="Candlestick">
                <wjChart.FlexChartLegend position="Bottom"></wjChart.FlexChartLegend>
                <wjFinance.FinancialChartSeries binding="high,low,open,close" name="Box Inc"></wjFinance.FinancialChartSeries>
                <wjFinanceAnalytics.FlexChartBollingerBands binding="close" name="Bollinger Bands" period={this.state.properties.bollingerPeriod} multiplier={this.state.properties.bollingerMultiplier} visibility={this.state.selectedOverlay === 'bollinger' ? 'Visible' : 'Hidden'}></wjFinanceAnalytics.FlexChartBollingerBands>
                <wjFinanceAnalytics.FlexChartEnvelopes binding="close" name="Envelopes" period={this.state.properties.envelopePeriod} type={this.state.properties.envelopeType} size={this.state.properties.envelopeSize} visibility={this.state.selectedOverlay === 'envelopes' ? 'Visible' : 'Hidden'}></wjFinanceAnalytics.FlexChartEnvelopes>
            </wjFinance.FinancialChart>
        </div>;
    }
    overlayChanged(combo) {
        this.setState({
            selectedOverlay: combo.selectedValue
        });
    }
    typeChanged(menu) {
        this.setState({
            properties: {
                envelopeType: menu.selectedValue,
                bollingerPeriod: this.state.properties.bollingerPeriod,
                bollingerMultiplier: this.state.properties.bollingerMultiplier,
                // Moving Average Envelopes
                envelopePeriod: this.state.properties.envelopePeriod,
                envelopeSize: this.state.properties.envelopeSize
            }
        });
    }
    bpChanged(input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.setState({
            input: {
                period: input.value,
                multiplier: this.state.input.multiplier,
                size: this.state.input.size
            },
            properties: {
                bollingerPeriod: input.value,
                bollingerMultiplier: this.state.properties.bollingerMultiplier,
                // Moving Average Envelopes
                envelopePeriod: this.state.properties.envelopePeriod,
                envelopeType: this.state.properties.envelopeType,
                envelopeSize: this.state.properties.envelopeSize
            }
        });
    }
    bmChanged(input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.setState({
            input: {
                period: this.state.input.period,
                multiplier: input.value,
                size: this.state.input.size
            },
            properties: {
                bollingerMultiplier: input.value,
                bollingerPeriod: this.state.properties.bollingerPeriod,
                // Moving Average Envelopes
                envelopePeriod: this.state.properties.envelopePeriod,
                envelopeType: this.state.properties.envelopeType,
                envelopeSize: this.state.properties.envelopeSize
            }
        });
    }
    esChanged(input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.setState({
            input: {
                period: this.state.input.size,
                multiplier: this.state.input.multiplier,
                size: input.value
            },
            properties: {
                envelopeSize: input.value,
                bollingerPeriod: this.state.properties.bollingerPeriod,
                bollingerMultiplier: this.state.properties.bollingerMultiplier,
                // Moving Average Envelopes
                envelopePeriod: this.state.properties.envelopePeriod,
                envelopeType: this.state.properties.envelopeType
            }
        });
    }
    epChanged(input) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.setState({
            input: {
                period: input.value,
                multiplier: this.state.input.multiplier,
                size: this.state.input.size
            },
            properties: {
                envelopePeriod: input.value,
                bollingerPeriod: this.state.properties.bollingerPeriod,
                bollingerMultiplier: this.state.properties.bollingerMultiplier,
                // Moving Average Envelopes
                envelopeType: this.state.properties.envelopeType,
                envelopeSize: this.state.properties.envelopeSize
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
