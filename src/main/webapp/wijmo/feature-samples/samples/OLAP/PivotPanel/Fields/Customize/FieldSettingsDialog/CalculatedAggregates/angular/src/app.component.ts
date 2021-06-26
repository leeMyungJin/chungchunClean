import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { PivotEngine } from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    ng: PivotEngine;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.ng = new PivotEngine({
            autoGenerateFields: false,
            itemsSource: dataService.getData(10000),
            showColumnTotals: 'GrandTotals',
            showRowTotals: 'Subtotals',
            fields: [
                { binding: 'product', header: 'Product' },
                { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                {
                    header: 'Range',
                    dataType: 'String',
                    aggregate: 'Cnt',

                    // use getValue to calculate the sales range (High, Medium, or Low)
                    getValue: (item: TDataItem) => {
                        let sales = item.sales;
                        return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
                    }
                },
                { binding: 'sales', header: 'Sales', format: 'n0' },
                { binding: 'downloads', header: 'Downloads', format: 'n0' },
                {
                    header: 'Conversion',
                    dataType: 'Number',
                    format: 'p0',
    
                    // getAggregateValue computes an aggregate from a summary row (Sales/Downloads)
                    getAggregateValue: (row: any) => row.Downloads ? row.Sales / row.Downloads : 0
                }
            ],
            rowFields: ['Date', 'Range'],
            valueFields: ['Sales', 'Downloads', 'Conversion']
        });
    }
}
//
@NgModule({
    imports: [WjOlapModule, BrowserModule],
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