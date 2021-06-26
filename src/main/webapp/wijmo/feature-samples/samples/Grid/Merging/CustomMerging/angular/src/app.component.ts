import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

class CustomMergeManager extends wjGrid.MergeManager {
    getMergedRange(panel: wjGrid.GridPanel, r: number, c: number, clip: boolean = true) {
        //
        // create basic cell range
        var rng = new wjGrid.CellRange(r, c);
        //
        // expand left/right
        for (var i = rng.col; i < panel.columns.length - 1; i++) {
            if (panel.getCellData(rng.row, i, true) != panel.getCellData(rng.row, i + 1, true))
                break;
            rng.col2 = i + 1;
        }
        for (var i = rng.col; i > 0; i--) {
            if (panel.getCellData(rng.row, i, true) != panel.getCellData(rng.row, i - 1, true))
                break;
            rng.col = i - 1;
        }
        //
        // expand up/down
        for (var i = rng.row; i < panel.rows.length - 1; i++) {
            if (panel.getCellData(i, rng.col, true) != panel.getCellData(i + 1, rng.col, true))
                break;
            rng.row2 = i + 1;
        }
        for (var i = rng.row; i > 0; i--) {
            if (panel.getCellData(i, rng.col, true) != panel.getCellData(i - 1, rng.col, true))
                break;
            rng.row = i - 1;
        }
        //
        // done
        return rng;
    }
}

function setData(p: wjGrid.GridPanel, r: number, cells: string[]) {
    if (p.cellType == wjGrid.CellType.Cell) {
        p.grid.rowHeaders.setCellData(r, 0, cells[0]);
    }
    for (var i = 1; i < cells.length; i++) {
        p.setCellData(r, i - 1, cells[i]);
    }
}

function centerCell(s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
    if (e.cell.children.length == 0) {
        e.cell.innerHTML = '<div>' + e.cell.innerHTML + '</div>';
        wjCore.setCss(e.cell, {
            display: 'table',
            tableLayout: 'fixed'
        });
        wjCore.setCss(e.cell.children[0], {
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle'
        });
    }
}

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {

    onInitialized(flexGrid: wjGrid.FlexGrid) {
        while (flexGrid.columns.length < 7) {
            flexGrid.columns.push(new wjGrid.Column());
        }
        while (flexGrid.rows.length < 5) {
            flexGrid.rows.push(new wjGrid.Row());
        }

        // configure the grid
        flexGrid.mergeManager = new CustomMergeManager();
        flexGrid.formatItem.addHandler(centerCell);
        flexGrid.rowHeaders.columns[0].width = 80;
        flexGrid.rows.defaultSize = 40;
        flexGrid.alternatingRowStep = 0;
        flexGrid.isReadOnly = true;

        // populate the grid
        setData(flexGrid.columnHeaders, 0, ',Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'.split(','));
        setData(flexGrid.cells, 0, '12:00,Walker,Morning Show,Morning Show,Sport,Weather,N/A,N/A'.split(','));
        setData(flexGrid.cells, 1, '13:00,Today Show,Today Show,Sesame Street,Football,Market Watch,N/A,N/A'.split(','));
        setData(flexGrid.cells, 2, '14:00,Today Show,Today Show,Kid Zone,Football,Soap Opera,N/A,N/A'.split(','));
        setData(flexGrid.cells, 3, '15:00,News,News,News,News,News,N/A,N/A'.split(','));
        setData(flexGrid.cells, 4, '16:00,News,News,News,News,News,N/A,N/A'.split(','));
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
