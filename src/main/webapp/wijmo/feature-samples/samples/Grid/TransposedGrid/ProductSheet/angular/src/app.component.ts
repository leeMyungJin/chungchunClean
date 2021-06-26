import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridTransposedModule } from '@grapecity/wijmo.angular2.grid.transposed';
import { ObservableArray } from '@grapecity/wijmo';
import { getData, getDataColumns } from './data';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data = new ObservableArray(getData());
    columns = getDataColumns();

    // customize transposed product grid row/column sizes
    loadedRows(s: any) {
        s.columns.defaultSize = 200;
        setTimeout(() => {
            s.autoSizeColumn(0, true, 10); // auto-size row headers
            s.autoSizeRows(); // auto-size data rows
            s.rows[0].height = 180; // make product images large
        });
    }

    // customize cells to show product images and star rating
    formatItem(s: any, e: any) {
        if (e.panel == s.cells) {

            // get binding from row if possible, then from column
            let binding = s.rows[e.row].binding || s.columns[e.col].binding;
            switch (binding) {

                // product image
                case 'img':
                    e.cell.innerHTML = '<img src="{img}" draggable="false"/>'.replace('{img}', e.cell.textContent);
                    break;

                // stars for rating
                case 'rating':
                    let rating = s.getCellData(e.row, e.col, false),
                        html = new Array(Math.floor(rating) + 1).join('&#x2605;');
                    if (rating > Math.floor(rating)) {
                        html += '&#9734;'; // white star (half star doesn't work...)
                    }
                    e.cell.innerHTML = '<span class="rating">' + html + '</span>';
                    break;
            }
        }
    }
}

@NgModule({
    imports: [WjGridModule, WjGridTransposedModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

