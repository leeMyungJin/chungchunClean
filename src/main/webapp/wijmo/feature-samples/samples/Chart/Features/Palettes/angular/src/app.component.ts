import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import { Color } from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    paletteData: any;
    palette: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.paletteData = dataService.getPaletteData();
    }
    //
    selectedIndexChanged(s: wjInput.ComboBox) {
        this.palette = s.selectedItem.colors;
    }
    //
    formatItem(e: any) {
        let item = e.data;
        if (item.name && item.colors) {
            // create palette swatch
            let html = '<div style="width:100px;display:inline-block">' + item.name + '</div>';
            item.colors.forEach((clr: any) =>
                html += `<div style="width:1em;height:1em;display:inline-block;background-color:${clr};"></div>`);
            e.item.innerHTML = html;
        }
    }
    //
    chartItemFormatter(engine: any, ht: wjChart.HitTestInfo, defaultRenderer: any) {
        const pal = ht.chart.palette ? ht.chart.palette : wjChart.Palettes.standard;
        engine.fill = pal[ht.pointIndex]; // each bar has own color
        engine.stroke = null;
        defaultRenderer();
    }
    //
    pieItemFormatter(engine: any, ht: wjChart.HitTestInfo, defaultRenderer: any) {
        let clr = new Color(engine.fill);
        clr.a = 1; // use opaque color
        engine.fill = clr.toString();
        engine.stroke = null;
        defaultRenderer();
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

