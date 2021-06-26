import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.columnFooters.rows.push(new wjcGrid.GroupRow());
        flex.bottomLeftCells.setCellData(0, 0, 'Σ');
    }

    private _getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            products = 'Phones,Computers,Cameras,Stereos'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

