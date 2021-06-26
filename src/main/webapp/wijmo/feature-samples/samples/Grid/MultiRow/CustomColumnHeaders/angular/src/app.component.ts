import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { getData, getLayoutDefinition, getHeaderLayoutDefinition } from './app.data';


@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = getData();
    layout = getLayoutDefinition();
    headerLayout = getHeaderLayoutDefinition();

    // toggle multiRowGroupHeaders
    cbChecked(e: MouseEvent) {
        this.headerLayout = (e.target as HTMLInputElement).checked
            ? getHeaderLayoutDefinition()
            : null;
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
