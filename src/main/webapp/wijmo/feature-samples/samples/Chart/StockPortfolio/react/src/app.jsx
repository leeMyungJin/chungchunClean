import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjCore from "@grapecity/wijmo";
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjChart from "@grapecity/wijmo.react.chart";
import { getCompany } from './data';
import { Portfolio } from './portfolio';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._portfolio = new Portfolio();
        this.state = {
            selectedCompany: "",
            addBtnDisabled: true
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="panel panel-default">
                <div className="panel-heading">Portfolio</div>
                <div className="table-responsive" style={{ overflowY: "visible" }}>
                    <table className="table table-condensed">
                    <thead>
                        <tr style={{ cursor: "pointer" }}>
                            <th className="text-left" style={{ width: "23px" }}><span>Name</span></th>
                            <th className="text-left"><span>Symbol</span></th>
                            <th className="text-center"><span>Chart</span></th>
                            <th className="text-right"><span>Last Price</span></th>
                            <th className="text-right"><span>Change</span></th>
                            <th className="text-right"><span>Shares</span></th>
                            <th className="text-right"><span>Price</span></th>
                            <th className="text-right"><span>Cost Basis</span></th>
                            <th className="text-right"><span>Market Value</span></th>
                            <th className="text-right"><span>Gain</span></th>
                            <th className="text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTBodyItems()}
                    </tbody>
                    <tfoot>
                        <tr className="panel-footer" onClick={() => this._portfolio.view.moveCurrentTo(null)}>
                            <td className="text-right">
                                <b>Add to portfolio:</b>
                            </td>
                            <td colSpan={4}>
                                <div className="input-group">
                                    <wjInput.AutoComplete itemsSourceFunction={getCompany} displayMemberPath="symbolName" selectedValuePath="symbol" selectedValue={this.state.selectedCompany} showDropDownButton={false} placeholder="company name or symbol" selectedIndexChanged={this.autoCompleteChanged.bind(this)} cssMatch="match"/>
                                    <span>
                                        <button className="btn btn-primary" disabled={this.state.addBtnDisabled} onClick={() => this.addBtnClick()}>
                                        <span className="glyphicon glyphicon-plus"></span>
                                        </button>
                                    </span>
                                </div>
                            </td>
                            <td className="text-right" colSpan={2}><b>Total:</b></td>
                            <td className="text-right"><b>{wjCore.Globalize.format(this._portfolio.cost, 'n2')}</b></td>
                            <td className="text-right"><b>{wjCore.Globalize.format(this._portfolio.value, 'n2')}</b></td>
                            <td className="text-right">
                                <span style={{ color: this.getAmountColor(this._portfolio.gain) }}>
                                    <b>{wjCore.Globalize.format(this._portfolio.value, 'p2')}</b>
                                </span>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                    
                    </table>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    Chart
                    <div className="btn-group btn-group-xs pull-right">
                        <button type="button" style={{ visibility: "hidden" }} className={`btn btn-default ${this._portfolio.chartPeriod == 0 ? 'active' : ''}`} onClick={() => this.onChartPeriodChanged(0)}>YTD</button>
                        <button type="button" style={{ visibility: "hidden" }} className={`btn btn-default ${this._portfolio.chartPeriod == 1 ? 'active' : ''}`} onClick={() => this.onChartPeriodChanged(1)}>6m</button>
                        <button type="button" className={`btn btn-default ${this._portfolio.chartPeriod == 2 ? 'active' : ''}`} onClick={() => this.onChartPeriodChanged(2)}>12m</button>
                        <button type="button" className={`btn btn-default ${this._portfolio.chartPeriod == 3 ? 'active' : ''}`} onClick={() => this.onChartPeriodChanged(3)}>24m</button>
                        <button type="button" className={`btn btn-default ${this._portfolio.chartPeriod == 4 ? 'active' : ''}`} onClick={() => this.onChartPeriodChanged(4)}>36m</button>
                        <button type="button" className={`btn btn-default ${this._portfolio.chartPeriod == 5 ? 'active' : ''}`} onClick={() => this.onChartPeriodChanged(5)}>All</button>
                    </div>
                </div>
                <wjChart.FlexChart selectionMode="Series" binding="change" bindingX="date" chartType="Line" initialized={control => this._flexChart = control} selectionChanged={this.selectionChanged.bind(this)}>
                    {this.renderFlexCharSeries()}
                    <wjChart.FlexChartAxis wjProperty="axisY" format="p0"/>
                    <wjChart.FlexChartAxis wjProperty="axisX" format="MMM-yyyy"/>
                    <wjChart.FlexChartLegend position="None"/>
                </wjChart.FlexChart>
            </div>
        </div>;
    }
    componentDidMount() {
        this.initTableHeader();
        this._portfolio.view.currentChanged.addHandler(this.currentChanged, this);
        this._portfolio.itemsChanged.addHandler(() => this.forceUpdate());
    }
    currentChanged() {
        var p = this._portfolio, chart = this._flexChart;
        if (chart && p) {
            var symbol = p.view.currentItem ? p.view.currentItem.symbol : null, selSeries = null;
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].name == symbol) {
                    selSeries = chart.series[i];
                    break;
                }
            }
            chart.selection = selSeries;
        }
        this.forceUpdate();
    }
    selectionChanged(sender, args) {
        var chart = sender, symbol = chart.selection ? chart.selection.name : null, selSeries = null, p = this._portfolio;
        //
        if (symbol == null) {
            p.view.moveCurrentToPosition(-1);
        }
        else {
            for (var i = 0; i < p.view.items.length; i++) {
                if (p.view.items[i].symbol == symbol) {
                    p.view.moveCurrentToPosition(i);
                    break;
                }
            }
        }
    }
    initTableHeader() {
        let portfolio = this._portfolio, ths = document.querySelectorAll('th'), vals = ['name', 'symbol', 'chart', 'lastPrice', 'change', 'shares', 'purchasePrice', 'costBasis', 'marketValue', 'gain'], names = ['Name', 'Symbol', 'Chart', 'Last Price', 'Change', 'Shares', 'Price', 'Cost Basis', 'Market Value', 'Gain'];
        //
        vals.forEach((v, i) => {
            let th = ths[i], name = names[i];
            //
            this.updateSortIndicator(portfolio.view, v, name, th.childNodes[0]);
            portfolio.view.collectionChanged.addHandler(((view, binding, name, ele) => {
                return () => {
                    this.updateSortIndicator(view, binding, name, ele);
                };
            })(portfolio.view, v, name, th.childNodes[0]));
            th.addEventListener('click', ((view, binding) => {
                return args => {
                    this.applySort(view, binding, args);
                };
            })(portfolio.view, v));
        });
    }
    updateSortIndicator(view, binding, header, element) {
        if (view) {
            var sd = view.sortDescriptions, sortIndicator = '';
            if (sd.length > 0 && sd[0].property == binding) {
                sortIndicator = sd[0].ascending ? ' ▲' : ' ▼';
            }
            element.innerText = header + sortIndicator;
        }
    }
    applySort(view, binding, args) {
        if (view) {
            var sd = view.sortDescriptions;
            if (args.ctrlKey) { // clear sort on ctrl-click 
                sd.clear();
            }
            else { // add/reverse sort on clicked column
                var ascending = true;
                if (sd.length > 0 && sd[0].property == binding) {
                    ascending = !sd[0].ascending;
                }
                var sdNew = new wjCore.SortDescription(binding, ascending);
                sd.splice(0, sd.length, sdNew);
            }
        }
    }
    autoCompleteChanged(autoComplete) {
        if (autoComplete.selectedValue != null && autoComplete.selectedValue != '') {
            this._portfolio.newItemSymbol = autoComplete.selectedValue;
            this.setState({
                selectedCompany: autoComplete.selectedValue,
                addBtnDisabled: false
            });
        }
        else {
            this._portfolio.newItemSymbol = '';
            this.setState({
                selectedCompany: '',
                addBtnDisabled: true
            });
        }
    }
    addBtnClick() {
        this._portfolio.addNewItem();
        this.setState({
            selectedCompany: '',
            addBtnDisabled: true
        });
    }
    onChartPeriodChanged(type) {
        if (this._portfolio.chartPeriod == type) {
            return;
        }
        this._portfolio.chartPeriod = type;
        this.forceUpdate();
    }
    renderTBodyItems() {
        return this._portfolio.view.items.map(item => {
            let isActive = (item && item.symbol) == (this._portfolio.view.currentItem && this._portfolio.view.currentItem.symbol);
            return <tr className={`${isActive ? "active" : ""}`} onClick={() => this._portfolio.view.moveCurrentTo(item)}>
                <td className="clipCell">
                    <span style={{ backgroundColor: item.color, width: '1.5rem', display: 'inline-block', marginRight: '0.5rem' }}>&nbsp;</span>
                    {item.name}
                </td>
                <td>
                    <a href={`https://www.quandl.com/data/WIKI/${item && item.symbol}`} target="_blank">
                        {item && item.symbol}
                    </a>
                </td>
                <td className="text-center">
                    <input type="checkbox" checked={item.chart} onChange={() => {
                item.chart = !item.chart;
                this.forceUpdate();
            }}/>
                </td>
                <td className="text-right">
                    {wjCore.Globalize.format(item.lastPrice, 'n2')}
                </td>
                <td className="text-right">
                    <span style={{ color: this.getAmountColor(item.change) }}>
                        {wjCore.Globalize.format(item.changePercent, 'p2')}
                    </span>
                </td>
                <td className="text-right inputCell" style={{ padding: "2px" }}>
                    <wjInput.InputNumber value={item.shares || ""} isRequired={false} min={0} format='n0'/>
                </td>
                <td className="text-right inputCell" style={{ padding: "2px" }}>
                    <wjInput.InputNumber value={item.purchasePrice || ""} isRequired={false} min={0} format='n2'/>
                </td>
                <td className="text-right">
                    {wjCore.Globalize.format(item.costBasis, 'n2')}
                </td>
                <td className="text-right">
                    {wjCore.Globalize.format(item.marketValue, 'n2')}
                </td>
                <td className="text-right">
                    <span style={{ color: this.getAmountColor(item.gain) }}>
                        {wjCore.Globalize.format(item.gainPercent, 'p2')}
                    </span>
                </td>
                <td className="text-center">
                    <a onClick={() => this._portfolio.removeItem(item && item.symbol)}>
                        <span className="glyphicon glyphicon-remove" style={{ color: "#D14836" }}></span>
                    </a>
                </td>
            </tr>;
        });
    }
    renderFlexCharSeries() {
        return this._portfolio.view.items.map(item => {
            return <wjChart.FlexChartSeries itemsSource={item.chartData} name={item && item.symbol} style={{ stroke: item.color }} visibility={item.chart ? "Visible" : "Hidden"}/>;
        });
    }
    getAmountColor(amount) {
        return amount < -0.01 ? '#9F3912' : amount > 0.01 ? '#217648' : '#b0b0b0';
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
