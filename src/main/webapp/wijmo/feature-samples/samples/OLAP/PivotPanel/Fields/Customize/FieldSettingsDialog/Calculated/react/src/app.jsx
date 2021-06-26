import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import { PivotEngine } from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(10000),
                showColumnTotals: 'GrandTotals',
                showRowTotals: 'Subtotals',
                fields: [
                    { binding: 'product', header: 'Product' },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                    {
                        header: 'Range',
                        dataType: 'String',
                        aggregate: 'Cnt',
                        // use getValue to calculate the sales range (High, Medium, or Low)
                        getValue: (item) => {
                            let sales = item.sales;
                            return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
                        }
                    },
                    { binding: 'sales', header: 'Sales', format: 'n0' },
                    { binding: 'downloads', header: 'Downloads', format: 'n0' },
                    {
                        header: 'Bonus',
                        dataType: 'Number',
                        aggregate: 'Sum',
                        format: 'c0',
                        // use getValue to calculate the bonus:
                        // if sales > 15 units, the bonus is 3% of units * unit price;
                        // otherwise, it's zero.
                        getValue: (item) => item.sales > 15 ? item.sales * 50 * 0.03 : 0
                    }
                ],
                rowFields: ['Date', 'Range'],
                valueFields: ['Sales', 'Bonus']
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-6">
                        <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
