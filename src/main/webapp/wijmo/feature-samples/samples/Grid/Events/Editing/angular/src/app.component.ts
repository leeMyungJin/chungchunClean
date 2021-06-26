import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = this.getData();
    countries = this.getCountries();
    logText: string = 'please select a range on the grid';

    flexInitialized(flexgrid: wjcGrid.FlexGrid) {
        this.logText = '';
        flexgrid.beginningEdit.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            let col = s.columns[e.col];
            if (col.binding != 'overdue') {
                let item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;
                    this.logText = 'Overdue items cannot be edited';
                }
            }
        });
        flexgrid.cellEditEnding.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellEditEndingEventArgs) => {
            this.logText = '';
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = wjcCore.changeType(s.activeEditor.value, wjcCore.DataType.Number, col.format);
                if (!wjcCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                    e.cancel = true;
                    this.logText = 'Please enter a positive amount';
                }
            }
        });
    }

    getCountries() {
        return ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
    }
    getData() {
        return this.getCountries().map((country, index) => {
            return {
                id: index,
                country: country,
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: (index + 1) % 4 == 0
            }
        });
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

