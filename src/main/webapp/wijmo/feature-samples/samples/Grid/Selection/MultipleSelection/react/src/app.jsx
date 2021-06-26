import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { glbz, isNumber, saveFile } from "@grapecity/wijmo";
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import { CellRange } from "@grapecity/wijmo.grid";
;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.grid = null;
        this.state = {
            data: this.getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <FlexGrid alternatingRowStep={0} showMarquee={true} anchorCursor={true} selectionMode="MultiRange" showSelectedHeaders="All" itemsSource={this.state.data} initialized={s => this.grid = s} 
        // update aggregate display when selection changes
        selectionChanged={(s) => {
            // calculate aggregates
            let tally = { cnt: 0, cntAll: 0, sum: 0, avg: 0 }, ranges = this.grid.selectedRanges;
            for (let i = 0; i < ranges.length; i++) {
                this.aggregateRange(tally, this.grid, ranges, i);
            }
            // update the display using template literals
            let msg = (tally.cnt > 1)
                ? glbz `Count: <b>${tally.cntAll}:n0</b>\tAverage: <b>${tally.avg}:g4\tSum: <b>${tally.sum}:g4</b>`
                : (tally.cntAll > 1)
                    ? glbz `Count: <b>${tally.cntAll}:n0</b>`
                    : 'Ready';
            // update the display using wijmo.format
            //let msg = (tally.cnt > 1)
            //    ? format('Count: <b>{cntAll:n0}</b>\tAverage: <b>{avg:g4}</b>\tSum: <b>{sum:g4}</b>', tally)
            //    : (tally.cntAll > 1)
            //        ? format('Count: <b>{cntAll:n0}</b>', tally)
            //        : 'Ready';
            // show the result
            document.getElementById('mr-aggregates').innerHTML = msg;
        }}/>
            <pre id="mr-aggregates">Ready</pre>

            <button className="btn btn-primary" onClick={() => this.exportGridToCsv(this.grid, false)}>
                Export Whole Grid
            </button>
            {' '}
            <button id="btn-csv-sel" className="btn btn-primary" onClick={() => this.exportGridToCsv(this.grid, true)}>
                Export Selection
            </button>
        </div>;
    }
    // update aggregates for a range, accounting for overlapping ranges
    aggregateRange(tally, grid, ranges, index) {
        let rng = ranges[index];
        for (let r = rng.topRow; r <= rng.bottomRow; r++) {
            for (let c = rng.leftCol; c <= rng.rightCol; c++) {
                // account for overlapping ranges
                let overlapped = false;
                for (let i = 0; i < index && !overlapped; i++) {
                    let rng = ranges[i];
                    if (rng.contains(r, c)) {
                        overlapped = true;
                    }
                }
                // tally non-overlapped cells
                if (!overlapped) {
                    let data = grid.getCellData(r, c, false);
                    if (isNumber(data)) { // handle numbers
                        tally.cnt++;
                        tally.sum += data;
                    }
                    if (data !== '' && data !== null) { // handle non-empty cells
                        tally.cntAll++;
                    }
                }
            }
        }
        tally.avg = tally.cnt > 0 ? tally.sum / tally.cnt : 0;
    }
    // export the grid or selection to CSV
    exportGridToCsv(grid, selection) {
        let rng = selection
            ? null // selection plus extended selection
            : new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1);
        let csv = grid.getClipString(rng, true, true);
        saveFile(csv, selection ? 'FlexGridSelection.csv' : 'FlexGrid.csv');
    }
    // create some random data
    getData() {
        let data = [];
        let countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
        for (let i = 0; i < 300; i++) {
            data.push({
                id: i,
                from: countries[i % countries.length],
                to: countries[(i + 1) % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                amount: Math.random() * 10000,
                extra: Math.random() * 10000,
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
