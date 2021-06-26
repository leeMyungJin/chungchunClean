import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjFinance from "@grapecity/wijmo.react.chart.finance";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            options: {
                kagi: {
                    reversalAmount: 1,
                    rangeMode: 'Fixed',
                    fields: 'Close'
                }
            },
            input: {
                format: "n0",
                max: 1,
                min: 0,
                step: 1
            },
            rangeModeText: 'Fixed',
            fieldsText: 'Close',
            style: {
                stroke: 'rgb(136, 189, 230)'
            },
            altStyle: {
                stroke: 'rgb(136, 189, 230)'
            }
        };
    }
    render() {
        return <div className="container-fluid">
            
            <div className="panel-group" id="settings">
                <div className="panel panel-default">
                    <div id="settingsBody" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <ul className="list-inline">
                                <li>
                                    <label>Reversal Amount</label>
                                    <wjInput.InputNumber value={this.state.options.kagi.reversalAmount} min={this.state.input.min} step={this.state.input.step} format={this.state.input.format} valueChanged={this.reversalAmountChanged.bind(this)} initialized={this.initlizeInput.bind(this)}></wjInput.InputNumber>
                                </li>
                                <li>
                                    <wjInput.Menu header="Range Mode" value={this.state.options.kagi.rangeMode} itemClicked={this.rmClick.bind(this)}>
                                        <wjInput.MenuItem value="Fixed">Fixed</wjInput.MenuItem>
                                        <wjInput.MenuItem value="ATR">Average True Range</wjInput.MenuItem>
                                        <wjInput.MenuItem value="Percentage">Percentage</wjInput.MenuItem>
                                    </wjInput.Menu>
                                </li>
                                <li>
                                    <wjInput.Menu header="Data Fields" value={this.state.options.kagi.fields} itemClicked={this.fieldsClick.bind(this)}>
                                        <wjInput.MenuItem value="High">High</wjInput.MenuItem>
                                        <wjInput.MenuItem value="Low">Low</wjInput.MenuItem>
                                        <wjInput.MenuItem value="Open">Open</wjInput.MenuItem>
                                        <wjInput.MenuItem value="Close">Close</wjInput.MenuItem>
                                        <wjInput.MenuItem value="HighLow">High/Low</wjInput.MenuItem>
                                        <wjInput.MenuItem value="HL2">HL Avg.</wjInput.MenuItem>
                                        <wjInput.MenuItem value="HLC3">HLC Avg.</wjInput.MenuItem>
                                        <wjInput.MenuItem value="HLOC4">HLOC Avg.</wjInput.MenuItem>
                                    </wjInput.Menu>
                                </li>
                            </ul>
                            <ul className="list-inline">
                                <li>
                                    <label>Stroke</label>
                                    <wjInput.InputColor value={this.state.style.stroke} valueChanged={this.strokeOptionChanged.bind(this)}></wjInput.InputColor>
                                </li>
                                <li>
                                    <label>Alt. Stroke</label>
                                    <wjInput.InputColor value={this.state.altStyle.stroke} valueChanged={this.altStrokeOptionChanged.bind(this)}></wjInput.InputColor>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <wjFinance.FinancialChart initialized={this.initializeChart.bind(this)} itemsSource={this.state.data} bindingX="date" chartType="Kagi" tooltipContent="tooltip" options={this.state.options}>
                <wjFinance.FinancialChartSeries binding="high,low,open,close" name="Facebook" style={this.state.style} altStyle={this.state.altStyle}></wjFinance.FinancialChartSeries>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
            </wjFinance.FinancialChart>
        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
        this.ser = flex.series[0];
    }
    initlizeInput(flex) {
        this.inputNumber = flex;
    }
    rmClick(menu) {
        if (menu.selectedItem) {
            let selectedValue = menu.selectedValue;
            var reversalInput = this.inputNumber;
            if (selectedValue === 'Percentage') {
                this.setState({
                    rangeModeText: menu.selectedItem.text,
                    options: {
                        kagi: {
                            rangeMode: selectedValue,
                            reversalAmount: wjCore.clamp(reversalInput.value, 0, .05),
                            fields: this.state.options.kagi.fields
                        }
                    },
                    input: {
                        format: 'p0',
                        min: 0,
                        max: 1,
                        step: 0.05
                    }
                });
            }
            else if (selectedValue === 'ATR') {
                this.setState({
                    rangeModeText: menu.selectedItem.text,
                    options: {
                        kagi: {
                            rangeMode: selectedValue,
                            reversalAmount: wjCore.clamp(reversalInput.value, 14, this.state.data.length - 2),
                            fields: this.state.options.kagi.fields
                        }
                    },
                    input: {
                        format: 'n0',
                        min: 2,
                        max: this.state.data.length - 2,
                        step: 1
                    }
                });
            }
            else {
                this.setState({
                    rangeModeText: menu.selectedItem.text,
                    options: {
                        kagi: {
                            rangeMode: selectedValue,
                            reversalAmount: 1,
                            fields: this.state.options.kagi.fields
                        }
                    },
                    input: {
                        format: 'n0',
                        min: 1,
                        max: null,
                        step: 1
                    }
                });
            }
        }
        this.optionChanged();
    }
    fieldsClick(menu) {
        if (menu.selectedItem) {
            this.setState({
                fieldsText: menu.selectedValue,
                options: {
                    kagi: {
                        rangeMode: this.state.options.kagi.rangeMode,
                        reversalAmount: this.state.options.kagi.reversalAmount,
                        fields: menu.selectedValue
                    }
                }
            });
        }
        this.optionChanged();
    }
    tooltip(ht) {
        var date = ht.item && ht.item.date ? ht.item.date : null, content = '';
        //
        if (wjCore.isDate(date)) {
            date = wjCore.Globalize.formatDate(date, 'MM/dd/yy');
        }
        if (ht && ht.item) {
            content =
                '<b>' + ht.name + '</b><br/>' +
                    'Date: ' + date + '<br/>' +
                    'Open: ' + wjCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                    'High: ' + wjCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                    'Low: ' + wjCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                    'Close: ' + wjCore.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                    'Volume: ' + wjCore.Globalize.format(ht.item.volume, 'n0');
        }
        return content;
    }
    strokeOptionChanged(input) {
        this.setState({
            style: {
                stroke: input.value
            }
        });
        this.ser.style.stroke = input.value;
        this.optionChanged();
    }
    altStrokeOptionChanged(input) {
        this.setState({
            altStyle: {
                stroke: input.value
            }
        });
        this.optionChanged();
    }
    optionChanged() {
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    reversalAmountChanged(input) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        this.setState({
            options: {
                kagi: {
                    rangeMode: this.state.options.kagi.rangeMode,
                    reversalAmount: input.value,
                    fields: this.state.options.kagi.fields
                }
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
