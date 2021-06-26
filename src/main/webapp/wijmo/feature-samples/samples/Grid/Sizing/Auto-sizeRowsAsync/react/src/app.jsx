import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <button onClick={this.onAsSyncClick.bind(this)} className="btn btn-default">AutoSizeRows (synchronously)</button>
            <FlexGrid itemsSource={this.state.data} loadedRows={this.onLoadedRows.bind(this)} cellEditEnded={this.onCellEditEnded.bind(this)} scrollPositionChanged={this.onScrollPositionChanged.bind(this)} resizedColumn={this.onResizedColumn.bind(this)} initialized={this.initialized.bind(this)}>
                <FlexGridColumn binding="id" header="ID" minWidth={60} isReadOnly={true}/>
                <FlexGridColumn binding="countries" header="Countries" width={150} wordWrap={true}/>
                <FlexGridColumn binding="sales" header="Sales"/>
                <FlexGridColumn binding="expenses" header="Expenses"/>
            </FlexGrid>
        </div>;
    }
    initialized(grid) {
        this.theGrid = grid;
        setTimeout(() => {
            this.autoSizeRowsAsync(grid);
        }, 50);
    }
    onLoadedRows(grid) {
        this.autoSizeRowsAsync(grid);
    }
    onCellEditEnded(grid, e) {
        if (grid.columns[e.col].wordWrap) {
            this.autoSizeRowsAsync(grid, e.row);
        }
    }
    onScrollPositionChanged(grid) {
        var vr = grid.viewRange;
        for (var r = vr.topRow; r <= vr.bottomRow; r++) {
            if (grid.rows[r].height == null) {
                grid.autoSizeRows(r, r);
            }
        }
    }
    onResizedColumn(grid, e) {
        if (grid.columns[e.col].wordWrap) {
            this.autoSizeRowsAsync(grid);
        }
    }
    autoSizeRowsAsync(grid, rowIndex) {
        if (rowIndex != null) {
            grid.rows[rowIndex].height = null;
        }
        else {
            grid.rows.forEach(row => row.height = null);
        }
        grid.onScrollPositionChanged();
    }
    onAsSyncClick() {
        var start = Date.now();
        this.theGrid.autoSizeRows();
        alert("AutoSized all rows in " + (Date.now() - start) + "ms");
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
