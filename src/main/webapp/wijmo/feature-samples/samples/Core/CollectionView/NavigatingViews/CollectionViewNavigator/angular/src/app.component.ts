import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { CollectionView } from '@grapecity/wijmo';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view = new CollectionView(this.getData(), {
        pageSize: 5
    });
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            names = 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(','),
            data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i,
                name: names[i % names.length],
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.round(Math.random() * 20000),
            });
        }
        return data;
    }
}

@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

