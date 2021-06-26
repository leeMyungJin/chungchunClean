import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { getGroupedData, getLayoutDefinition } from './app.data';


@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = getGroupedData(200);
    layout = getLayoutDefinition();
    multiRowGroupHeaders = true;

    // start collapsed
    initialized(sender: any) {
        sender.collapseGroupsToLevel(1);
    }

    // toggle multiRowGroupHeaders
    cbChecked(e: MouseEvent) {
        this.multiRowGroupHeaders = (e.target as HTMLInputElement).checked;
    }
}

@NgModule({
    imports: [WjGridMultirowModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
