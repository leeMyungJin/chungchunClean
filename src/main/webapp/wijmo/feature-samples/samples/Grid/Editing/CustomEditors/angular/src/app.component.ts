import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { InputDate, InputTime, ComboBox, AutoComplete, InputNumber, InputColor } from '@grapecity/wijmo.input';
import { DataMap }from '@grapecity/wijmo.grid';
import { getData, getCountries, getProducts } from './data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = getData();
    countries = getCountries();
    products = getProducts();
    productMap = new DataMap(this.products, 'id', 'name');
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

