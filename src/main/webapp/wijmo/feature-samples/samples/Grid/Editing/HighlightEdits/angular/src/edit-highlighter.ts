import { isUndefined, isDate, toggleClass } from '@grapecity/wijmo';
import { FlexGrid, CellRangeEventArgs, FormatItemEventArgs } from '@grapecity/wijmo.grid';

/**
 * Class that highlights cells that have been edited in a FlexGrid.
 */
export class EditHighlighter {
    _originalValues = new Map<any, any>();
    _grid: FlexGrid;

    /**
     * Initializes a new instance of the {@link EditHighlighter} class.
     * 
     * @param grid FlexGrid to highlight.
     * @param cssClass Class name to apply to changed cells.
     */
    constructor(grid: FlexGrid, cssClass: string) {
        this._grid = grid;
        let cellChanged = this._cellChanged.bind(this);
        grid.cellEditEnded.addHandler(cellChanged);
        grid.pastedCell.addHandler(cellChanged);
        grid.formatItem.addHandler((s: FlexGrid, e: FormatItemEventArgs) => {
            if (e.panel == s.cells) {
                let changed = this._hasChange(e.getRow().dataItem, e.getColumn().binding);
                toggleClass(e.cell, 'cell-changed', changed);
            }
        })
    }

    /**
     * Clears all the changes and removes all highlights.
     */
    clearChanges() {
        this._originalValues.clear();
        this._grid.invalidate();
    }

    // checks whether a cell has changed
    private _hasChange(item: any, binding: string): boolean {
        item = this._originalValues.get(item);
        return item != null && !isUndefined(item[binding]);
    }

    // handles a cell change (edit or paste)
    private _cellChanged(s: FlexGrid, e: CellRangeEventArgs) {
        let originalValue = e.data,
        newValue = s.getCellData(e.row, e.col, false);
            this._storeChange(e.getRow().dataItem, e.getColumn().binding, originalValue, newValue);
    }

    // store a change into the _originalValues map
    private _storeChange(item: any, binding: string, originalValue: any, newValue: any) {

        // get the item with the original values
        let editItem = this._originalValues.get(item);
        if (editItem == null) {
            editItem = {};
            this._originalValues.set(item, editItem);
        }

        // get the original value from the item if possible
        let editValue = editItem[binding];
        if (!isUndefined(editValue)) {
            originalValue = editValue;
        }

        // store or clear the change
        if (this._sameValue(originalValue, newValue)) {
            delete editItem[binding];
            if (Object.keys(editItem).length == 0) {
                this._originalValues.delete(item);
            }
        } else {
            editItem[binding] = originalValue;
        }
    }

    // compare two values taking dates into account
    private _sameValue(item1: any, item2: any): boolean {
        if (item1 === item2) {
            return true;
        }
        if (isDate(item1) && isDate(item2)) {
            return item1.getTime() == item2.getTime();
        }
        return false;
    }

}