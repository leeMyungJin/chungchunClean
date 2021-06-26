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
        this.state = {
            isFrozen: false,
            flex: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="unbound" rowCount={30} columnCount={12}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <button type="button" className="btn btn-default" onClick={this.freezeCells.bind(this)}>{this.state.isFrozen ? 'UnFreeze' : 'Freeze'}</button>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            let colIdx, rowIdx;
            for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                    flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                }
            }
        });
        flex.selectedSheetChanged.addHandler(() => {
            if (flex.frozenColumns > 0 || flex.frozenRows > 0) {
                this.setState({
                    isFrozen: true
                });
            }
            else {
                this.setState({
                    isFrozen: false
                });
            }
        });
        this.setState({
            flex: flex
        });
    }
    freezeCells() {
        this.state.flex.freezeAtCursor();
        if (this.state.flex.frozenColumns > 0 || this.state.flex.frozenRows > 0) {
            this.setState({
                isFrozen: true
            });
        }
        else {
            this.setState({
                isFrozen: false
            });
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
