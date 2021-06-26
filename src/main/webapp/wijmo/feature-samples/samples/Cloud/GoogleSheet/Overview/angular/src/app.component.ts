import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//
import { GoogleSheet, Sheet } from  '@grapecity/wijmo.cloud';
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
    categories: Sheet;
    products: Sheet;
    supplierMap: DataMap;

    constructor() {

        // create the GoogleSheet data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
        let gs = new GoogleSheet(SHEET_ID_NW, API_KEY, {
            sheets: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose categories and products
        this.categories = gs.getSheet('Categories');
        this.products = gs.getSheet('Products');

        // expose supplier DataMap
        let suppliers = gs.getSheet('Suppliers');
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

