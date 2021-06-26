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
    tplSimpleLink = CellMaker.makeLink({
        click: (e, ctx) => alert('Clicked Link ** ' + ctx.item.country + ' **')
    });
    tplRealLink = CellMaker.makeLink({
        text: 'Visit <b>${item.country}</b>',
        href: '${item.url}',
        attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
            tabIndex: -1
        }
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

