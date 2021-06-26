import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartMapModule } from '@grapecity/wijmo.angular2.chart.map';
import { getGdpData } from './data';
import { Point, Rect } from "@grapecity/wijmo";
import { FlexMap } from "@grapecity/wijmo.chart.map";
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('map') map: FlexMap;

    tooltipContent = (ht: any) => ht.gdp ? '<b>{name}</b> \${gdp}<br>rank {rank}' : '';

    itemsSourceChanged(layer: any) {
        const bb = new Rect(-29, 36, 90, 35);
        this.map.zoomTo(bb);

        let features = layer.getAllFeatures();
        let pts: any[] = [];

        let gdpData = getGdpData();
        let dataMap = new Map();
        gdpData.forEach(el => dataMap.set(el.Country, el));

        features.forEach((f: any) => {
            let rect = layer.map.layers[0].getGeoBBox(f);
            let name = f.properties.name;
            let pt = new Point(rect.left + 0.5 * rect.width, rect.top + 0.5 * rect.height);
            if (name == 'Norway') {
                pt = new Point(10.752222, 59.913889);
            } else if (name == 'Russia') {
                pt = new Point(37.617222, 55.755833);
            }
            let el = dataMap.get(name);
            if (el) {
                pts.push({
                    x: pt.x, y: pt.y, name: name, gdp: parseFloat(el[2020]), rank: parseInt(el['Rank'])
                });
            }
        });
        layer.map.layers[1].itemsSource = pts;
    }
}
//
@NgModule({
    imports: [BrowserModule, WjChartMapModule, WjInputModule, WjChartModule],
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