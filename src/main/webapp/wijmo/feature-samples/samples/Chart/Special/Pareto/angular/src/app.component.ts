import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService, TDataItem } from './app.data';
import { isArray, CollectionView } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: CollectionView;
    palette: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this._getRandomPalette();
    }
    //
    updateData() {
        let view = this.data;
        //
        view.deferUpdate(() => {
            view.items.forEach((item: TDataItem) => {
                item.sales += (Math.random() - .5) * .5 * item.sales;
            });
        });
    }
    //
    private _getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [FormsModule, WjChartModule, BrowserModule],
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

