import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import * as wjChart from '@grapecity/wijmo.chart';
import { DataService } from './app.data';
import { WebGLRenderEngine } from '@grapecity/wijmo.chart.webgl';
//
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _numberOfPoints: number = 100000;
    private _numberOfSeries: number = 1;
    private _seriesSymbol: string = 'Dot';
    symbolSize: number = 3;
    useWebGL: boolean = true;
    data: any[] = [];
    //
    private _chart: wjChart.FlexChart;
    private _webglEng = new WebGLRenderEngine();
    private _svgEng = new wjChart.SvgRenderEngine();
    //
    constructor(@Inject(DataService) private dataService: DataService) {}
    //
    get numberOfPoints(): number {
        return this._numberOfPoints;
    }
    set numberOfPoints(value: number) {
        this._numberOfPoints = value;
        this.updateData();
    }
    //
    get numberOfSeries(): number {
        return this._numberOfSeries;
    }
    set numberOfSeries(value: number) {
        this._numberOfSeries = value;
        this.updateData();
    }
    //
    get seriesSymbol(): string {
        return this._seriesSymbol;
    }
    set seriesSymbol(value: string) {
        this._seriesSymbol = value;
    }
    //
    get renderEngine(): wjChart.IRenderEngine {
        return this.useWebGL ? this._webglEng : this._svgEng;
    }
    //
    chartInitialized(chart: wjChart.FlexChart) {
        this._chart = chart;
        this.updateData();
    }
    //
    updateData() {
        if (this._chart) {
            const data = [];
            const nser = this.numberOfSeries;
            const npts = this.numberOfPoints;
            for (let i = 0; i < nser; i++) {
                data.push(this.dataService.getData(Math.random() - 0.5, Math.random() - 0.5, npts / nser, 0.5 * (1 - i / nser)));
            }
            this.data = data;
        }
    }
}
//
@NgModule({
    imports: [BrowserModule, FormsModule, WjInputModule, WjChartModule, WjChartInteractionModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [DataService],
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

