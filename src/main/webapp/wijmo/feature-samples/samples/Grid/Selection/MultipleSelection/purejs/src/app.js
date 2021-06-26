import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { glbz, isNumber, saveFile } from '@grapecity/wijmo';
import { FlexGrid, SelectionMode, CellRange } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
;
function init() {
    // show the data in a grid
    var theGrid = new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        showMarquee: true,
        showSelectedHeaders: 'All',
        anchorCursor: true,
        selectionMode: SelectionMode.MultiRange,
        itemsSource: getData(),
        // update aggregate display when selection changes
        selectionChanged: (s, e) => {
            // calculate aggregates
            let tally = { cnt: 0, cntAll: 0, sum: 0, avg: 0 }, ranges = s.selectedRanges;
            for (let i = 0; i < ranges.length; i++) {
                aggregateRange(tally, s, ranges, i);
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
        }
    });
    // update aggregates for a range, accounting for overlapping ranges
    function aggregateRange(tally, grid, ranges, index) {
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
    // export grid or selection to CSV
    document.getElementById('btn-csv-grid').addEventListener('click', () => {
        var rng = new CellRange(0, 0, theGrid.rows.length - 1, theGrid.columns.length - 1), csv = theGrid.getClipString(rng, true, true);
        saveFile(csv, 'FlexGrid.csv');
    });
    document.getElementById('btn-csv-sel').addEventListener('click', () => {
        var csv = theGrid.getClipString(null, true, true);
        saveFile(csv, 'FlexGridSelection.csv');
    });
    // create some random data
    function getData() {
        var data = [];
        var countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
        for (var i = 0; i < 300; i++) {
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
