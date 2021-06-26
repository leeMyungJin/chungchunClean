import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import { CollectionView } from '@grapecity/wijmo';
import { getData, getCountries } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // data
    data = new CollectionView(getData(1000), {
        getError: (item: any, prop: string) => {
            if (prop == 'rating') {
                if (item.rating < 0 || item.rating > 5) {
                    return 'Ratings should be between zero and five.'
                }
            }
            return null; // no errors
        }
    });
    countries = getCountries();

    // templates
    tplRating = CellMaker.makeRating({
        range: [0, 5],
        label: 'Edit Product Rating'
    });
    tplRatingReadOnly = CellMaker.makeRating({
        range: [0, 5],
        label: 'See Product Rating'
    });
}

@NgModule({
  imports: [WjGridModule, FormsModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

