import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { RestCollectionViewOData } from './rest-collection-view-odata';
//

// Northwind OData service
const urlOData = 'https://services.odata.org/V4/Northwind/Northwind.svc';

// fields to show on the grid
const fields = 'CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax'.split(',');

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})    
export class AppComponent {
    view = new RestCollectionViewOData(urlOData, 'Customers', {
        fields: fields,
        pageSize: 8,
        sortDescriptions: ['CustomerID']
    });
    //
    // apply auto-numbering cell template
    initGrid(theGrid: any) {
        theGrid.topLeftCells.columns[0].cellTemplate = ($: any) => $.text || ($.row.index + 1).toString()        
    }
}
//
@NgModule({
    imports: [WjGridModule, WjGridFilterModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

