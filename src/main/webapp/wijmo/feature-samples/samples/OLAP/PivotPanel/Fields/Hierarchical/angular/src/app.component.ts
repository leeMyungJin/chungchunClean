import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { getData } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    ng: wjOlap.PivotEngine;

    constructor() {
        this.ng = new wjOlap.PivotEngine({
            autoGenerateFields: false,
            fields: [
                {
                    header: 'Dimensions', subFields: [
                        { header: 'Buyer', binding: 'buyer' },
                        { header: 'Type', binding: 'type' },
                        {
                            header: 'Date', subFields: [
                                { header: 'Year', binding: 'date', format: 'yyyy' },
                                { header: 'Quarter', binding: 'date', format: '"Q"Q' },
                                { header: 'Month', binding: 'date', format: 'MMM' },
                            ]
                        }
                    ]
                },
                {
                    header: 'Measures', subFields: [
                        { header: 'Amount', binding: 'amount', format: 'c0' }
                    ]
                }
            ],
            valueFields: ['Amount'], // summarize amounts
            rowFields: ['Year', 'Quarter'], // by year and quarter
            columnFields: ['Buyer'], // and by buyer
            showRowTotals: 'Subtotals',
            itemsSource: getData(), // raw data
        });
    }
}

@NgModule({
    imports: [WjOlapModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

