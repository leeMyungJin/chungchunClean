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
import { DataMap } from  '@grapecity/wijmo.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    categories: Collection;
    products: Collection;
    supplierMap: DataMap;

    constructor() {

        // create the Firestore data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const PROJECT_ID = 'test-9c0be';
        let fireStore = new Firestore(PROJECT_ID, API_KEY, {
            collections: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose categories and products
        this.categories = fireStore.getCollection('Categories');
        this.products = fireStore.getCollection('Products');

        // expose supplier DataMap
        let suppliers = fireStore.getCollection('Suppliers');
        this.supplierMap = new DataMap(suppliers, 'SupplierID', 'CompanyName');
    }

    // update product filter when selected category changes
    categoryChanged(categoryCombo: ComboBox) {
        let cat = categoryCombo.selectedItem;
        this.products.filter = item => {
            return cat == null || cat.CategoryID == item.CategoryID;
        };
    }
}
//
@NgModule({
    imports: [WjInputModule, WjGridModule, WjChartModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

