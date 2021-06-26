import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as olap from '@grapecity/wijmo.olap';
import * as wjcOlap from '@grapecity/wijmo.react.olap';
import { CellRange } from '@grapecity/wijmo.grid';
import { saveFile } from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    // initialize state
    constructor(props) {
        super(props);
        this._ng = new olap.PivotEngine({
            itemsSource: getData(1000),
            showRowTotals: 'Subtotals',
            showColumnTotals: 'None',
            totalsBeforeData: true,
            rowFields: ['Country', 'Product', 'Color'],
            valueFields: ['Sales', 'Expenses', 'Downloads']
        });
        this.state = {
            outlineMode: true,
            customStyle: true,
            totalsBeforeData: true,
            showRowFieldHeaders: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <label>
                    outlineMode{' '}
                    <input id="outlineMode" type="checkbox" checked={this.state.outlineMode} onChange={this._handleInputChange.bind(this)}/>
                </label><br />
                <label>
                    custom style{' '}
                    <input id="customStyle" type="checkbox" checked={this.state.customStyle} onChange={this._handleInputChange.bind(this)}/>
                </label><br />
                <label>
                    totalsBeforeData{' '}
                    <input id="totalsBeforeData" type="checkbox" checked={this.state.totalsBeforeData} onChange={this._handleInputChange.bind(this)}/>
                </label><br />
                <label>
                    showRowFieldHeaders{' '}
                    <input id="showRowFieldHeaders" type="checkbox" checked={this.state.showRowFieldHeaders} onChange={this._handleInputChange.bind(this)}/>
                </label><br />
                <div className="row">
                    <div className="col-xs-5">
                        <wjcOlap.PivotPanel itemsSource={this._ng}>
                        </wjcOlap.PivotPanel>
                    </div>
                    <div className={'col-xs-7' + (this.state.customStyle ? ' outline' : '')}>
                        <wjcOlap.PivotGrid initialized={sender => { this._grid = sender; }} // save reference to the grid
         itemsSource={this._ng} outlineMode={this.state.outlineMode} showRowFieldHeaders={this.state.showRowFieldHeaders}>
                        </wjcOlap.PivotGrid>
                        <button className="btn btn-primary" onClick={this._exportToCsv.bind(this)}>
                            Export to CSV
                        </button>
                    </div>
                </div>
            </div>);
    }
    // handle checkboxes
    _handleInputChange(e) {
        const id = e.target.id;
        const checked = e.target.checked;
        this.setState({
            [id]: checked
        });
        switch (id) {
            case 'totalsBeforeData': // update engine from state
                this._ng.totalsBeforeData = checked;
                break;
            case 'outlineMode': // changing outlineMode resets subtotal position, style 
                if (checked) {
                    this._ng.totalsBeforeData = checked;
                    this.setState({ totalsBeforeData: checked });
                }
                else {
                    this.setState({ customStyle: checked });
                }
                break;
        }
    }
    // export grid to CSV
    _exportToCsv() {
        let grid = this._grid, rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1), csv = grid.getClipString(rng, true, true, true);
        saveFile(csv, 'FlexGrid.csv');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
