import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
import { getData, getCountries, getProducts } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(50),
            countries: getCountries(),
            products: getProducts(),
            fileName: "",
            flex: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Country" itemsSource={this.state.data}></wjGridSheet.Sheet>
                    <wjGridSheet.Sheet name="Unbound" rowCount={20} columnCount={9}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <div className="form-inline well well-lg">
                    <input type="file" className="form-control" id="importFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                    <button className="btn btn-default" onClick={this.load.bind(this)}>Load</button>
                </div>
                <div className="form-inline well well-lg">
                    File Name:
                    <input type="text" className="form-control" onChange={this.setFileName.bind(this)} value={this.state.fileName}/>
                    <button className="btn btn-default" onClick={this.save.bind(this)}>Save</button>
                </div>
            </div>);
    }
    initializeFlexSheet(flex) {
        flex.deferUpdate(() => {
            let sheetIdx, sheetName, colIdx, rowIdx;
            // initialize the dataMap for the bound sheet.
            if (flex) {
                for (sheetIdx = 0; sheetIdx < flex.sheets.length; sheetIdx++) {
                    flex.selectedSheetIndex = sheetIdx;
                    sheetName = flex.selectedSheet.name;
                    if (sheetName === "Country") {
                        let column = flex.columns.getColumn("countryId");
                        if (column && !column.dataMap) {
                            column.dataMap = this._buildDataMap(this.state.countries);
                        }
                        column = flex.columns.getColumn("productId");
                        if (column && !column.dataMap) {
                            column.dataMap = this._buildDataMap(this.state.products);
                        }
                        column = flex.columns.getColumn("amount");
                        if (column) {
                            column.format = "c2";
                        }
                    }
                    else {
                        for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                            for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                                flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                            }
                        }
                    }
                }
                flex.selectedSheetIndex = 0;
            }
        });
        this.setState({
            flex: flex
        });
    }
    // Load xlsx file to FlexSheet.
    load() {
        let fileInput = document.getElementById("importFile");
        if (this.state.flex && fileInput.files[0]) {
            this.state.flex.loadAsync(fileInput.files[0]);
        }
    }
    // Save FlexSheet to xlsx file.
    save() {
        let fileName;
        if (!!this.state.fileName) {
            fileName = this.state.fileName;
        }
        else {
            fileName = "FlexSheet.xlsx";
        }
        this.state.flex.saveAsync(fileName);
    }
    // build a data map from a string array using the indices as keys
    _buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjcGrid.DataMap(map, "key", "value");
    }
    setFileName(name) {
        this.setState({
            fileName: name.target.value
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
