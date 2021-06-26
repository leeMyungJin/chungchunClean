import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    positionData: string[]
    header: string;
    footer: string;
    xTitle: string;
    yTitle: string;
    palette: any;
    customTitles: boolean;
    customLegend: boolean;
    legendPosition: string;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.positionData = dataService.getComboData();
        this.header = "My Great Chart";
        this.footer = "powered by Wijmo's FlexChart";
        this.xTitle = "country";
        this.yTitle = "values/units";
        this.customTitles = true;
        this.customLegend = true;
        this.legendPosition = 'Left';
        this.palette = this.getRandomPalette();
        /**
         * 
    xTitle.text = 'country';
    yTitle.text = 'values/units';
         */
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }

    customClass() {
        let cls = '';
        if(this.customTitles) {
            cls += 'custom-titles ';
        }
        if(this.customLegend) {
            cls += 'custom-legend';
        }
        return cls;
    }
}
//
@NgModule({
    imports: [FormsModule, WjInputModule, WjChartModule, BrowserModule],
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

