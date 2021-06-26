import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { isArray, format, Rect, Tooltip } from '@grapecity/wijmo';
import { FlexChart, ChartElement, Palettes } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    palette: any;
    @ViewChild('theChart', { static: true }) theChart: FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
    }
    //
    ngAfterViewInit() {
        // use tooltip to show hit-test information
        let tt = new Tooltip(),
        tip = '';
        //
        this.theChart.hostElement.addEventListener('mousemove', e => {
            // build tooltip text
            let ht = this.theChart.hitTest(e),
                elem = ht.chartElement,
                series = (ht.series && [1, 2, 3].indexOf(elem) < 0) ? ht.series : null,
                index = (ht.pointIndex != null && series) ? ht.pointIndex : null,
                newTip = format('chartElement: <b>{elem}</b><br/>series: <b>{series}</b><br/>pointIndex: <b>{index}</b>', {
                    elem: ChartElement[elem],
                    series: series ? series.name : 'none',
                    index: index != null ? index : 'none'
                });
            //
            // update tooltip
            if (newTip != tip) {
                tip = newTip;
                tt.show(e.target, tip, new Rect(e.clientX, e.clientY, 0, 0));
            }
        });
        //
        this.theChart.hostElement.addEventListener('mouseleave', e => {
            tt.hide();
            tip = '';
        });
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
    imports: [WjChartModule, BrowserModule],
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

