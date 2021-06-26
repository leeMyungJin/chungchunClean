import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridSearchModule } from '@grapecity/wijmo.angular2.grid.search';
import { CollectionView } from '@grapecity/wijmo';
import { getData } from './data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: CollectionView;
    itemCount: number;

    constructor() {
        this.data = new CollectionView(getData(), {
            collectionChanged: (s: CollectionView) => {
                this.itemCount = s.totalItemCount;
            }
        });
        this.itemCount = this.data.totalItemCount;
    }
}

@NgModule({
  imports: [
    WjGridModule,
    WjGridFilterModule,
    WjGridSearchModule,    
    BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

