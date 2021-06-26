import { Component, Input } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { SelectionTypeEnum } from './selection-type.enum';

// Selection cell renderer component that allows to edit a cell without switching to the cell edit mode.
@Component({
    selector: 'editable-selection-renderer',
    templateUrl: './editable-selection.component.html',
})
export class EditableSelectionComponent {
    /* tslint:disable:variable-name */

    // References SelectionType enum to give an access to its members in markup.
    SelectionType = SelectionTypeEnum;

    /* tslint:enable:variable-name */

    private _selectionType: SelectionTypeEnum;

    // The 'cell' object provided by the wjFlexGridCellTemplate directive.
    @Input() cell: any;

    // Defines row selection type - Single/Multi.
    @Input()
    get selectionType(): SelectionTypeEnum {
        return this._selectionType;
    }
    set selectionType(value: SelectionTypeEnum) {
        this._selectionType = wjcCore.asEnum(value, SelectionTypeEnum, true);
    }

    constructor() {
    }

    // Single row selection handler - set this cell value to true and all other cell values to false.
    singleSelectChanged(e: any) {
        if (e.target.checked) {
            const row: wjcGrid.Row = this.cell.row;
            const col: wjcGrid.Column = this.cell.col;
            const grid = row.grid;
            for (let i = 0; i < grid.rows.length; i++) {
                grid.setCellData(i, col.index, row.index === i, false);
            }
            grid.invalidate(false);
        }
    }
}
