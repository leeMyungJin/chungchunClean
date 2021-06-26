import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('pieChart', { static: true }) pieChart: chart.FlexPie;
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    private _chartsPerLine = 0;
    get chartsPerLine() {
        return this._chartsPerLine;
    }
    set chartsPerLine(value: number) {
        if (this._chartsPerLine !== value) {
            this._chartsPerLine = value;
            this.pieChart.dataLabel.position = value == 1 ? chart.PieLabelPosition.None : chart.PieLabelPosition.Inside;
        }
    }
}
//
@NgModule({
    imports: [WjChartModule, WjInputModule, BrowserModule],
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