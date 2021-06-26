import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import '@grapecity/wijmo.chart.render';
import * as grid from '@grapecity/wijmo.grid';
import * as gridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    @ViewChild('flexGrid', { static: true }) flexGrid: grid.FlexGrid;
    @ViewChild('progressBar', { static: true }) progressBar: gauge.LinearGauge;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(5000);
    }
    //
    export() {
        gridXlsx.FlexGridXlsxConverter.saveAsync(this.flexGrid, {}, 
            'FlexGrid.xlsx', null, null, 
            progress => this.progressBar.value = progress,
            true);
    }
    //
    cancel() {
        gridXlsx.FlexGridXlsxConverter.cancelAsync(() => this.progressBar.value = 0);
    }
}
//
@NgModule({
    imports: [WjGridModule, WjGaugeModule, BrowserModule],
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