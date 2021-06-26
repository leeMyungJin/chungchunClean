import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { CollectionView } from '@grapecity/wijmo';

import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { DataService, TDataItem } from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view: CollectionView;
    filterText: string;

    constructor(@Inject(DataService) private dataService: DataService) {
        this.view = new CollectionView(dataService.getData());

        // country filter
        this.view.filters.push((item: TDataItem) => {
            return this.filterText
                ? item.country.toLowerCase().indexOf(this.filterText) > -1
                : true;
        })
    }

    // update country filter
    updateFilter(value: string) {
        this.filterText = value;
        this.view.refresh();
    }
}

@NgModule({
    imports: [WjGridModule, WjGridFilterModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

