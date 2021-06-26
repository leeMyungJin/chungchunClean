<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet name="Number" :rowCount="20" :columnCount="8"></wj-sheet>
            <wj-sheet name="Date" :rowCount="20" :columnCount="8"></wj-sheet>
        </wj-flex-sheet>
        <wj-color-picker
            style="display:none;position:fixed;z-index:100"
            :initialized="colorPickerInit">
        </wj-color-picker>
        <div class="well well-lg">
            <wj-menu
                :header="'Format'"
                :value="format"
                :itemClicked="formatChanged">
                <wj-menu-item :value="'0'">Decimal Format</wj-menu-item>
                <wj-menu-item :value="'n2'">Number Format</wj-menu-item>
                <wj-menu-item :value="'p'">Percentage Format</wj-menu-item>
                <wj-menu-item :value="'c2'">Currency Format</wj-menu-item>
                <wj-menu-separator></wj-menu-separator>
                <wj-menu-item :value="'d'">Short Date</wj-menu-item>
                <wj-menu-item :value="'D'">Long Date</wj-menu-item>
                <wj-menu-item :value="'f'">Full Date/TIme (short time)</wj-menu-item>
                <wj-menu-item :value="'F'">Full Date/TIme (long time)</wj-menu-item>
            </wj-menu>
            <div>Font:
                <wj-combo-box
                    style="width:120px"
                    :itemsSource="fonts"
                    :selectedIndex="fontIdx"
                    displayMemberPath="name"
                    selectedValuePath="value"
                    :isEditable="false"
                    :selectedIndexChanged="fontChanged">
                </wj-combo-box>
                <wj-combo-box
                    style="width:80px"
                    :itemsSource="fontSizeList"
                    :selectedIndex="fontSizeIdx"
                    displayMemberPath="name"
                    selectedValuePath="value"
                    :isEditable="false"
                    :selectedIndexChanged="fontSizeChanged">
                </wj-combo-box>
                <div class="btn-group">
                    <button
                        type="button"
                        v-bind:class="['btn btn-default', { active: isBold }]"
                        @click="applyBoldStyle()">
                    Bold</button>
                    <button
                        type="button"
                        v-bind:class="['btn btn-default', { active: isItalic }]"
                        @click="applyItalicStyle()">
                    Italic</button>
                    <button
                        type="button"
                        v-bind:class="['btn btn-default', { active: isUnderline }]"
                        @click="applyUnderlineStyle()">
                    Underline</button>
                </div>
            </div>
            <div>Color:
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-default"
                        @click="showColorPicker($event, false)">
                    Fore Color</button>
                    <button
                        type="button"
                        class="btn btn-default"
                        @click="showColorPicker($event, true)">
                    Fill Color</button>
                </div>Alignment:
                <div class="btn-group">
                    <button
                        type="button"
                        v-bind:class="['btn btn-default', { active: textAlign == 'left' }]"
                        @click="applyCellTextAlign('left')">
                    Left</button>
                    <button
                        type="button"
                        v-bind:class="['btn btn-default', { active: textAlign == 'center' }]"
                        @click="applyCellTextAlign('center')">
                    Center</button>
                    <button
                        type="button"
                        v-bind:class="['btn btn-default', { active: textAlign == 'right' }]"
                        @click="applyCellTextAlign('right')">
                    Right</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.core';
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.grid.sheet';

