import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: {
                data: this.getData(),
                frozenRows: 2,
                frozenColumns: 1
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid id="sample-grid" frozenRows={this.state.grid.frozenRows} frozenColumns={this.state.grid.frozenColumns} itemsSource={this.state.grid.data} initialized={this._gridInitialized.bind(this)}>
            </wjcGrid.FlexGrid>
            <div>
                <button onClick={this.freezeRows.bind(this)} className="btn btn-default">
                    Toggle Frozen Rows
                    </button>
                <button onClick={this.freezeColumns.bind(this)} className="btn btn-default">
                    Toggle Frozen Columns
                    </button>
            </div>
        </div>;
    }
    _gridInitialized(sender) {
        this._grid = sender;
    }
    freezeRows() {
        this._grid.frozenRows = this._grid.frozenRows > 0 ? 0 : 2;
    }
    freezeColumns() {
        this._grid.frozenColumns = this._grid.frozenColumns > 0 ? 0 : 1;
    }
    getData() {
        // generate some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                num1: Math.random() * 5000,
                num2: Math.random() * 5000,
                num3: Math.random() * 5000,
                num4: Math.random() * 5000,
                num5: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
