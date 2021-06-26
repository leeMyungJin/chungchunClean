import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, ViewChild, enableProdMode, NgModule, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { isArray, isNumber, showPopup, hidePopup, toHeaderCase } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.input';
import { FlexChart, Palettes, Series, SeriesVisibility } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    palette: any;
    @ViewChild('theChart', { static: true }) theChart: FlexChart;
    @ViewChild('theSeriesPicker', { static: true }) theSeriesPicker: ListBox;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
    }
    //
    ngAfterViewInit() {
        // auto-generate series
        let item = this.data[0];
        for (let k in item) {
            if (isNumber(item[k])) {
                let series = new Series();
                series.binding = k;
                series.name = toHeaderCase(k);
                series['visible'] = true; // add 'visible' property for binding
                this.theChart.series.push(series);
            }
        }
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
    //
    pickerClick(e: Event) {
        showPopup(this.theSeriesPicker.hostElement, e.target, false, true, false);
        this.theSeriesPicker.focus();
        e.preventDefault();
    }
    //
    lostFocus() {
        hidePopup(this.theSeriesPicker.hostElement);
    }
    //
    checkedItemsChanged(s: ListBox) {
        // map extra 'visible' property to 'Series.visibility' values
        this.theChart.series.forEach((series: Series) => {
            series.visibility = s.checkedItems.indexOf(series) > -1
                ? SeriesVisibility.Visible
                : SeriesVisibility.Hidden;
        });
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

