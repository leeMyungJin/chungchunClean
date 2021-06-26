import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
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
            <p>Drag rows from the grid by the row header:</p>
            <wjGrid.FlexGrid initialized={this.initGrid.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
            <p>And drop them here:</p>
            <div id="theTarget" className="theTarget">Drop rows here...</div>
            </div>;
    }
    initGrid(grid) {
        this.flex = grid;
    }
    makeDragSource(s) {
        // make rows draggable
        s.itemFormatter = (panel, r, c, cell) => {
            if (panel.cellType == wjcGrid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
                cell.draggable = true;
            }
        };
        // disable built-in row drag/drop
        s.addEventListener(s.hostElement, "mousedown", e => {
            if (s.hitTest(e).cellType == wjcGrid.CellType.RowHeader) {
                e.stopPropagation();
            }
        }, true);
        // handle drag start
        s.addEventListener(s.hostElement, "dragstart", e => {
            let ht = s.hitTest(e);
            if (ht.cellType == wjcGrid.CellType.RowHeader) {
                s.select(new wjcGrid.CellRange(ht.row, 0, ht.row, s.columns.length - 1));
                e.dataTransfer.effectAllowed = "copy";
                e.dataTransfer.setData("text", ht.row.toString());
            }
        }, true);
    }
    makeDropTarget(s) {
        s.addEventListener("dragover", e => {
            let dragRow = e.dataTransfer.getData("text");
            if (dragRow != null) {
                e.dataTransfer.dropEffect = "copy";
                e.preventDefault();
            }
        });
        s.addEventListener("drop", e => {
            let dragRow = e.dataTransfer.getData("text");
            if (dragRow != null) {
                let item = this.flex.rows[parseInt(dragRow)].dataItem;
                alert("thanks for dropping row " +
                    JSON.stringify(item) +
                    " here.");
                e.preventDefault();
            }
        });
    }
    componentDidMount() {
        this.makeDragSource(this.flex);
        this.makeDropTarget(document.querySelector("#theTarget"));
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
