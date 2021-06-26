import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import {InputNumber, ComboBox} from '@grapecity/wijmo.input';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Palettes } from '@grapecity/wijmo.chart';
//
import { Component, Inject, enableProdMode, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    palette: any;
    // references control in the view
    @ViewChild('theChart', { static: true }) theChart: FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this._getRandomPalette();
    }
    //
    ngAfterViewInit() {
        this.theChart.options = {
            funnel: {
                neckWidth: 0.2,
                neckHeight: 0.4,
                type: 'default'
            }
        };
    }
    //
    widthChanged(input: InputNumber) {
        this.theChart.options.funnel.neckWidth = input.value;
        this.theChart.refresh();
    }
    //
    heightChanged(input: InputNumber) {
        this.theChart.options.funnel.neckHeight = input.value;
        this.theChart.refresh();
    }
    //
    textChanged(combo: ComboBox) {
        this.theChart.options.funnel.type = combo.text.toLowerCase();
        this.theChart.refresh();
    }
    //
    private _getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, BrowserModule],
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

