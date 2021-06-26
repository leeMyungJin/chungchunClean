import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import '@grapecity/wijmo.chart.render';
import * as grid from '@grapecity/wijmo.grid';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import * as gauge from '@grapecity/wijmo.gauge';
//
import { Component, Inject, enableProdMode, NgModule, OnDestroy, ViewChild } from '@angular/core';
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
export class AppComponent implements OnDestroy {
    data: any[];
    @ViewChild('flexGrid', { static: true }) flexGrid: grid.FlexGrid;
    @ViewChild('progressBar', { static: true }) progressBar: gauge.LinearGauge;
    private _worker: Worker;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(3000);
    }
    //
    export() {
        this.cancel();
        //
        this._worker = this.loadWorker('./export-grid', () => {
            gridPdf.PdfWebWorkerClient.exportGrid(this._worker, this.flexGrid, 'FlexGrid.pdf',
                {
                    scaleMode: gridPdf.ScaleMode.PageWidth,
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
                },
                null,
                progress => this.progressBar.value = progress * 100
            );
        });
    }
    //
    cancel() {
        if (this._worker) {
            this._worker.terminate();
        }
        this.progressBar.value = 0;
    }
    //
    // Creates a web worker that executes a module from the specified URL.
    private loadWorker(url: string, ready: () => void) {
        let worker = new Worker('src/workers/worker-loader.js');
        //
        worker.addEventListener('message', (e) => {
            if (e.data === '#ready#') {
                ready();
            }
        });
        //
        worker.postMessage({ url: url });
        //
        return worker;
    }
    //
    ngOnDestroy() {
        if (this._worker) {
            this._worker.terminate();
        }
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