import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
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
                    </div>
                    <div className="col-xs-7">
                        <p>
                            Summary for the current view definition:
                        </p>
                        <Olap.PivotGrid itemsSource={this.state.ngPanel}></Olap.PivotGrid>
                    </div>
                </div>
                <p>
                    You can also invoke the field editor programatically
    		        using the <b>PivotEngine's</b> <b>editField</b>
                    method:
    	        </p>
                <button id="edit" className="btn btn-primary" onClick={this.onEditClick.bind(this)}>
                    Edit Amount Field
    	        </button>
            </div>);
    }
    onEditClick() {
        this.state.ngPanel.editField(this.state.ngPanel.fields.getField('Amount'));
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
