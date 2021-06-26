import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { PivotPanel, PivotGrid } from '@grapecity/wijmo.react.olap';
import { PivotEngine } from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new PivotEngine({
                autoGenerateFields: false,
                fields: [
                    {
                        header: 'Dimensions', subFields: [
                            { header: 'Buyer', binding: 'buyer' },
                            { header: 'Type', binding: 'type' },
                            {
                                header: 'Date', subFields: [
                                    { header: 'Year', binding: 'date', format: 'yyyy' },
                                    { header: 'Quarter', binding: 'date', format: '"Q"Q' },
                                    { header: 'Month', binding: 'date', format: 'MMM' },
                                ]
                            }
                        ]
                    },
                    {
                        header: 'Measures', subFields: [
                            { header: 'Amount', binding: 'amount', format: 'c0' }
                        ]
                    }
                ],
                valueFields: ['Amount'],
                rowFields: ['Year', 'Quarter'],
                columnFields: ['Buyer'],
                showRowTotals: 'Subtotals',
                itemsSource: getData(),
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-4">
                        <PivotPanel id="sample-panel" itemsSource={this.state.ng}/>
                    </div>
                    <div className="col-xs-8">
                        <PivotGrid itemsSource={this.state.ng}/>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
