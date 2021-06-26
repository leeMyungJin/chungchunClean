import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { Clipboard } from '@grapecity/wijmo';
import { getData } from './app.data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = getData();
    includeHeaders = true;
    hasHeaders = false;

    // copying with or without headers
    copying(s: any, e: any) {
        this.hasHeaders = this.includeHeaders;
        if (this.hasHeaders) {

            // copy text with headers and copyright notice to clipboard
            let text = s.getClipString(null, false, true, false);
            text = text + '\r\n(c) 2019 Grapecity Inc';

            // put text with headers on the clipboard
            Clipboard.copy(text);

            // prevent the grid from overwriting our clipboard content
            e.cancel = true;
        }
    }

    // prevent pasting content with headers...
    pasting(s: any, e: any) {
        if (this.hasHeaders) {
            e.cancel = true;
        }
    }
}

@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

