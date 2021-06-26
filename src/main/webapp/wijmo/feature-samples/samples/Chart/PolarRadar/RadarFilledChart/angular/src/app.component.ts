import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjRadar from '@grapecity/wijmo.chart.radar';
import * as animation from '@grapecity/wijmo.chart.animation';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartRadarModule } from '@grapecity/wijmo.angular2.chart.radar';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('chart', { static: true }) chart: wjRadar.FlexRadar;
    data: any;
    palette: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = wjChart.Palettes.cocoa;
    }
    //
    ngAfterViewInit() {
        let ani = new animation.ChartAnimation(this.chart, {
            animationMode: animation.AnimationMode.Series,
            easing: animation.Easing.Linear,
            duration: 500
        });
        let app = this;
        setTimeout(function () {
            app.chart.itemsSource = app.data;
        }, 200);
    }
}
//\\
@NgModule({
    imports: [WjChartModule, WjChartRadarModule, BrowserModule],
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
