import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridSheetModule } from '@grapecity/wijmo.angular2.grid.sheet';

import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
import * as sheet from '@grapecity/wijmo.grid.sheet';

@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('flex', { static: true }) flex: sheet.FlexSheet;
    @ViewChild('cboFontName', { static: true }) cboFontName: input.ComboBox;
    @ViewChild('cboFontSize', { static: true }) cboFontSize: input.ComboBox;
    @ViewChild('cboTableStyles', { static: true }) cboTableStyles: input.ComboBox;
    @ViewChild('colorPicker', { static: true }) colorPicker: input.ColorPicker;

    fonts = [
        { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
        { name: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
        { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
        { name: 'Courier New', value: '"Courier New", Courier, monospace' },
        { name: 'Georgia', value: 'Georgia, serif' },
        { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
        { name: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
        { name: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
        { name: 'Palatino Linotype', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
        { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
        { name: 'Segoe UI', value: '"Segoe UI", "Roboto", sans-serif' },
        { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
        { name: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
        { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' }
    ];

    fontSizeList = [
        { name: '8', value: '8px' },
        { name: '9', value: '9px' },
        { name: '10', value: '10px' },
        { name: '11', value: '11px' },
        { name: '12', value: '12px' },
        { name: '14', value: '14px' },
        { name: '16', value: '16px' },
        { name: '18', value: '18px' },
        { name: '20', value: '20px' },
        { name: '22', value: '22px' },
        { name: '24', value: '24px' }
    ];

    selectionFormatState: sheet.IFormatState = {};

    private _updatingSelection = false;
    private _applyFillColor = false;
    private _format = '';

    // Gets or sets _format for the formatSheet.
    get format(): string {
        return this._format;
    }
    set format(value: string) {
        if (this._format !== value) {
            this._format = value;
            if (!this._updatingSelection) {
                this.flex.applyCellsStyle({ format: this._format });
            }
        }
    }

    initializeFlexSheet(flex: sheet.FlexSheet) {
        flex.deferUpdate(() => {
            for (let sheetIdx = 0; sheetIdx < flex.sheets.length; sheetIdx++) {
                flex.selectedSheetIndex = sheetIdx;
                let sheetName = flex.selectedSheet.name;

                for (let colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                    for (let rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                        if (sheetName === 'Number') {
                            flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        } else {
                            let date = new Date(2015, colIdx, rowIdx + 1);
                            flex.setCellData(rowIdx, colIdx, date);
                        }
                    }
                }
            }

            flex.selectedSheetIndex = 0;
            setTimeout(() => this._updateSelection(flex, flex.selection), 100);
        });

        flex.selectionChanged.addHandler((sender: sheet.FlexSheet, args: grid.CellRangeEventArgs) => {
            this._updateSelection(flex, args.range);
        });
    }

    fontChanged(sender: input.ComboBox) {
        if (sender.selectedItem &&  !this._updatingSelection) {
            this.flex.applyCellsStyle({ fontFamily: sender.selectedItem.value });
        }
    }

    fontSizeChanged(sender: input.ComboBox) {
        if (sender.selectedItem && !this._updatingSelection) {
            this.flex.applyCellsStyle({ fontSize: sender.selectedItem.value });
        }
    }

    colorPickerInit(colorPicker: input.ColorPicker) {
        // if the browser is Firefox, we should bind the blur event. (TFS #124387)
        // if the browser is IE, we should bind the focusout event. (TFS #124500)
        let blurEvt = /firefox/i.test(window.navigator.userAgent) ? 'blur' : 'focusout';
        // Hide the color picker control when it lost the focus.
        colorPicker.hostElement.addEventListener(blurEvt, () => {
            setTimeout(() => {
                if (!colorPicker.containsFocus()) {
                    this._applyFillColor = false;
                    colorPicker.hostElement.style.display = 'none';
                }
            }, 0);
        });

        // Initialize the value changed event handler for the color picker control.
        colorPicker.valueChanged.addHandler(() => {
            if (this._applyFillColor) {
                this.flex.applyCellsStyle({ backgroundColor: colorPicker.value });
            } else {
                this.flex.applyCellsStyle({ color: colorPicker.value });
            }
        });
    }

    // apply the text alignment for the selected cells
    applyCellTextAlign(textAlign: string) {
        this.flex.applyCellsStyle({ textAlign: textAlign });
        this.selectionFormatState.textAlign = textAlign;
    }

    // apply the bold font weight for the selected cells
    applyBoldStyle() {
        this.flex.applyCellsStyle({ fontWeight: this.selectionFormatState.isBold ? 'none' : 'bold' });
        this.selectionFormatState.isBold = !this.selectionFormatState.isBold;
    }

    // apply the underline text decoration for the selected cells
    applyUnderlineStyle() {
        this.flex.applyCellsStyle({ textDecoration: this.selectionFormatState.isUnderline ? 'none' : 'underline' });
        this.selectionFormatState.isUnderline = !this.selectionFormatState.isUnderline;
    }

    // apply the italic font style for the selected cells
    applyItalicStyle() {
        this.flex.applyCellsStyle({ fontStyle: this.selectionFormatState.isItalic ? 'none' : 'italic' });
        this.selectionFormatState.isItalic = !this.selectionFormatState.isItalic;
    }

    // show the color picker control
    showColorPicker(e: MouseEvent, isFillColor: boolean) {
        let offset = this._cumulativeOffset(<HTMLElement>e.target),
            he = this.colorPicker.hostElement;

        he.style.display = 'inline';
        he.style.left = offset.left + 'px';
        he.style.top = (offset.top - he.clientHeight - 5) + 'px';
        he.focus();

        this._applyFillColor = isFillColor;
    };

    // Update the selection object of the scope.
    private _updateSelection(fs: sheet.FlexSheet, sel: grid.CellRange) {
        let rCnt = fs.rows.length,
            cCnt = fs.columns.length;

        this._updatingSelection = true;

        if (sel.row > -1 && sel.col > -1 && rCnt > 0 && cCnt > 0 && sel.col < cCnt && sel.col2 < cCnt && sel.row < rCnt && sel.row2 < rCnt) {
            let cellContent = fs.getCellData(sel.row, sel.col, false),
                cellStyle = fs.selectedSheet.getCellStyle(sel.row, sel.col),
                cellFormat: string;

            if (cellStyle) {
                this.cboFontName.selectedIndex = this._checkFontfamily(cellStyle.fontFamily);
                this.cboFontSize.selectedIndex = this._checkFontSize(cellStyle.fontSize);
                cellFormat = cellStyle.format;
            } else {
                this.cboFontName.selectedIndex = 0;
                this.cboFontSize.selectedIndex = 5;
            }

            if (!!cellFormat) {
                this.format = cellFormat;
            } else {
                if (wijmo.isInt(cellContent)) {
                    this.format = '0';
                } else if (wijmo.isNumber(cellContent)) {
                    this.format = 'n2';
                } else if (wijmo.isDate(cellContent)) {
                    this.format = 'd';
                }
            }

            this.selectionFormatState = fs.getSelectionFormatState();
        }

        this._updatingSelection = false;
    }

    // check font family for the font name combobox of the ribbon.
    private _checkFontfamily(value: string) {
        let fonts = this.fonts;

        if (!value) {
            return 0;
        }

        for (let fontIndex = 0; fontIndex < fonts.length; fontIndex++) {
            let font = fonts[fontIndex];
            if (font.name === value || font.value === value) {
                return fontIndex;
            }
        }

        return 0;
    }

    // check font size for the font size combobox of the ribbon.
    private _checkFontSize(value: string) {
        let sizeList = this.fontSizeList;

        if (value == null) {
            return 5;
        }

        for (let index = 0; index < sizeList.length; index++) {
            let size = sizeList[index];
            if (size.value === value || size.name === value) {
                return index;
            }
        }

        return 5;
    }

    // Get the absolute position of the dom element.
    private _cumulativeOffset(element: HTMLElement) {
        let top = 0,
            left = 0,
            scrollTop = 0,
            scrollLeft = 0;

        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            scrollTop += element.scrollTop || 0;
            scrollLeft += element.scrollLeft || 0;
            element = <HTMLElement>element.offsetParent;
        } while (element && !(element instanceof HTMLBodyElement));

        scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
        scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;

        return {
            top: top - scrollTop,
            left: left - scrollLeft
        };
    }
}

@NgModule({
    imports: [WjGridSheetModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);