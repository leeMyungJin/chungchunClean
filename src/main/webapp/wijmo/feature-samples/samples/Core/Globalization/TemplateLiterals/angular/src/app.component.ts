import 'bootstrap.css';

import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { glbz } from '@grapecity/wijmo';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    result1 = '';
    format1() {
        this.result1 = glbz`Today is‌ ${new Date()}:d, and PI is‌ ${Math.PI}:n4.`;
    }
    result2 = '';
    format2() {
        this.result2 = glbz`Today is ${new Date()}:'dddd, MMMM dd'.`;
    }
}

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

