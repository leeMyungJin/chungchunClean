import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('theGrid', { static: true }) theGrid: wjGrid.FlexGrid;
    data: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    ngAfterViewInit() {
        this.theGrid.rows.defaultSize = 45;
        this.theGrid.columnHeaders.rows.defaultSize = 65;
        this.theGrid.allowResizing = wjGrid.AllowResizing.Both;
        this.theGrid.deferResizing = true;
    }
}
//\\
@NgModule({
    imports: [WjGridModule, BrowserModule],
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
