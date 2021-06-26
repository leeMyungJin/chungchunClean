import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGridSheet from "@grapecity/wijmo.react.grid.sheet";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="unbound" rowCount={12} columnCount={8}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
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
            flex.applyCellsStyle({ fontWeight: "bold" }, [
                new wjcGrid.CellRange(0, 0, 5, 0),
                new wjcGrid.CellRange(6, 1, 11, 1)
            ]);
            flex.applyCellsStyle({ textDecoration: "underline" }, [
                new wjcGrid.CellRange(0, 2, 5, 2),
                new wjcGrid.CellRange(6, 3, 11, 3)
            ]);
            flex.applyCellsStyle({ fontStyle: "italic" }, [
                new wjcGrid.CellRange(0, 4, 5, 4),
                new wjcGrid.CellRange(6, 5, 11, 5)
            ]);
            flex.applyCellsStyle({ format: "c2" }, [
                new wjcGrid.CellRange(0, 0, 5, 7)
            ]);
            flex.applyCellsStyle({ backgroundColor: "#4488CC" }, [
                new wjcGrid.CellRange(0, 0, 11, 0),
                new wjcGrid.CellRange(0, 2, 11, 2),
                new wjcGrid.CellRange(0, 4, 11, 4)
            ]);
            flex.applyCellsStyle({ color: "#CC8844" }, [
                new wjcGrid.CellRange(0, 1, 11, 1),
                new wjcGrid.CellRange(0, 3, 11, 3),
                new wjcGrid.CellRange(0, 5, 11, 5)
            ]);
            flex.applyCellsStyle({ color: "#336699" }, [
                new wjcGrid.CellRange(0, 6, 5, 7)
            ]);
            flex.applyCellsStyle({ backgroundColor: "#996633" }, [
                new wjcGrid.CellRange(6, 6, 11, 7)
            ]);
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
