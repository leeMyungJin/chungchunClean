import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { FlexGrid, FormatItemEventArgs } from '@grapecity/wijmo.grid';
import { Tooltip, PopupPosition} from '@grapecity/wijmo';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // data to show on the grid
    data = this._getData();

    // clean up tooltips when loading the rows
    loadingRows() {
        this._hdrTips.dispose();
    }

    // add/update tooltips when rendering the cells
    formatItem(s: FlexGrid, e: FormatItemEventArgs) {
        if (e.panel == s.columnHeaders) {
            this._hdrTips.setTooltip(e.cell,
                'this is column<br/>' +
                '<span class="col-header">' + e.getColumn().header + '</span>');
        }
    }

    // column header tooltips
    private _hdrTips = new Tooltip({ 
        position: PopupPosition.RightTop,
        showAtMouse: true,
        showDelay: 600,
        cssClass: 'hdr-tip'
    });

    // get some dummy data
    private _getCountries() {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }
    private _getData(cnt = 10) {
        let countries = this._getCountries(),
            data = [];
        for (var i = 0; i < cnt; i++) {
            data.push({
                id: i,
                date: new Date(2020, i % 12, (i + 1) % 25),
                active: i % 4 == 0,
                country: countries[i % countries.length],
                sales: Math.random() * 2000,
                expenses: Math.random() * 1000,
            });
        }
        return data;
    }

}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