let App = Vue.extend({
    name: 'app',
    data: function() {
        return {
            fonts: [
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
            ],
            fontSizeList: [
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
            ],
            format: '0',
            fontIdx: 0,
            fontSizeIdx: 5,
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textAlign: 'left',
            _updatingSelection: false,
            _applyFillColor: false,
            flex: {},
            colorPicker: {},
        };
    },
    methods: {
        initializeFlexSheet(flex) {
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

            flex.selectionChanged.addHandler((sender, args) => {
                this._updateSelection(flex, args.range);
            });

            this.flex = flex;
        },

        fontChanged(sender) {
            if (sender.selectedItem && !this._updatingSelection) {
                this.flex.applyCellsStyle({ fontFamily: sender.selectedItem.value });
            }
        },

        fontSizeChanged(sender) {
            if (sender.selectedItem && !this._updatingSelection) {
                this.flex.applyCellsStyle({ fontSize: sender.selectedItem.value });
            }
        },

        colorPickerInit(colorPicker) {
            // if the browser is firefox, we should bind the blur event. (TFS #124387)
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

            this.colorPicker = colorPicker;
        },

        formatChanged(sender) {
            if (sender.selectedIndex >= 0) {
                this.flex.applyCellsStyle({ format: sender.selectedValue });
            }
        },

        // apply the text alignment for the selected cells
        applyCellTextAlign(textAlign) {
            this.flex.applyCellsStyle({ textAlign: textAlign });
            this.textAlign = textAlign;
        },

        // apply the bold font weight for the selected cells
        applyBoldStyle() {
            this.flex.applyCellsStyle({ fontWeight: this.isBold ? 'none' : 'bold' });
            this.isBold = !this.isBold;
        },

        // apply the underline text decoration for the selected cells
        applyUnderlineStyle() {
            this.flex.applyCellsStyle({ textDecoration: this.isUnderline ? 'none' : 'underline' });
            this.isUnderline = !this.isUnderline;
        },

        // apply the italic font style for the selected cells
        applyItalicStyle() {
            this.flex.applyCellsStyle({ fontStyle: this.isItalic ? 'none' : 'italic' });
            this.isItalic = !this.isItalic;
        },

        // show the color picker control.
        showColorPicker(e, isFillColor) {
            let offset = this._cumulativeOffset(e.target),
                he = this.colorPicker.hostElement;

            he.style.display = 'inline';
            he.style.left = offset.left + 'px';
            he.style.top = offset.top - he.clientHeight - 5 + 'px';
            he.focus();

            this._applyFillColor = isFillColor;
        },

        // Update the selection object of the scope.
        _updateSelection(flexSheet, sel) {
            let row = flexSheet.rows[sel.row],
                rCnt = flexSheet.rows.length,
                cCnt = flexSheet.columns.length,
                fontIdx = 0,
                fontSizeIdx = 5;

            this._updatingSelection = true;

            if (sel.row > -1 && sel.col > -1 && rCnt > 0 && cCnt > 0 && sel.col < cCnt && sel.col2 < cCnt && sel.row < rCnt && sel.row2 < rCnt) {
                let cellContent = flexSheet.getCellData(sel.row, sel.col, false),
                    cellStyle = flexSheet.selectedSheet.getCellStyle(sel.row, sel.col),
                    cellFormat = null;

                if (cellStyle) {
                    fontIdx = this._checkFontfamily(cellStyle.fontFamily);
                    fontSizeIdx = this._checkFontSize(cellStyle.fontSize);
                    cellFormat = cellStyle.format;
                }

                let format;
                if (!!cellFormat) {
                    format = cellFormat;
                } else {
                    if (wijmo.isInt(cellContent)) {
                        format = '0';
                    } else if (wijmo.isNumber(cellContent)) {
                        format = 'n2';
                    } else if (wijmo.isDate(cellContent)) {
                        format = 'd';
                    }
                }

                this.fontIdx = fontIdx;
                this.fontSizeIdx = fontSizeIdx;
                
                let state = flexSheet.getSelectionFormatState();
                this.isBold = state.isBold;
                this.isItalic = state.isItalic;
                this.isUnderline = state.isUnderline;
                this.textAlign = state.textAlign;
            }

            this._updatingSelection = false;
        },

        // check font family for the font name combobox of the ribbon.
        _checkFontfamily(fontFamily) {
            let fonts = this.fonts;

            if (!fontFamily) {
                return 0;
            }

            for (let fontIndex = 0; fontIndex < fonts.length; fontIndex++) {
                let font = fonts[fontIndex];
                if (font.name === fontFamily || font.value === fontFamily) {
                    return fontIndex;
                }
            }

            return 0;
        },

        // check font size for the font size combobox of the ribbon.
        _checkFontSize(fontSize) {
            let sizeList = this.fontSizeList;

            if (fontSize == null) {
                return 5;
            }

            for (let index = 0; index < sizeList.length; index++) {
                let size = sizeList[index];
                if (size.value === fontSize || size.name === fontSize) {
                    return index;
                }
            }

            return 5;
        },

        // Get the absolute position of the dom element.
        _cumulativeOffset(element) {
            let top = 0,
                left = 0,
                scrollTop = 0,
                scrollLeft = 0;

            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                scrollTop += element.scrollTop || 0;
                scrollLeft += element.scrollLeft || 0;
                element = element.offsetParent;
            } while (element && !(element instanceof HTMLBodyElement));

            scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
            scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;

            return {
                top: top - scrollTop,
                left: left - scrollLeft
            };
        }
    }
});

new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-flexsheet {
        height: 400px;
        margin: 6px 0;
    }
</style>