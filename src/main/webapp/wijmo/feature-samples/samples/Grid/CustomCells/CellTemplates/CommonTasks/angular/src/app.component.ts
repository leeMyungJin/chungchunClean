import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as DataService from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // data
    data = DataService.getData();
    products = DataService.getProducts();
    colors = DataService.getColors();
    countryMap = DataService.getCountryMap();

    // get a country object from a data item
    // (this makes our template expressions simpler)
    getCountry(item: any) {
        return this.countryMap.getDataItem(item.country);
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

