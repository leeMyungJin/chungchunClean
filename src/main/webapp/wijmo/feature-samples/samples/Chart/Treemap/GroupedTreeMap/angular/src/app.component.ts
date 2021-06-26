import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartHierarchicalModule } from '@grapecity/wijmo.angular2.chart.hierarchical';
import { DataService } from './app.data';
import { isArray, CollectionView } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: CollectionView;
    bindingName: string[];
    palette: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.bindingName = ['category', 'subCategory'];
        this.palette = this.getRandomPalette();
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [WjChartHierarchicalModule, BrowserModule],
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

