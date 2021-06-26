import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(1000),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'],
                showRowTotals: 'Subtotals',
                showColumnTotals: 'Subtotals',
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-7">
                        <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
    componentDidMount() {
        this.state.ng.fields.getField('Amount').format = 'c0';
        this.state.ng.fields.getField('Date').format = 'yyyy';
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
