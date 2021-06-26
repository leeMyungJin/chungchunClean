import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import '@grapecity/wijmo.touch';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridTransposedModule } from '@grapecity/wijmo.angular2.grid.transposed';
import { getRowGroups, getDeeperRowGroups, getData } from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    rowGroups1 = getRowGroups();
    rowGroups2 = getDeeperRowGroups();
    animated = true;
    data = getData();
    rowGroups = this.rowGroups1;
}

@NgModule({
    imports: [WjGridModule, WjGridTransposedModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

