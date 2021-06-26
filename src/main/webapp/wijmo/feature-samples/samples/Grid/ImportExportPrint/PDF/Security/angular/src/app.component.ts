import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import '@grapecity/wijmo.pdf.security';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataService } from './app.data';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    PdfVersionEnum = pdf.PdfVersion;
    PdfPrintPermissionEnum = pdf.PdfPrintPermission;
    //
    opts: pdf.IPdfDocumentOptions = {
        userPassword: undefined,
        ownerPassword: undefined,
        version: pdf.PdfVersion.v1_3,
        permissions: {
            annotating: false,
            contentAccessibility: false,
            copying: false,
            documentAssembly: false,
            fillingForms: false,
            modifying: false,
            printing: pdf.PdfPrintPermission.NotAllowed
        }
    };
    //
    data: any[];
    @ViewChild('flexGrid', { static: true }) flexGrid: grid.FlexGrid;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(10);
    }
    //
    export() {
        window.console.log(this.opts);
        let settings: gridPdf.IFlexGridExportSettings = {
            documentOptions: this.opts,
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        };
        //
        gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', settings);
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