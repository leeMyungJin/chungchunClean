import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { FlexGrid, CellRange } from '@grapecity/wijmo.grid';
import { Control } from '@grapecity/wijmo';
import * as DataService from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // data
    data = DataService.getData(1500);
    products = DataService.getProducts();
    colors = DataService.getColors();
    countryMap = DataService.getCountryMap();

    // get a country object from a data item
    // (this makes our template expressions simpler)
    getCountry(item: any) {
        return this.countryMap.getDataItem(item.country);
    }

    // compare
    benchmark() {
        let reps = 250;
        let grid = Control.getControl(document.querySelector('.bm-angular')) as FlexGrid;
        let start = Date.now();
        for (let i = 0; i < reps; i++) {
            grid.refresh(true);
        }
        console.log('angular done in', Date.now() - start);

        grid = Control.getControl(document.querySelector('.bm-ct')) as FlexGrid;
        start = Date.now();
        for (let i = 0; i < reps; i++) {
            grid.refresh(true);
        }
        console.log('cellTemplate done in', Date.now() - start);

        grid = Control.getControl(document.querySelector('.bm-none')) as FlexGrid;
        start = Date.now();
        for (let i = 0; i < reps; i++) {
            grid.refresh(true);
        }
        console.log('no template done in', Date.now() - start);
    }
}

@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

