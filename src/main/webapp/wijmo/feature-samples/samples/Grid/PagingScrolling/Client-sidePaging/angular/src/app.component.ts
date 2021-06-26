import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CollectionView }  from '@grapecity/wijmo';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = this._getData();

    private _getData() {

        // create an array with 1000 data items
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        let products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
        let data = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }

        // create a paged CollectionView with 6 items per page
        return new CollectionView(data, {
            pageSize: 6
        });
    }
}

@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

