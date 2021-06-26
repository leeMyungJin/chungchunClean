import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
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
            <label>
                showAlternatingRows
                <input type="checkbox" onClick={this.onShowAlternatingRowsClick.bind(this)}/>
            </label>
            <wjcGrid.FlexGrid loadedRows={this.onloadedRows.bind(this)} itemsSource={this.state.data} alternatingRowStep={0} initialized={this.initialGrid.bind(this)}>
                <wjcGrid.FlexGridColumn binding="id" header="ID" width={50}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="country" header="Country"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="product" header="Product"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales" format="c0"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses" format="c0"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initialGrid(grid) {
        this.grid = grid;
    }
    onloadedRows(grid) {
        for (let i = 0; i < grid.rows.length; i++) {
            let row = grid.rows[i];
            let item = row.dataItem;
            if (item.sales > 6000) {
                row.cssClass = 'high-value';
            }
            else if (item.sales < 1000) {
                row.cssClass = 'low-value';
            }
        }
    }
    onShowAlternatingRowsClick(e) {
        this.grid.alternatingRowStep = e.target.checked ? 1 : 0;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
