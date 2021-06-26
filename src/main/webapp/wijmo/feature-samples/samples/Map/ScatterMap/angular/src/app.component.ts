import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartMapModule } from '@grapecity/wijmo.angular2.chart.map';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    zoomTo(layer:any) {
        layer.map.zoomTo(layer.getGeoBBox());
    }
}

@NgModule({
    imports: [BrowserModule, WjChartMapModule, WjChartModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);