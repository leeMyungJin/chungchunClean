import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    ngPanel: wjOlap.PivotEngine;
    field: wjOlap.PivotField;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.ngPanel = new wjOlap.PivotEngine({
            itemsSource: dataService.getData(), // raw data
            valueFields: ['Amount'], // summarize amounts
            rowFields: ['Buyer', 'Type'] // summarize amounts
        });
        this.field = this.ngPanel.fields.getField('Amount');
        this.field.format = 'c0';
    }
    //
    onEditClick() {
        this.ngPanel.editField(this.field);
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

