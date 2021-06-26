import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartMapModule } from '@grapecity/wijmo.angular2.chart.map';
import { httpRequest } from "@grapecity/wijmo";
import { Palettes } from "@grapecity/wijmo.chart";
import { FlexMap } from "@grapecity/wijmo.chart.map";
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('map') map: FlexMap;
    //
    dataMap = new Map();
    colors = Palettes.Diverging.RdYlBu;
    binding = (o: any) => this.dataMap.get(o.properties.name);
    scale = (v: number) => 1 - v;
    //    
    ngOnInit() {
        httpRequest('data/temp.json', {
            success: xhr => {
                JSON.parse(xhr.responseText).forEach((el: any) => this.dataMap.set(el.State, parseFloat(el.AverageTemperature)));
            }
        });
    }
    //
    zoomTo(layer: any) {
        this.map.zoomTo(layer.getGeoBBox());
    }
    //
    tooltipContent = (f: any) => f.name + ' ' + this.dataMap.get(f.name) + '°F';
}
//
@NgModule({
    imports: [BrowserModule, WjChartMapModule, WjChartModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
//
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);