import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Tooltip, format } from '@grapecity/wijmo';
import { FlexGrid, CellRangeEventArgs } from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    countries = ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
    private _tt: Tooltip;

    constructor() {
        this.data = this._getData();
        this._tt = new Tooltip();
    }

    flexInitialized(flexgrid: FlexGrid) {
        flexgrid.resizingColumn.addHandler((s: FlexGrid, e: CellRangeEventArgs) => {
            var cell = s.columnHeaders.getCellElement(0, e.col);
            var col = e.panel.columns[e.col];
            var tip = format('Column: <b>{col}</b>, Width: <b>{wid:n0}px</b>', {
                col: col.header || '[no header]',
                wid: col.width
            })
            this._tt.show(cell, tip);
        });
        flexgrid.resizedColumn.addHandler(() => {
            this._tt.hide();
        });
    }

    private _getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: (i + 1) % 4 == 0
            });
        }
        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

