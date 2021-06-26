import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CollectionView }from '@grapecity/wijmo';
import { AllowSorting }from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view = new CollectionView(this.getData());
    allowSorting = AllowSorting.MultiColumn;
    allowSortingOptions = 'None,SingleColumn,MultiColumn'.split(',');

    // change the allowSorting value
    setAllowSorting(value: number) {
        this.view.sortDescriptions.clear(); // remove current sort
        this.allowSorting = value; // apply the new setting
    }

    // generate some random data
    private getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                num1: Math.random() * 5000,
                num2: Math.random() * 5000,
                num3: Math.random() * 5000,
                num4: Math.random() * 5000,
                num5: Math.random() * 5000,
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

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

