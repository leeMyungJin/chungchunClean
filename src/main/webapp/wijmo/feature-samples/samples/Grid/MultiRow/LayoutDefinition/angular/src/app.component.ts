import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    orders: any;
    layoutDefs: any;
    currentLayout: any;
    //
    constructor(@Inject(DataService) dataService: DataService) {
        let appData = dataService.getData();
        this.orders = appData.orders;
        this.layoutDefs = appData.layoutDefs;
        this.currentLayout = appData.layoutDefs.currentItem;
    }
}
//
@NgModule({
    imports: [
        BrowserModule,
        WjInputModule,
        WjGridMultirowModule
    ],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
