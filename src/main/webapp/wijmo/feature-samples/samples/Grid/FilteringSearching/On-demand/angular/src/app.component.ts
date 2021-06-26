import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { CollectionView } from '@grapecity/wijmo';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: CollectionView;

    constructor() {
        this.data = new CollectionView(this._getData(), {
            refreshOnEdit: false // on-demand sorting and filtering
        });
    }

    private _getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, WjGridFilterModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

