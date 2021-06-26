import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { glbz, format, isNumber, saveFile } from '@grapecity/wijmo';
import { FlexGrid, CellRange } from '@grapecity/wijmo.grid';

// object used to compute range statistics
interface ITally {
    cnt: number,
    cntAll: number,
    sum: number,
    avg: number
};

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    // reference to grid component
    @ViewChild('grid', { static: true }) grid: FlexGrid;

    // update aggregates when selection changes
    selectionChanged() {

        // calculate aggregates
        let tally: ITally = { cnt: 0, cntAll: 0, sum: 0, avg: 0 },
            ranges = this.grid.selectedRanges;
        for (let i = 0; i < ranges.length; i++) {
            this.aggregateRange(tally, this.grid, ranges, i);
        }

        // update the display using template literals
        let msg = (tally.cnt > 1)
            ? glbz`Count: <b>${tally.cntAll}:n0</b>\tAverage: <b>${tally.avg}:g4\tSum: <b>${tally.sum}:g4</b>`
            : (tally.cntAll > 1)
                ? glbz`Count: <b>${tally.cntAll}:n0</b>`
                : 'Ready'

        // update the display using wijmo.format
        //let msg = (tally.cnt > 1)
        //    ? format('Count: <b>{cntAll:n0}</b>\tAverage: <b>{avg:g4}</b>\tSum: <b>{sum:g4}</b>', tally)
        //    : (tally.cntAll > 1)
        //        ? format('Count: <b>{cntAll:n0}</b>', tally)
        //        : 'Ready';

        // show the result
        document.getElementById('mr-aggregates').innerHTML = msg;
    }

    // update aggregates for a range, accounting for overlapping ranges
    aggregateRange(tally: ITally, grid: FlexGrid, ranges: CellRange[], index: number) {
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
    exportGridToCsv(selection: boolean) {
        let rng = selection
            ? null // selection plus extended ranges
            : new CellRange(0, 0, this.grid.rows.length - 1, this.grid.columns.length - 1);
        let csv = this.grid.getClipString(rng, true, true);
        saveFile(csv, selection ? 'FlexGridSelection.csv' : 'FlexGrid.csv', 'text/csv');
    }

    // create some random data
    private _getData() {
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

@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

