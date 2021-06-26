import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataType } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.input';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];

    constructor() {
        this.data = this._getData();
    }

    startEditing(flex: FlexGrid) {
        let index = flex.selection.col,
            col = index > -1 ? flex.columns[index] : null;
        if (col && !col.isReadOnly && col.dataType != DataType.Boolean) {
            setTimeout(() => {
                flex.startEditing(false); // quick mode
            }, 50); // let the grid update first
        }
    }

    // create some random data
    private _getData() {
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}

@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

