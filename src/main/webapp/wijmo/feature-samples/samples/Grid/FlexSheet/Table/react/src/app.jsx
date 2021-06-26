import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
import { getTableData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flex: null,
            cboTableStyles: null,
            tableStyleNames: [],
            selectedTable: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Table" rowCount={20} columnCount={7}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                {this.renderDiv()}
            </div>);
    }
    initializeFlexSheet(flex) {
        let tableStyle, table, i;
        for (i = 1; i <= 21; i++) {
            this.state.tableStyleNames.push("TableStyleLight" + i);
        }
        for (i = 1; i <= 28; i++) {
            this.state.tableStyleNames.push("TableStyleMedium" + i);
        }
        for (i = 1; i <= 11; i++) {
            this.state.tableStyleNames.push("TableStyleDark" + i);
        }
        tableStyle = flex.getBuiltInTableStyle("TableStyleDark9");
        table = flex.selectedSheet.addTableFromArray(2, 1, getTableData(10), null, "Table1", tableStyle, { showTotalRow: true });
        flex.selectionChanged.addHandler((sender, args) => {
            let selection = args.range;
            if (selection.isValid) {
                this._getSelectedTable(selection, flex);
            }
            else {
                this.setState({
                    selectedTable: null
                });
            }
        });
        flex.updatedLayout.addHandler(() => {
            if (flex.selection && flex.selection.isValid) {
                this._getSelectedTable(flex.selection, flex);
            }
            else {
                this.setState({
                    selectedTable: null
                });
            }
        });
        this.setState({
            flex: flex
        });
    }
    cboTableStylesInit(cboTableStyles) {
        cboTableStyles.selectedIndexChanged.addHandler(() => {
            // apply the table style for the selected table
            if (this.state.selectedTable) {
                let tableStyle = this.state.flex.getBuiltInTableStyle(cboTableStyles.selectedValue);
                this.state.selectedTable.style = tableStyle;
            }
        });
        if (this.state.selectedTable) {
            cboTableStyles.selectedValue = this.state.selectedTable.style.name;
        }
        this.setState({
            cboTableStyles: cboTableStyles
        });
    }
    // Get selected table in FlexSheet.
    _getSelectedTable(selection, flexSheet) {
        this.setState({
            selectedTable: flexSheet.selectedSheet.findTable(selection.row, selection.col)
        });
        if (this.state.selectedTable && this.state.cboTableStyles) {
            var tableStyle = flexSheet.getBuiltInTableStyle(this.state.selectedTable.style.name);
            if (tableStyle) {
                this.state.cboTableStyles.selectedValue = tableStyle.name;
            }
        }
    }
    change(index) {
        switch (index) {
            case 0:
                this.state.selectedTable.showHeaderRow = !this.state.selectedTable.showHeaderRow;
                break;
            case 1:
                this.state.selectedTable.showTotalRow = !this.state.selectedTable.showTotalRow;
                break;
            case 2:
                this.state.selectedTable.showBandedRows = !this.state.selectedTable.showBandedRows;
                break;
            case 3:
                this.state.selectedTable.showBandedColumns = !this.state.selectedTable.showBandedColumns;
                break;
            case 4:
                this.state.selectedTable.alterFirstColumn = !this.state.selectedTable.alterFirstColumn;
                break;
            case 5:
                this.state.selectedTable.alterLastColumn = !this.state.selectedTable.alterLastColumn;
                break;
        }
        this.forceUpdate();
    }
    renderDiv() {
        if (!this.state.selectedTable) {
            return;
        }
        return (<div className="well well-lg">
                <h4>Table Style Options</h4>
                <div>
                    <label>
                        <input className="form-check-input" type="checkbox" checked={this.state.selectedTable.showHeaderRow} onChange={() => this.change(0)}/>
                        Header Row
                        </label>
                    <label>
                        <input className="form-check-input" type="checkbox" checked={this.state.selectedTable.showTotalRow} onChange={() => this.change(1)}/>
                        Total Row
                        </label>
                </div>
                <div>
                    <label>
                        <input className="form-check-input" type="checkbox" checked={this.state.selectedTable.showBandedRows} onChange={() => this.change(2)}/>
                        Banded Rows
                        </label>
                    <label>
                        <input className="form-check-input" type="checkbox" checked={this.state.selectedTable.showBandedColumns} onChange={() => this.change(3)}/>
                        Banded Columns
                        </label>
                </div>
                <div>
                    <label>
                        <input className="form-check-input" type="checkbox" checked={this.state.selectedTable.alterFirstColumn} onChange={() => this.change(4)}/>
                        First Column
                        </label>
                    <label>
                        <input className="form-check-input" type="checkbox" checked={this.state.selectedTable.alterLastColumn} onChange={() => this.change(5)}/>
                        Last Column
                        </label>
                </div>
                <div>
                    <label style={{ width: "auto" }}>Built-in Styles:</label>
                    <wjInput.ComboBox itemsSource={this.state.tableStyleNames} isEditable={false} initialized={this.cboTableStylesInit.bind(this)}></wjInput.ComboBox>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
