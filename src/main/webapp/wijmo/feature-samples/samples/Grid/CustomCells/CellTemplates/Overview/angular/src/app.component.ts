import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    countries: string[];
    data: wjcCore.CollectionView;
    customTopLeft = true;
    customRowHeader = true;
    customRowHeaderEdit = true;
    customCell = true;
    customCellEdit = true;
    customColumnHeader = true;
    customGroupHeader = true;
    customGroup = true;
    customColumnFooter = true;
    customBottomLeft = true;
    highlightDownloads = true;
    //
    @ViewChild('grid', { static: true }) grid: wjcGrid.FlexGrid;
    //
    constructor( @Inject(DataService) dataSvc: DataService) {
        this.countries = dataSvc.getCountries();
        this.data = dataSvc.getCv(dataSvc.getData());

    }
    //
    ngAfterViewInit() {
        if (this.grid) {
            this.grid.columnFooters.rows.push(new wjcGrid.GroupRow());
        }
    }
}
//
@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
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

