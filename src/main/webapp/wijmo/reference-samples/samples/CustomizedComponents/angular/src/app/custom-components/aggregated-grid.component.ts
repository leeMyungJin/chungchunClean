import { Component, Input, ContentChildren, QueryList, forwardRef, ViewChild } from '@angular/core';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcCore from '@grapecity/wijmo';

import { SelectionTypeEnum } from './cell-templates/selection-type.enum';
import { AggregatedGridColumnComponent } from './aggregated-grid-column.component';

// Represents the custom grid component implemented by means of aggregating the WjFlexGrid component.
@Component({
    selector: 'aggregated-grid',
    templateUrl: './aggregated-grid.component.html'
})
export class AggregatedGridComponent {
    private _isEditable = true;
    // grid data source
    @Input() itemsSource: any;
    // A type of selection provided by the Select column.
    @Input() selectionType = SelectionTypeEnum.Single;
    // References aggregated FlexGrid instance
    @ViewChild('flex') flex: wjcGrid.FlexGrid;
    // A collection of column definitions.
    @ContentChildren(forwardRef(() => AggregatedGridColumnComponent)) columns: QueryList<AggregatedGridColumnComponent>;
    onFormatItem: (e: wjcGrid.FormatItemEventArgs) => void;

    constructor() {
        // Provide correct 'this' for the formatItem event handler.
        this.onFormatItem = this._onFormatItem.bind(this);
    }

    // Indicates whether grid cells editing is enabled.
    @Input()
    get isEditable(): boolean {
        return this._isEditable;
    }
    set isEditable(value: boolean) {
        if (this._isEditable !== value) {
            this._isEditable = value;
            if (this.flex) {
                // invalidates grid to apply changes
                this.flex.invalidate();
            }
        }
    }

    // FlexGrid.formatItem event handler, enables or disables cell editing based on the isEditable property value.
    private _onFormatItem(e: wjcGrid.FormatItemEventArgs) {
        if (e.panel.cellType === wjcGrid.CellType.Cell) {
            const column: wjcGrid.Column = this.flex.columns[e.col];
            wjcCore.enable(e.cell, this.isEditable || column.name === 'select');
        }
    }
}
