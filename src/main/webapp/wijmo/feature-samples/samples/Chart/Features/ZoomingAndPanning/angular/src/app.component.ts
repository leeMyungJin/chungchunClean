import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { DataService } from './app.data';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartInteraction from '@grapecity/wijmo.chart.interaction';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    mouseAction: string;
    interactiveAxes: string;
    resetDisabled: boolean;
    isTouch: boolean;
    @ViewChild('theChart', { static: true }) theChart: wjChart.FlexChart;
    @ViewChild('chartGestures', { static: true }) chartGestures: wjChartInteraction.ChartGestures;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.mouseAction = 'Zoom';
        this.interactiveAxes = 'XY';
        this.isTouch = navigator.userAgent.match(/iPad/i) != null || /Android/i.test(navigator.userAgent);
        setTimeout(() => {
            this.chartGestures.posX = 0.5;
            this.chartGestures.posY = 0.5;
            this.chartGestures.scaleX = 0.5;
            this.chartGestures.scaleY = 0.5;
        }, 100);
    }
    //
    ngAfterViewInit() {
        this._disableBtn(200);
    }
    //
    resetAxes() {
        if (this.chartGestures) {
            this.chartGestures.reset();
        }
        this._disableBtn();
    }
    //
    rangeChanged() {
        this.resetDisabled = false;
    }
    //
    private _disableBtn(time?: number) {
        window.setTimeout(() => {
            this.resetDisabled = true;
        }, time || 20);
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartInteractionModule, BrowserModule],
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

