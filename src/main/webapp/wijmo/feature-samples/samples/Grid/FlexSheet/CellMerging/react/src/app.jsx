import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.mergeCells = () => {
            this._flex.mergeRange();
            this.setState(this._flex.getSelectionFormatState());
        };
        this.state = {};
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet id="sample-sheet" initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="unbound" rowCount={20} columnCount={10}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <button onClick={this.mergeCells.bind(this)} type="button" className="btn btn-default">
                    {this.state.isMergedCell ? 'UnMerge' : 'Merge'}
                </button>
            </div>);
    }
    initializeFlexSheet(flex) {
        this._flex = flex;
        this._flex.deferUpdate(() => {
            for (let row = 0; row < this._flex.rows.length; row++) {
                for (let col = 0; col < this._flex.columns.length; col++) {
                    this._flex.setCellData(row, col, row + col);
                }
            }
        });
        this._flex.selectionChanged.addHandler(() => {
            this.setState(this._flex.getSelectionFormatState());
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
