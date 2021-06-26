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
                itemsSource: getData(),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
        this.state.ngPanel.fields.getField('Amount').format = 'c0';
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <p>
                            Drag and drop fields to build views:
                        </p>
                        <Olap.PivotPanel id="sample-panel" itemsSource={this.state.ngPanel}></Olap.PivotPanel>
                        <p>
                            For example, drag the "Buyer" field from the "Rows" list
                            to the "Columns" list.
                        </p>
                    </div>
                    <div className="col-xs-7">
                        <p>
                            Summary for the current view definition:
                        </p>
                        <Olap.PivotGrid itemsSource={this.state.ngPanel}></Olap.PivotGrid>
                        <Olap.PivotChart itemsSource={this.state.ngPanel} showTitle={false} show-legend="Auto"></Olap.PivotChart>
                    </div>
                </div>
                <p>
                    View definitions can be saved and restored using the
                     PivotEngine's <b>viewDefinition</b> property:
                </p>
                <button id="saveView" className="btn btn-default" onClick={this.onSaveViewClick.bind(this)}>
                    Save View
                </button>
                <button id="restoreView" className="btn btn-default" onClick={this.onRestoreViewClick.bind(this)}>
                    Restore View
                </button>
            </div>);
    }
    onSaveViewClick() {
        if (this.state.ngPanel.isViewDefined) {
            localStorage.viewDefinition = this.state.ngPanel.viewDefinition;
        }
    }
    onRestoreViewClick() {
        if (localStorage.viewDefinition) {
            this.state.ngPanel.viewDefinition = localStorage.viewDefinition;
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
