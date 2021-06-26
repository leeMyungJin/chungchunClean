import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as pdf from '@grapecity/wijmo.pdf';
import '@grapecity/wijmo.pdf.security';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
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
    drawPdf() {
        this.opts.ended = (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf');
        //
        let doc = new pdf.PdfDocument(this.opts);
        //
        doc.drawText('Demo page.');
        //
        doc.end();
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);