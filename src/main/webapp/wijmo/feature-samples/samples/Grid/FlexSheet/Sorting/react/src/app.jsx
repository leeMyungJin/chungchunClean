import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcSheet from "@grapecity/wijmo.grid.sheet";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
import { getData, getCountries, getProducts } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(50),
            sortManager: null,
            columns: [],
            countries: getCountries(),
            products: getProducts()
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Country" itemsSource={this.state.data}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "50%" }}>Column</th>
                            <th className="text-center" style={{ width: "50%" }}>Order</th>
                        </tr>
                    </thead>
                    {this.renderTbody()}
                </table>
                <div className="btn-group">
                    <button type="button" className="btn btn-default" onClick={this.addSortLevel.bind(this)}>Add Level</button>
                    <button type="button" className="btn btn-default" onClick={this.deleteSortLevel.bind(this)}>Delete Level</button>
                    <button type="button" className="btn btn-default" onClick={this.copySortLevel.bind(this)}>Copy Level</button>
                </div>
                <div className="btn-group">
                    <button id="moveup" type="button" className="btn btn-default" disabled={this.state.sortManager && this.state.sortManager.sortDescriptions.currentPosition <= 0} onClick={() => this.moveSortLevel(-1)}>
                        <span className="glyphicon glyphicon-arrow-up"></span>
                    </button>
                    <button id="movedown" type="button" className="btn btn-default" disabled={this.state.sortManager && this.state.sortManager.sortDescriptions.currentPosition >= this.state.sortManager.sortDescriptions.itemCount - 1} onClick={() => this.moveSortLevel(1)}>
                        <span className="glyphicon glyphicon-arrow-down"></span>
                    </button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-default" onClick={this.commitSort.bind(this)}>OK</button>
                    <button type="button" className="btn btn-default" onClick={this.cancelSort.bind(this)}>Cancel</button>
                </div>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            let column = flex.columns.getColumn("countryId");
            if (column && !column.dataMap) {
                column.dataMap = this._buildDataMap(this.state.countries);
            }
            column = flex.columns.getColumn("productId");
            if (column && !column.dataMap) {
                column.width = 100;
                column.dataMap = this._buildDataMap(this.state.products);
            }
            column = flex.columns.getColumn("amount");
            if (column) {
                column.format = "c2";
            }
            this.setState({
                sortManager: flex.sortManager,
                columns: this._getColumns(flex)
            });
        });
        flex.selectedSheetChanged.addHandler(() => {
            this.setState({
                columns: this._getColumns(flex)
            });
            if (!this.state.sortManager) {
                this.setState({
                    sortManage: flex.sortManager,
                });
            }
        });
        flex.columnChanged.addHandler(() => {
            this.setState({
                columns: this._getColumns(flex)
            });
        });
    }
    // commit the sorts
    commitSort() {
        this.state.sortManager.commitSort();
        this.forceUpdate();
    }
    // cancel the sorts
    cancelSort() {
        this.state.sortManager.cancelSort();
        this.forceUpdate();
    }
    // add new sort level
    addSortLevel() {
        this.state.sortManager.addSortLevel();
        this.forceUpdate();
    }
    // delete current sort level
    deleteSortLevel() {
        this.state.sortManager.deleteSortLevel();
        this.forceUpdate();
    }
    // copy a new sort level by current sort level setting.
    copySortLevel() {
        this.state.sortManager.copySortLevel();
        this.forceUpdate();
    }
    // move the sort level
    moveSortLevel(offset) {
        this.state.sortManager.moveSortLevel(offset);
        this.forceUpdate();
    }
    // apply column index property for sort item
    applySortColumnIndex(e, sortItem) {
        sortItem.columnIndex = e.target.value;
    }
    // apply asceding property for sort item
    applySortAscending(e, sortItem) {
        if (e.target.value === "true") {
            sortItem.ascending = true;
        }
        else {
            sortItem.ascending = false;
        }
    }
    // build a data map from a string array using the indices as keys
    _buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjcGrid.DataMap(map, "key", "value");
    }
    _getColumns(flexSheet) {
        let columns = [], i = 0;
        if (flexSheet) {
            for (; i < flexSheet.columns.length; i++) {
                columns.push("Column " + wjcSheet.FlexSheet.convertNumberToAlpha(i));
            }
        }
        return columns;
    }
    renderOption(sortItem, column, i) {
        return (<option key={i} selected={(i === sortItem.columnIndex)} value={i}>{column}</option>);
    }
    getClass(sortItem) {
        let flag = (sortItem === this.state.sortManager.sortDescriptions.currentItem);
        if (flag) {
            return "success";
        }
        return "";
    }
    onTrClick(sortItem) {
        this.state.sortManager.sortDescriptions.moveCurrentTo(sortItem);
        this.forceUpdate();
    }
    renderTr(sortItem, i) {
        let option = [];
        this.state.columns.forEach((column, i) => {
            option.push(this.renderOption(sortItem, column, i));
        });
        return (<tr key={i} onClick={() => this.onTrClick(sortItem)} className={this.getClass(sortItem)}>
                <td>
                    <select className="form-control" onChange={(e) => this.applySortColumnIndex(e, sortItem)}>
                        <option value="-1"></option>
                        {option}
                    </select>
                </td>
                <td>
                    <select className="form-control" onChange={(e) => this.applySortAscending(e, sortItem)}>
                        <option value="true" selected={sortItem.ascending}>Ascending</option>
                        <option value="false" selected={!sortItem.ascending}>Descending</option>
                    </select>
                </td>
            </tr>);
    }
    renderTbody() {
        if (!this.state.sortManager) {
            return;
        }
        let tr = [];
        this.state.sortManager.sortDescriptions.items.forEach((sortItem, i) => {
            tr.push(this.renderTr(sortItem, i));
        });
        return (<tbody>
                {tr}
            </tbody>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
