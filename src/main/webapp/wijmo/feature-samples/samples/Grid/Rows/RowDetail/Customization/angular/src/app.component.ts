import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ODataCollectionView } from '@grapecity/wijmo.odata';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridDetailModule } from '@grapecity/wijmo.angular2.grid.detail';


const url = 'https://services.odata.org/Northwind/Northwind.svc';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    categories: ODataCollectionView;
    products: ODataCollectionView;
    private _catToProductMap: Map<string, any> = new Map();

    constructor() {
        this.categories = new ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description']
        });
        this.products = new ODataCollectionView(url, 'Products');
    }

    getProducts(categoryID: string): any[] {
        let categoryProducts = this._catToProductMap.get(categoryID);
        if (!categoryProducts) {
            categoryProducts = this.products.items.filter(product => product.CategoryID === categoryID);
            this._catToProductMap.set(categoryID, categoryProducts);
        }
        return categoryProducts;
    }

    readonly rowHasDetailFn = (row: any) => !(row.dataItem.CategoryID % 2);
}

@NgModule({
    imports: [WjGridModule, WjGridDetailModule, BrowserModule,],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
