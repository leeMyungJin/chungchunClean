import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';

import { UndoStack } from '@grapecity/wijmo.undo';
import { FlexGrid, CellRangeEventArgs } from '@grapecity/wijmo.grid';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    undoStack: UndoStack;
    grid: FlexGrid;
    data = this.getData();
    colors =this.getColors();
    countries = this.getCountries();
    names = this.getNames();
    canUndo = false;
    canRedo = false;
    actionCount = 0;

    // enable undo/redo for the form
    // use ngAfterViewInit to ensure all controls
    // have been initalized (ngOnInit is too soon)
    ngAfterViewInit() {
        this.undoStack = new UndoStack('#undoable-form', {
            maxActions: 50,
            stateChanged: (s: UndoStack) => {
                this.canUndo = s.canUndo;
                this.canRedo = s.canRedo;
                this.actionCount = s.actionCount;
            }
        });
    }

    // initialize the grid
    initGrid(s: FlexGrid) {

        // save reference to the grid
        this.grid = s;

        // add data maps to some columns
        let col = s.getColumn('name');
        col.dataMap = this.names as any;
        col.dataMap.isEditable = true;
        col = s.getColumn('country');
        col.dataMap = this.countries as any;
    }

    // add a row in code, calling "onRowAdded" to enable undo for this action
    addRow(e: MouseEvent) {
        let g = this.grid,
            view = g.editableCollectionView,
            newItem = view.addNew();
        g.focus();
        newItem.id = -1;
        newItem.name = 'new item';
        newItem.active = true;
        g.onRowAdded(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
        view.commitNew();
        e.preventDefault(); // don't submit the form
    }

    // delete a row in code, calling "onDeletingRow" to enable undo for this action
    deleteRow(e: MouseEvent) {
        let g = this.grid,
            view = g.editableCollectionView;
        g.focus();
        if (view.items.length) {
            let sel = g.selection;
            if (sel.row > -1) {
                let item = g.rows[sel.row].dataItem;
                g.onDeletingRow(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
                view.remove(item);
            }
        }
        e.preventDefault(); // don't submit the form
    }

    // provide some data for the sample
    getColors() {
        return 'Black,Blue,Brown,Green,Magenta,Orange,Pink,Purple,Red,Teal,Violet,White,Yellow'.split(',');
    }
    getCountries() {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }
    getNames() {
        return 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(',');
    }
    getData() {
        let countries = this.getCountries(),
            names = this.getNames(),
            data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i,
                name: names[i % names.length],
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.round(Math.random() * 20000),
            });
        }
        return data;
    }
}

@NgModule({
    imports: [WjInputModule, WjGridModule, WjGaugeModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();

// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

