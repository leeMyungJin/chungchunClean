import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = this._getData();
    dataMap = this._getDataMap();

    private _getDataMap(): wjcGrid.DataMap {
        let countries = 'US,UK,Japan,Other'.split(','),
            arr = countries.map((name, id) => { return { id: id, name: name } });
        return new wjcGrid.DataMap(arr, 'id', 'name');
    }
    private _getData(): any[] {
        debugger
        let data = [],
            map = this._getDataMap(),
            len = map.collectionView.items.length;
        for (let i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: Math.floor(Math.random() * len),
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

