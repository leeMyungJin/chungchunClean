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
            ngPanel: new wjcOlap.PivotEngine({
                itemsSource: getData(1000),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <p>
                            Drag and drop fields to build views:
                        </p>
                        <Olap.PivotPanel id="sample-panel" itemsSource={this.state.ngPanel}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-7">
                        <p>
                            Summary for the current view definition:
                        </p>
                        <Olap.PivotGrid itemsSource={this.state.ngPanel}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
    componentDidMount() {
        this.state.ngPanel.fields.getField('Amount').format = 'c0';
        let yearField = this.state.ngPanel.fields.getField('Date');
        yearField.header = 'Year';
        yearField.format = 'yyyy';
        let quarterField = new wjcOlap.PivotField(this.state.ngPanel, 'date', 'Quarter');
        quarterField.format = '"Q"q';
        this.state.ngPanel.fields.splice(1, 0, quarterField);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
