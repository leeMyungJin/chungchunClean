import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { toggleClass } from '@grapecity/wijmo';
import { getData } from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = getData();

    formatItem(s: FlexGrid, e: FormatItemEventArgs) {
        if (e.panel == s.cells) {
            let spill = e.col < s.columns.length - 1 &&
                e.cell.innerHTML && !s.getCellData(e.row, e.col + 1, false);
            toggleClass(e.cell, 'spill', spill);
        }
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
