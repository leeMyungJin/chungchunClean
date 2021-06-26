import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WjCoreModule } from '@grapecity/wijmo.angular2.core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { InheritedGridComponent } from './inherited-grid.component';
import { AggregatedGridComponent } from './aggregated-grid.component';
import { AggregatedGridColumnComponent } from './aggregated-grid-column.component';
import { EditableDateComponent } from './cell-templates/editable-date.component';
import { EditableSelectionComponent } from './cell-templates/editable-selection.component';
import { EditableStringComponent } from './cell-templates/editable-string.component';

const components = [
    InheritedGridComponent,
    AggregatedGridComponent,
    AggregatedGridColumnComponent,
    EditableDateComponent,
    EditableSelectionComponent,
    EditableStringComponent
];

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        FormsModule,
        WjCoreModule,
        WjInputModule,
        WjGridModule
    ],
    entryComponents: [
        EditableDateComponent,
        EditableSelectionComponent,
        EditableStringComponent
    ],
    exports: [...components],
})
export class CustomComponentsModule {
}
