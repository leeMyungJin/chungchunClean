import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { isArray, Point } from '@grapecity/wijmo';
import { InputDate } from '@grapecity/wijmo.input';
import { FlexChart, Axis, Palettes } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    palette: any;
    minDate: Date;
    maxDate: Date;
    min: Date;
    max: Date;
    @ViewChild('theMonth', { static: true }) theMonth: InputDate;
    @ViewChild('theChart', { static: true }) theChart: FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.minDate = this.data[this.data.length - 1].date,
        this.maxDate = this.data[0].date;
        this.min = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1);
        this.max = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() + 1, 0);
        this.palette = this.getRandomPalette();
    }
    //
    dateChanged(s: InputDate) {
        // reset the chart zoom
        this.applyZoom(this.theChart, null);
        //
        // apply filter to chart data
        this.theChart.collectionView.filter = (item: any) => {
            if (this.theMonth.value == null) {
                return true; // no filter
            }
            //
            return (item.date.getFullYear() == this.theMonth.value.getFullYear()) &&
                (item.date.getMonth() == this.theMonth.value.getMonth());
        }
    }
    //
    ngAfterViewInit() {
        // zoom with the mouse wheel
        this.theChart.hostElement.addEventListener('wheel', e => {
            if (e.ctrlKey) {
                let center = this.theChart.pointToData(e.clientX, e.clientY);
                this.applyZoom(this.theChart, e.deltaY > 0 ? 1.1 : .9, center);
                e.preventDefault();
            }
        })
    }
    //
    resetFilter() {
        this.theMonth.value = null;
    }
    //
    // apply a zoom factor to the chart (keeping the center constant)
    applyZoom(chart: FlexChart, factor: number, center?: Point) {
        this.applyZoomAxis(chart.axisX, factor, center ? center.x : null);
        this.applyZoomAxis(chart.axisY, factor, center ? center.y : null);
    }
    //
    applyZoomAxis(axis: Axis, factor: number, center: number) {
        if (!factor) { // reset
            axis.min = axis.max = null;
        } else {
            let min = (axis.min != null ? axis.min : axis.actualMin).valueOf(),
                max = (axis.max != null ? axis.max : axis.actualMax).valueOf();
            //
            if (center == null) {
                center = (min + max) / 2;
            }
            //
            axis.min = center - (center - min) * factor;
            axis.max = center + (max - center) * factor;
        }
    }
    //
    getRandomPalette() {
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

