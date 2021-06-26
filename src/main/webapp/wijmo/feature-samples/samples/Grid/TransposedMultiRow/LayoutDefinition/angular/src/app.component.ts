import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { WjGridTransposedmultirowModule } from '@grapecity/wijmo.angular2.grid.transposedmultirow';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { TransposedMultiRow } from '@grapecity/wijmo.grid.transposedmultirow';
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
    @ViewChild('trnMultirow', { static: true }) trnMultirow: TransposedMultiRow;
    //
    constructor(@Inject(DataService) dataService: DataService) {
        let appData = dataService.getData();
        this.orders = appData.orders;
        this.layoutDefs = appData.layoutDefs;
        this.currentLayout = appData.layoutDefs.currentItem;
    }

    exportToExcel() {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.trnMultirow, { 
            includeRowHeaders: true 
        }, 'FlexGrid.xlsx');
    }

    exportToPdf() {
        wjGridPdf.FlexGridPdfConverter.export(this.trnMultirow, 'FlexGrid.pdf', {
            documentOptions: {
                pageSettings: {
                    layout: wjPdf.PdfPageOrientation.Landscape
                }
            },
            scaleMode: wjGridPdf.ScaleMode.ActualSize
        });
    }
}
//
@NgModule({
    imports: [
        BrowserModule,
        WjInputModule,
        WjGridMultirowModule,
        WjGridTransposedmultirowModule,
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
