import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flex: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="unbound" rowCount={20} columnCount={10}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <div className="row well well-lg">
                    <div className="btn-group">
                        <button type="button" className="btn btn-default" onClick={this.addRowHeader.bind(this)}>Add Row Header</button>
                        <button type="button" className="btn btn-default" onClick={this.removeRowHeader.bind(this)}>Remove Row Header</button>
                        <button type="button" className="btn btn-default" onClick={this.addColumnHeader.bind(this)}> Add Column Header</button>
                        <button type="button" className="btn btn-default" onClick={this.removeColumnHeader.bind(this)}> Remove Column Header</button>
                    </div>
                </div>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            for (let row = 0; row < flex.rows.length; row++) {
                for (let col = 0; col < flex.columns.length; col++) {
                    flex.setCellData(row, col, row + col);
                }
            }
        });
        this.setState({ flex: flex });
    }
    addRowHeader() {
        this.state.flex.rowHeaders.columns.push(new wjcGrid.Column());
        this.setState(this.state);
    }
    removeRowHeader() {
        let colCnt = this.state.flex.rowHeaders.columns.length;
        if (colCnt > 0) {
            this.state.flex.rowHeaders.columns.removeAt(colCnt - 1);
        }
    }
    addColumnHeader() {
        this.state.flex.columnHeaders.rows.push(new wjcGrid.Row());
    }
    removeColumnHeader() {
        let rowCnt = this.state.flex.columnHeaders.rows.length;
        if (rowCnt > 0) {
            this.state.flex.columnHeaders.rows.removeAt(rowCnt - 1);
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
