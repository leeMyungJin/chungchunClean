import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, AfterViewInit, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { isArray } from '@grapecity/wijmo';
import { ComboBox } from '@grapecity/wijmo.input';
import { FlexChart, DataLabelRenderEventArgs, Palettes } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    comboData: any[];
    palette: any;
    downloadsOnly: boolean;
    @ViewChild('theChart', { static: true }) theChart: FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.comboData = dataService.getComboData();
        this.palette = this.getRandomPalette();
        this.downloadsOnly = false;
    }
    //
    ngAfterViewInit() {
        this.theChart.dataLabel.rendering.addHandler(function(_: any, e: DataLabelRenderEventArgs) {
            if (this.downloadsOnly && e.hitTestInfo.series.binding != '2016') {
                e.cancel = true; // labels only for the "downloads" series
            }
        }, this);
    }
    //
    textChanged(s: ComboBox) {
        this.theChart.dataLabel.position = <any>s.text;
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
    //
    lbClick(cb: HTMLInputElement) {
        let dl = this.theChart.dataLabel;
        dl.connectingLine = dl.border = cb.checked;
    }
    //
    doClick(cb: HTMLInputElement) {
        this.theChart.invalidate();
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, FormsModule, BrowserModule],
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

