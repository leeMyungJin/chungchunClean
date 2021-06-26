import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjcCore from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    musicians: any[];
    palettes = new wjcCore.CollectionView(DataService.getPalettes());
    thePalette = 'Standard';

    constructor() {
        const musicianNames = DataService.getMusicians();
        this.musicians = [];
        for (let i = 0; i < musicianNames.length; i++) {
            let item = {
                id: i,
                name: musicianNames[i],
                photo: '|Paul|John|George|Ringo|'
                    .indexOf('|' + musicianNames[i] + '|') >= 0
                    ? 'resources/' + musicianNames[i] + '.png'
                    : null
            };
            this.musicians.push(item);
        }
    }

    // handle menu clicks: this method gets invoked when the menu's itemClicked event fires
    menuItemClicked(menu: input.Menu) {
        alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

