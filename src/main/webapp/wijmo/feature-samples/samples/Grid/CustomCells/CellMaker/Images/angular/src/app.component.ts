import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import { getData, getCountries } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {

    // data
    data = getData(1000);
    countries = getCountries();

    // templates
    tplImage = CellMaker.makeImage({
        label: 'image for ${item.country}',
        click: (e, ctx) => alert('Clicked image for ' + ctx.item.country)
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

