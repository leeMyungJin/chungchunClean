import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { CollectionView, PropertyGroupDescription} from '@grapecity/wijmo';
import { FlexGrid, HeadersVisibility } from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { getData } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view = new CollectionView(getData(30));
    grouped = true;
    headers = true;
    selectedItems: any[] = [];
    selector: Selector = null;

    initGrid(grid: FlexGrid) {
        this.setGroups(true);
        this.selector = new Selector(grid, {
            itemChecked: () => {
                this.selectedItems = grid.rows.filter(r => r.isSelected);
            }
        });
    }
    setGroups(groupsOn: boolean) {
        let groups = this.view.groupDescriptions;
        groups.clear();
        if (groupsOn) {
            groups.push(
                new PropertyGroupDescription('country'),
                new PropertyGroupDescription('product')
            );
        }
        this.grouped = groupsOn;
    }
    setHeaders(headersOn: boolean) {
        let theGrid = this.selector.column.grid;
        theGrid.headersVisibility = headersOn
            ? HeadersVisibility.All
            : HeadersVisibility.Column;
        this.selector.column = headersOn
            ? theGrid.rowHeaders.columns[0]
            : theGrid.columns[0];
        this.headers = headersOn;
    }
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

