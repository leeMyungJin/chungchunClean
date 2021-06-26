import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridGrouppanelModule } from '@grapecity/wijmo.angular2.grid.grouppanel';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CollectionView, GroupDescription, SortDescription } from '@grapecity/wijmo';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('panel') panel: any;
    @ViewChild('grid') grid: any;
    @ViewChild('menu') menu: any;
    data = new CollectionView(this._getData(), {
        groupDescriptions: ['country', 'product']
    });
    groupIndex = -1;

    // show context menu
    contextMenu(e: any) {
        let groupDescription = this.panel.hitTest(e),
            cv = this.panel.collectionView;
        if (groupDescription) {
            this.groupIndex = cv.groupDescriptions.indexOf(groupDescription);
            this.menu.show(e);
        }
        e.preventDefault();
    }

    // handle context menu commands
    itemClicked(menu: any) {
        let grid = this.grid,
            cv = grid.collectionView,
            groupIndex = this.groupIndex;
        switch (menu.selectedIndex) {
            case 0: // expand all
                grid.collapseGroupsToLevel(groupIndex + 1);
                break;
            case 1: // collapse all
                grid.collapseGroupsToLevel(groupIndex);
                break;
        
            case 3: // sort asc
            case 4: // sort desc
            case 5: // no sort
                cv.deferUpdate(() => {
                    cv.sortDescriptions.clear();
                    if (menu.selectedIndex != 5) {
                        let binding = cv.groupDescriptions[groupIndex].propertyName;
                        cv.sortDescriptions.push(new SortDescription(binding, menu.selectedIndex == 3));
                    }
                });
                break;
        
            case 7: // remove group
                cv.groupDescriptions.removeAt(groupIndex);
                break;
        }
    }

    // create some random data
    private _getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            products = 'Phones,Computers,Cameras,Stereos'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                downloads: Math.round(100 + Math.random() * 10000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}

@NgModule({
    imports: [WjGridModule, WjGridGrouppanelModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

