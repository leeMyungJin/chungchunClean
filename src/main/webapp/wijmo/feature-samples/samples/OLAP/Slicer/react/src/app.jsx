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
        let ng = new wjcOlap.PivotEngine({
            itemsSource: getData(1000),
            valueFields: ['Amount'],
            rowFields: ['Buyer'],
            filterFields: ['Date'] // filter
        }), fldAmount = ng.fields.getField('Amount'), fldDate = ng.fields.getField('Date');
        fldAmount.format = 'c0';
        fldDate.format = 'MMMM yyyy';
        this.state = { ng, fldAmount, fldDate, showHeader: true, showCheckboxes: false };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <p>Slicer:</p>
                        <Olap.Slicer id="sample-slicer" field={this.state.fldDate} initialized={control => this.slicer = control} showCheckboxes={this.state.showCheckboxes} showHeader={this.state.showHeader}/>
                    </div>
                    <div className="col-xs-6">
                        <p>
                            Amount spent by each buyer.
                        </p>
                        <Olap.PivotGrid itemsSource={this.state.ng}></Olap.PivotGrid>
                    </div>
                </div>
                <p>
                    You can customize the <b>Slicer</b> control to hide or show
                    a header, and to hide or show checkboxes next to each item:
                </p>
                <label>
                    Show Header
                    <input id="showHeader" type="checkbox" checked={this.state.showHeader} onClick={this.onShowHeaderClick.bind(this)}/>
                </label>
                <br />
                <label>
                    Show Checkboxes
                    <input id="showCheckboxes" type="checkbox" checked={this.state.showCheckboxes} onClick={this.onShowCheckboxesClick.bind(this)}/>
                </label>
                <p>
                    If you change the <b>format</b> property of the field
                    being filtered by the <b>Slicer</b>, the value list
                    is updated automatically:
                </p>
                <button className="btn btn-primary" id="editfield" onClick={this.onEditFieldClick.bind(this)}>
                    Edit Date Field...
                </button>
            </div>);
    }
    onShowHeaderClick(e) {
        this.setState({ showHeader: e.target.checked });
    }
    onShowCheckboxesClick(e) {
        this.setState({ showCheckboxes: e.target.checked });
    }
    onEditFieldClick(e) {
        this.state.ng.editField(this.slicer.field);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
