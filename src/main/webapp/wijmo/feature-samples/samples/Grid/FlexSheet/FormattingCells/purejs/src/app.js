import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as sheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let fonts = [
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
    //
    let fontSizeList = [
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
    //
    let updatingSelection = false;
    let applyFillColor = false;
    let selectionFormatState = {};
    let flexSheet = new sheet.FlexSheet('#formatSheet');
    let inputColor = new input.ColorPicker('#inputColor');
    //
    let formatMenu = new input.Menu('#formatMenu', {
        selectedIndex: 0,
        selectedIndexChanged: (sender) => {
            if (sender.selectedIndex >= 0 && !updatingSelection) {
                updateMenuHeader(sender, 'Format');
                flexSheet.applyCellsStyle({ format: sender.selectedValue });
            }
        }
    });
    updateMenuHeader(formatMenu, 'Format');
    //
    let cboFontName = new input.ComboBox('#fonts', {
        itemsSource: fonts,
        displayMemberPath: 'name',
        selectedValuePath: 'value',
        isEditable: false
    });
    //
    let cboFontSize = new input.ComboBox('#fontSize', {
        itemsSource: fontSizeList,
        selectedIndex: 5,
        displayMemberPath: 'name',
        selectedValuePath: 'value',
        isEditable: false
    });
    //
    flexSheet.addUnboundSheet('Number', 20, 8);
    flexSheet.addUnboundSheet('Date', 20, 8);
    flexSheet.deferUpdate(() => {
        for (let sheetIdx = flexSheet.sheets.length - 1; sheetIdx >= 0; sheetIdx--) {
            flexSheet.selectedSheetIndex = sheetIdx;
            let sheetName = flexSheet.selectedSheet.name;
            //
            for (let colIdx = 0; colIdx < flexSheet.columns.length; colIdx++) {
                for (let rowIdx = 0; rowIdx < flexSheet.rows.length; rowIdx++) {
                    if (sheetName === 'Number') {
                        flexSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                    }
                    else {
                        let date = new Date(2018, colIdx, rowIdx + 1);
                        flexSheet.setCellData(rowIdx, colIdx, date);
                    }
                }
            }
        }
        flexSheet.selectedSheetIndex = 0;
        setTimeout(() => updateSelection(flexSheet.selection), 100);
    });
    //
    flexSheet.selectionChanged.addHandler((sender, args) => {
        updateSelection(args.range);
    });
    //
    // Hide the color picker control when it lost the focus.
    let blurEvt = /firefox/i.test(window.navigator.userAgent) ? 'blur' : 'focusout';
    inputColor.hostElement.addEventListener(blurEvt, () => {
        setTimeout(() => {
            if (!inputColor.containsFocus()) {
                applyFillColor = false;
                inputColor.hostElement.style.display = 'none';
            }
        }, 0);
    });
    //
    // Initialize the value changed event handler for the color picker control.
    inputColor.valueChanged.addHandler(() => {
        if (applyFillColor) {
            flexSheet.applyCellsStyle({ backgroundColor: inputColor.value });
        }
        else {
            flexSheet.applyCellsStyle({ color: inputColor.value });
        }
    });
    //
    cboFontName.selectedIndexChanged.addHandler(() => {
        // apply the font family for the selected cells
        if (!updatingSelection) {
            flexSheet.applyCellsStyle({ fontFamily: cboFontName.selectedItem.value });
        }
    });
    //
    cboFontSize.selectedIndexChanged.addHandler(() => {
        // apply the font size for the selected cells
        if (!updatingSelection) {
            flexSheet.applyCellsStyle({ fontSize: cboFontSize.selectedItem.value });
        }
    });
    //
    onClick('applyCellTextLeftAlign', () => applyCellTextAlign('left'));
    onClick('applyCellTextCenterAlign', () => applyCellTextAlign('center'));
    onClick('applyCellTextRightAlign', () => applyCellTextAlign('right'));
    //
    onClick('applyBoldStyle', e => {
        flexSheet.applyCellsStyle({ fontWeight: selectionFormatState.isBold ? 'none' : 'bold' });
        selectionFormatState.isBold = !selectionFormatState.isBold;
        //
        if (selectionFormatState.isBold) {
            wijmo.addClass(e.target, 'active');
        }
        else {
            wijmo.removeClass(e.target, 'active');
        }
    });
    //
    onClick('applyUnderlineStyle', e => {
        flexSheet.applyCellsStyle({ textDecoration: selectionFormatState.isUnderline ? 'none' : 'underline' });
        selectionFormatState.isUnderline = !selectionFormatState.isUnderline;
        //
        if (selectionFormatState.isUnderline) {
            wijmo.addClass(e.target, 'active');
        }
        else {
            wijmo.removeClass(e.target, 'active');
        }
    });
    //
    onClick('applyItalicStyle', e => {
        flexSheet.applyCellsStyle({ fontStyle: selectionFormatState.isItalic ? 'none' : 'italic' });
        selectionFormatState.isItalic = !selectionFormatState.isItalic;
        //
        if (selectionFormatState.isItalic) {
            wijmo.addClass(e.target, 'active');
        }
        else {
            wijmo.removeClass(e.target, 'active');
        }
    });
    //
    onClick('foreColor', (e) => showColorPicker(e, false));
    onClick('fillColor', (e) => showColorPicker(e, true));
    //
    // apply the text alignment for the selected cells
    function applyCellTextAlign(textAlign) {
        flexSheet.applyCellsStyle({ textAlign: textAlign });
        selectionFormatState.textAlign = textAlign;
        updateTextAlignState(textAlign);
    }
    //
    // show the color picker control.
    function showColorPicker(e, isFillColor) {
        let offset = cumulativeOffset(e.target), he = inputColor.hostElement;
        //
        he.style.display = 'inline';
        he.style.left = offset.left + 'px';
        he.style.top = (offset.top - he.clientHeight - 5) + 'px';
        he.focus();
        //
        applyFillColor = isFillColor;
    }
    //
    // Update the selection object of the scope.
    function updateSelection(sel) {
        let rCnt = flexSheet.rows.length, cCnt = flexSheet.columns.length;
        //
        updatingSelection = true;
        //
        if (sel.row > -1 && sel.col > -1 && rCnt > 0 && cCnt > 0 && sel.col < cCnt && sel.col2 < cCnt && sel.row < rCnt && sel.row2 < rCnt) {
            let cellContent = flexSheet.getCellData(sel.row, sel.col, false), cellStyle = flexSheet.selectedSheet.getCellStyle(sel.row, sel.col), cellFormat = '';
            //
            if (cellStyle) {
                cboFontName.selectedIndex = checkFontfamily(cellStyle.fontFamily);
                cboFontSize.selectedIndex = checkFontSize(cellStyle.fontSize);
                cellFormat = cellStyle.format;
            }
            else {
                cboFontName.selectedIndex = 0;
                cboFontSize.selectedIndex = 5;
            }
            //
            if (!cellFormat) {
                if (wijmo.isInt(cellContent)) {
                    cellFormat = '0';
                }
                else if (wijmo.isNumber(cellContent)) {
                    cellFormat = 'n2';
                }
                else if (wijmo.isDate(cellContent)) {
                    cellFormat = 'd';
                }
            }
            //
            formatMenu.selectedValue = cellFormat;
            //
            selectionFormatState = flexSheet.getSelectionFormatState();
            updateStyleButtonState();
        }
        //
        updatingSelection = false;
    }
    //
    function updateStyleButtonState() {
        let boldBtn = document.querySelector('#applyBoldStyle'), underlineBtn = document.querySelector('#applyUnderlineStyle'), italicBtn = document.querySelector('#applyItalicStyle');
        //
        if (selectionFormatState.isBold) {
            wijmo.addClass(boldBtn, 'active');
        }
        else {
            wijmo.removeClass(boldBtn, 'active');
        }
        //
        if (selectionFormatState.isUnderline) {
            wijmo.addClass(underlineBtn, 'active');
        }
        else {
            wijmo.removeClass(underlineBtn, 'active');
        }
        //
        if (selectionFormatState.isItalic) {
            wijmo.addClass(italicBtn, 'active');
        }
        else {
            wijmo.removeClass(italicBtn, 'active');
        }
        //
        updateTextAlignState(selectionFormatState.textAlign);
    }
    //
    function updateTextAlignState(textAlign) {
        let leftBtn = document.querySelector('#applyCellTextLeftAlign'), centerBtn = document.querySelector('#applyCellTextCenterAlign'), rightBtn = document.querySelector('#applyCellTextRightAlign');
        //
        wijmo.removeClass(leftBtn, 'active');
        wijmo.removeClass(centerBtn, 'active');
        wijmo.removeClass(rightBtn, 'active');
        //
        switch (textAlign) {
            case 'left':
                wijmo.addClass(leftBtn, 'active');
                break;
            case 'center':
                wijmo.addClass(centerBtn, 'active');
                break;
            case 'right':
                wijmo.addClass(rightBtn, 'active');
                break;
        }
    }
    //
    // check font family for the font name combobox of the ribbon.
    function checkFontfamily(value) {
        if (!value) {
            return 0;
        }
        //
        for (let fontIndex = 0; fontIndex < fonts.length; fontIndex++) {
            let font = fonts[fontIndex];
            if (font.name === value || font.value === value) {
                return fontIndex;
            }
        }
        //
        return 0;
    }
    //
    // check font size for the font size combobox of the ribbon.
    function checkFontSize(value) {
        if (value == null) {
            return 5;
        }
        //
        for (let index = 0; index < fontSizeList.length; index++) {
            let size = fontSizeList[index];
            if (size.value === value || size.name === value) {
                return index;
            }
        }
        //
        return 5;
    }
    //
    // Get the absolute position of the dom element.
    function cumulativeOffset(element) {
        let top = 0, left = 0, scrollTop = 0, scrollLeft = 0;
        //
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            scrollTop += element.scrollTop || 0;
            scrollLeft += element.scrollLeft || 0;
            element = element.offsetParent;
        } while (element && !(element instanceof HTMLBodyElement));
        //
        scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
        scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;
        //
        return {
            top: top - scrollTop,
            left: left - scrollLeft
        };
    }
    //
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
    //
    function updateMenuHeader(menu, header) {
        menu.header = header + ': <b>' + menu.text + '</b>';
    }
}
