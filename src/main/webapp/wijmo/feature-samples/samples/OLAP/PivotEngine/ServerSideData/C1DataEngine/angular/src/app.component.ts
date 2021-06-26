import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as wjOlap from '@grapecity/wijmo.olap';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    ngCube: wjOlap.PivotEngine;
    //
    constructor() {
        //var svcUrl = 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20173.114/api/dataengine/';
        var svcUrl = 'https://demos.componentone.com/ASPNET/c1webapi/4.5.20193.222/api/dataengine/';

        this.ngCube = new wjOlap.PivotEngine({
            //
            // connect to ComponentOne Data Service
            itemsSource: `${svcUrl}complex10`,
            //
            // build default view
            valueFields: ['Sales', 'Downloads'],
            rowFields: ['Country', 'Product']
        });
    }
}
//
@NgModule({
    imports: [WjOlapModule, BrowserModule],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

