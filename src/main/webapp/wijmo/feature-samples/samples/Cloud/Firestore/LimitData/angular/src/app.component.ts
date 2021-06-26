import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//
import { Firestore, Collection } from  '@grapecity/wijmo.cloud';
import { ComboBox } from  '@grapecity/wijmo.input';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    customers: Collection;
    countries: string[];

    constructor() {

        // create the Firestore data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const PROJECT_ID = 'test-9c0be';
        const fireStore = new Firestore(PROJECT_ID, API_KEY);

        // countries to filter by
        this.countries = 'Brazil,France,Germany,UK,USA'.split(',');

        // load the Customers collection (selected fields, server-side paging)
        this.customers = new Collection(fireStore, 'Customers', {
            sortDescriptions: ['CustomerID'],
            fields: [
                'CustomerID',
                'CompanyName',
                'ContactName',
                'City',
                'Country'
            ],
            pageSize: 6,
            pageOnServer: true
        }).where('Country', '==', this.countries[0]);
    }

    // update filter when selected country changes
    countryChanged(countryCombo: ComboBox) {
        this.customers.where('Country', '==', countryCombo.text);
        this.customers.moveToFirstPage();
    }
}
//
@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

