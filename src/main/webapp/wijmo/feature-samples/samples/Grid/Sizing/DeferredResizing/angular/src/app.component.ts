import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('theGrid', { static: true }) theGrid: wjGrid.FlexGrid;
    data: any;
    deferResizing = true;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
}
//\\
@NgModule({
    imports: [FormsModule, WjGridModule, BrowserModule],
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
