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
            <button className="btn btn-default" onClick={this.onReload.bind(this)}>
                Reload
            </button>
            <wjcGrid.FlexGrid itemsSource={this.state.data} allowResizing="Both" initialized={this.initialGrid.bind(this)}></wjcGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        var heightMap = null;
        this.grid.loadingRows.addHandler(() => {
            heightMap = new Map();
            this.grid.rows.forEach((row) => {
                heightMap.set(row.dataItem, row.height);
            });
            console.log('saved');
        });
        this.grid.loadedRows.addHandler(() => {
            this.grid.rows.forEach((row) => {
                let height = heightMap.get(row.dataItem);
                if (height != null) {
                    row.height = height;
                }
            });
            console.log('restored');
        });
    }
    initialGrid(grid) {
        this.grid = grid;
    }
    onReload() {
        this.grid.collectionView.refresh();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
