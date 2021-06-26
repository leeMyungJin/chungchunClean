import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.react.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.react.chart.analytics';
//
//
class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.onChange = (event) => {
            const target = event.target;
            const key = target.id;
            const checked = target.checked;
            let styles = this.createStyles();
            for (let k in styles) {
                if (k == key) {
                    styles[k] = checked ? styles[k] : null;
                }
                else {
                    styles[k] = this.state.appliedStyles[k];
                }
            }
            this.setState((state) => ({
                [key]: checked,
                appliedStyles: styles
            }));
        };
        //
        this.createStyles = () => {
            return {
                safetyMargin: { fill: "lightgreen", strokeWidth: 0 },
                salesRevenue: { stroke: "rgba(127,42,250,1)", strokeWidth: 3 },
                fixedCost: { stroke: "grey", strokeWidth: 3 },
                totalCost: { stroke: "red", strokeWidth: 3 },
                variableCost: { stroke: "black", strokeWidth: 3 },
                marginalProfit: { stroke: "green", strokeWidth: 3 },
                breakEven: { stroke: "rgba(69,171,235,1)", strokeWidth: 3 }
            };
        };
        this.state = {
            safetyMargin: true,
            salesRevenue: true,
            totalCost: true,
            fixedCost: true,
            variableCost: true,
            marginalProfit: true,
            breakEven: true,
            appliedStyles: this.createStyles(),
        };
    }
    //
    render() {
        return (<div className="container-fluid"> 
                <div className="row">
                    <label htmlFor="safetyMargin">Safety Margin:</label>
                    <input id="safetyMargin" type="checkbox" checked={this.state.safetyMargin} onChange={this.onChange}/>

                    <label htmlFor="salesRevenue">Sales Revenue:</label>
                    <input id="salesRevenue" type="checkbox" checked={this.state.salesRevenue} onChange={this.onChange}/>
                </div>

                <div className="row">
                    <label htmlFor="totalCost">Total Cost:</label>
                    <input id="totalCost" type="checkbox" checked={this.state.totalCost} onChange={this.onChange}/>

                    <label htmlFor="fixedCost">Fixed Cost:</label>
                    <input id="fixedCost" type="checkbox" checked={this.state.fixedCost} onChange={this.onChange}/>

                    <label htmlFor="variableCost">Variable Cost:</label>
                    <input id="variableCost" type="checkbox" checked={this.state.variableCost} onChange={this.onChange}/>
                </div>

                <div className="row">
                    <label htmlFor="marginalProfit">Marginal Profit:</label>
                    <input id="marginalProfit" type="checkbox" checked={this.state.marginalProfit} onChange={this.onChange}/>

                    <label htmlFor="breakEven">Break Even:</label>
                    <input id="breakEven" type="checkbox" checked={this.state.breakEven} onChange={this.onChange}/>
                </div>

                <wjChart.FlexChart>
                    <wjChartAnalytics.FlexChartBreakEven salesPrice={120} variableCost={20} fixedCost={1000000} style={{ fill: 'rgba(127,42,250,0.5)', strokeWidth: 0 }} altStyle={{ fill: 'rgba(255,0,0,0.5)', strokeWidth: 0 }} styles={this.state.appliedStyles}/>
                </wjChart.FlexChart>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
