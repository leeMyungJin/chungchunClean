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
import { getData, getSymbols } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            comboData: getSymbols(),
            selectedSymbol: 'box',
            options: {
                lineBreak: {
                    newLineBreaks: 3
                }
            },
            style: {
                stroke: 'rgb(136, 189, 230)',
                fill: 'rgba(136, 189, 230, 0.701961)'
            },
            altStyle: {
                stroke: 'rgb(136, 189, 230)',
                fill: 'transparent'
            }
        };
    }
    render() {
        const uppercaseName = name => {
            return name.toUpperCase();
        };
        return <div className="container-fluid">
            
            <div className="panel-group" id="settings">
                <div className="panel panel-default">
                    <div id="settingsBody" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <ul className="list-inline">
                                <li>
                                    <label>Symbol</label>
                                    <wjInput.ComboBox itemsSource={this.state.comboData} displayMemberPath="name" selectedValuePath="symbol" selectedValue={this.state.selectedSymbol} selectedIndexChanged={this.selectedSymbolChanged.bind(this)}></wjInput.ComboBox>
                                </li>
                            </ul>
                            <ul className="list-inline">
                                <li>
                                    <label># of Lines in Break</label>
                                    <wjInput.InputNumber value={this.state.options.lineBreak.newLineBreaks} step={1} min={1} valueChanged={this.linesChanged.bind(this)}></wjInput.InputNumber>
                                </li>
                            </ul>
                            <ul className="list-inline">
                                <li>
                                    <label>Stroke</label>
                                    <wjInput.InputColor value={this.state.style.stroke} valueChanged={this.strokeChanged.bind(this)}></wjInput.InputColor>
                                </li>
                                <li>
                                    <label>Alt. Stroke</label>
                                    <wjInput.InputColor value={this.state.altStyle.stroke} valueChanged={this.altStrokeChanged.bind(this)}></wjInput.InputColor>
                                </li>
                            </ul>
                            <ul className="list-inline">
                                <li>
                                    <label>Fill</label>
                                    <wjInput.InputColor value={this.state.style.fill} valueChanged={this.fillChanged.bind(this)}></wjInput.InputColor>
                                </li>
                                <li>
                                    <label>Alt. Fill</label>
                                    <wjInput.InputColor value={this.state.altStyle.fill} valueChanged={this.altFillChanged.bind(this)}></wjInput.InputColor>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <wjFinance.FinancialChart initialized={this.initializeChart.bind(this)} itemsSource={this.state.data} options={this.state.options} bindingX="date" chartType="LineBreak" tooltipContent="tooltip">
                <wjFinance.FinancialChartSeries binding="high,low,open,close" name={uppercaseName(this.state.selectedSymbol)} style={this.state.style} altStyle={this.state.altStyle}></wjFinance.FinancialChartSeries>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
            </wjFinance.FinancialChart>
        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
        this.ser = flex.series[0];
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
    selectedSymbolChanged(combo) {
        this.setState({
            selectedSymbol: combo.selectedValue
        });
        this.setDataSource();
    }
    strokeChanged(input) {
        this.setState({
            style: {
                stroke: input.value,
                fill: this.state.style.fill
            }
        });
        this.ser.style.stroke = input.value;
        this.optionChanged();
    }
    altStrokeChanged(input) {
        this.setState({
            altStyle: {
                stroke: input.value,
                fill: this.state.altStyle.fill
            }
        });
        this.ser.altStyle.stroke = input.value;
        this.optionChanged();
    }
    fillChanged(input) {
        this.setState({
            style: {
                fill: input.value,
                stroke: this.state.style.stroke
            }
        });
        this.ser.style.fill = input.value;
        this.optionChanged();
    }
    altFillChanged(input) {
        this.setState({
            altStyle: {
                fill: input.value,
                stroke: this.state.altStyle.stroke
            }
        });
        this.ser.altStyle.fill = input.value;
        this.optionChanged();
    }
    optionChanged() {
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    linesChanged(input) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        this.setState({
            options: {
                lineBreak: {
                    newLineBreaks: input.value
                }
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    setDataSource() {
        var symbol = this.state.selectedSymbol;
        this.setState({
            data: getData(symbol)
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
