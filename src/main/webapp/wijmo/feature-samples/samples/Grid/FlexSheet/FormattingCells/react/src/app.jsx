import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjGridSheet from '@grapecity/wijmo.react.grid.sheet';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this._applyFillColor = false;
        //
        this._fonts = [
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
        this._fontSizeList = [
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
        this._updatingSelection = false;
        //
        this.state = {
            selectedValue: '0',
            fontIdx: 0,
            fontSizeIdx: 5,
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textAlign: 'left'
        };
    }
    //
    render() {
        return (<div className="container-fluid">
                <wjGridSheet.FlexSheet initialized={this.initializeFlexSheet.bind(this)}>
                    <wjGridSheet.Sheet name="Number" rowCount={20} columnCount={8}></wjGridSheet.Sheet>
                    <wjGridSheet.Sheet name="Date" rowCount={20} columnCount={8}></wjGridSheet.Sheet>
                </wjGridSheet.FlexSheet>
                <wjInput.ColorPicker style={{ display: "none", position: "fixed", zIndex: 100 }} initialized={this.colorPickerInit.bind(this)}>
                </wjInput.ColorPicker>
                <div className="well well-lg">
                    <wjInput.Menu header='Format' value={this.state.selectedValue} itemClicked={this.formatChanged.bind(this)}>
                        <wjInput.MenuItem value="0">Decimal Format</wjInput.MenuItem>
                        <wjInput.MenuItem value="n2">Number Format</wjInput.MenuItem>
                        <wjInput.MenuItem value="p">Percentage Format</wjInput.MenuItem>
                        <wjInput.MenuItem value="c2">Currency Format</wjInput.MenuItem>
                        <wjInput.MenuSeparator></wjInput.MenuSeparator>
                        <wjInput.MenuItem value="d">Short Date</wjInput.MenuItem>
                        <wjInput.MenuItem value="D">Long Date</wjInput.MenuItem>
                        <wjInput.MenuItem value="f">Full Date/TIme (short time)</wjInput.MenuItem>
                        <wjInput.MenuItem value="F">Full Date/TIme (long time)</wjInput.MenuItem>
                    </wjInput.Menu>
                    <div>Font:
                        <wjInput.ComboBox style={{ width: "120px" }} itemsSource={this._fonts} selectedIndex={this.state.fontIdx} displayMemberPath="name" selectedValuePath="value" isEditable={false} selectedIndexChanged={this.fontChanged.bind(this)}>
                        </wjInput.ComboBox>
                        <wjInput.ComboBox style={{ width: "80px" }} itemsSource={this._fontSizeList} selectedIndex={this.state.fontSizeIdx} displayMemberPath="name" selectedValuePath="value" isEditable={false} selectedIndexChanged={this.fontSizeChanged.bind(this)}>
                        </wjInput.ComboBox>
                        <div className="btn-group">
                            <button type="button" className={`btn btn-default ${this.state.isBold ? 'active' : ''}`} onClick={this.applyBoldStyle.bind(this)}>
                                Bold</button>
                            <button type="button" className={`btn btn-default ${this.state.isItalic ? 'active' : ''}`} onClick={this.applyItalicStyle.bind(this)}>
                                Italic</button>
                            <button type="button" className={`btn btn-default ${this.state.isUnderline ? 'active' : ''}`} onClick={this.applyUnderlineStyle.bind(this)}>
                                Underline</button>
                        </div>
                    </div>
                    <div>Color:
                        <div className="btn-group">
                            <button type="button" className="btn btn-default" onClick={(e) => this.showColorPicker(e, false)}>
                                Fore Color</button>
                            <button type="button" className="btn btn-default" onClick={(e) => this.showColorPicker(e, true)}>
                                Fill Color</button>
                        </div>Alignment:
                        <div className="btn-group">
                            <button type="button" className={`btn btn-default ${this.state.textAlign == 'left' ? 'active' : ''}`} onClick={() => this.applyCellTextAlign("left")}>
                                Left</button>
                            <button type="button" className={`btn btn-default ${this.state.textAlign == 'center' ? 'active' : ''}`} onClick={() => this.applyCellTextAlign("center")}>
                                Center</button>
                            <button type="button" className={`btn btn-default ${this.state.textAlign == 'right' ? 'active' : ''}`} onClick={() => this.applyCellTextAlign("right")}>
                                Right</button>
                        </div>
                    </div>
                </div>
            </div>);
    }
    //
    initializeFlexSheet(sender) {
        this._flex = sender;
        //
        sender.deferUpdate(() => {
            for (let sheetIdx = 0; sheetIdx < sender.sheets.length; sheetIdx++) {
                sender.selectedSheetIndex = sheetIdx;
                let sheetName = sender.selectedSheet.name;
                //
                for (let colIdx = 0; colIdx < sender.columns.length; colIdx++) {
                    for (let rowIdx = 0; rowIdx < sender.rows.length; rowIdx++) {
                        if (sheetName === 'Number') {
                            sender.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        }
                        else {
                            let date = new Date(2015, colIdx, rowIdx + 1);
                            sender.setCellData(rowIdx, colIdx, date);
                        }
                    }
                }
            }
            //
            sender.selectedSheetIndex = 0;
            setTimeout(() => this._updateSelection(sender, sender.selection), 100);
        });
        //
        sender.selectionChanged.addHandler((sender, args) => {
            this._updateSelection(sender, args.range);
        });
    }
    //
    fontChanged(sender) {
        if (sender.selectedItem && !this._updatingSelection) {
            this._flex.applyCellsStyle({ fontFamily: sender.selectedItem.value });
        }
    }
    //
    fontSizeChanged(sender) {
        if (sender.selectedItem && !this._updatingSelection) {
            this._flex.applyCellsStyle({ fontSize: sender.selectedItem.value });
        }
    }
    //
    colorPickerInit(sender) {
        // if the browser is firefox, we should bind the blur event. (TFS #124387)
        // if the browser is IE, we should bind the focusout event. (TFS #124500)
        let blurEvt = /firefox/i.test(window.navigator.userAgent) ? 'blur' : 'focusout';
        // Hide the color picker control when it lost the focus.
        sender.hostElement.addEventListener(blurEvt, () => {
            setTimeout(() => {
                if (!sender.containsFocus()) {
                    this._updatingSelection = false;
                    sender.hostElement.style.display = 'none';
                }
            }, 0);
        });
        //
        // Initialize the value changed event handler for the color picker control.
        sender.valueChanged.addHandler(() => {
            if (this._applyFillColor) {
                this._flex.applyCellsStyle({ backgroundColor: sender.value });
            }
            else {
                this._flex.applyCellsStyle({ color: sender.value });
            }
        });
        //
        this._colorPicker = sender;
    }
    //
    formatChanged(sender) {
        if (sender.selectedValue) {
            this._flex.applyCellsStyle({ format: sender.selectedValue });
            this.setState({ selectedValue: sender.selectedValue });
        }
    }
    //
    // apply the text alignment for the selected cells
    applyCellTextAlign(value) {
        this._flex.applyCellsStyle({ textAlign: value });
        this.setState({ textAlign: value });
    }
    //
    // apply the bold font weight for the selected cells
    applyBoldStyle() {
        this._flex.applyCellsStyle({ fontWeight: this.state.isBold ? 'none' : 'bold' });
        this.setState({ isBold: !this.state.isBold });
    }
    //
    // apply the underline text decoration for the selected cells
    applyUnderlineStyle() {
        this._flex.applyCellsStyle({ textDecoration: this.state.isUnderline ? 'none' : 'underline' });
        this.setState({ isUnderline: !this.state.isUnderline });
    }
    //
    // apply the italic font style for the selected cells
    applyItalicStyle() {
        this._flex.applyCellsStyle({ fontStyle: this.state.isItalic ? 'none' : 'italic' });
        this.setState({ isItalic: !this.state.isItalic });
    }
    //
    // show the color picker control.
    showColorPicker(e, isFillColor) {
        let offset = this._cumulativeOffset(e.target);
        //
        let he = this._colorPicker.hostElement;
        he.style.display = 'inline';
        he.style.left = offset.left + 'px';
        he.style.top = offset.top - he.clientHeight - 5 + 'px';
        he.focus();
        //
        this._applyFillColor = isFillColor;
    }
    //
    // Update the selection object of the scope.
    _updateSelection(fs, sel) {
        let rCnt = fs.rows.length, cCnt = fs.columns.length, fontIdx = 0, fontSizeIdx = 5;
        //
        this._updatingSelection = true;
        //
        if (sel.row > -1 && sel.col > -1 && rCnt > 0 && cCnt > 0 && sel.col < cCnt && sel.col2 < cCnt && sel.row < rCnt && sel.row2 < rCnt) {
            let cellContent = fs.getCellData(sel.row, sel.col, false), cellStyle = fs.selectedSheet.getCellStyle(sel.row, sel.col), cellFormat;
            //
            if (cellStyle) {
                fontIdx = this._checkFontfamily(cellStyle.fontFamily);
                fontSizeIdx = this._checkFontSize(cellStyle.fontSize);
                cellFormat = cellStyle.format;
            }
            //
            let format;
            if (!!cellFormat) {
                format = cellFormat;
            }
            else {
                if (wijmo.isInt(cellContent)) {
                    format = '0';
                }
                else if (wijmo.isNumber(cellContent)) {
                    format = 'n2';
                }
                else if (wijmo.isDate(cellContent)) {
                    format = 'd';
                }
            }
            //
            let state = fs.getSelectionFormatState();
            this.setState({
                isBold: state.isBold,
                isItalic: state.isItalic,
                isUnderline: state.isUnderline,
                textAlign: state.textAlign,
                fontIdx: fontIdx,
                fontSizeIdx: fontSizeIdx
            });
        }
        //
        this._updatingSelection = false;
    }
    //
    // check font family for the font name combobox of the ribbon.
    _checkFontfamily(value) {
        let fonts = this._fonts;
        //
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
    _checkFontSize(value) {
        let sizeList = this._fontSizeList;
        //
        if (value == null) {
            return 5;
        }
        //
        for (let index = 0; index < sizeList.length; index++) {
            let size = sizeList[index];
            if (size.value === value || size.name === value) {
                return index;
            }
        }
        //
        return 5;
    }
    //
    // Get the absolute position of the dom element.
    _cumulativeOffset(element) {
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
}
//
ReactDOM.render(<App />, document.getElementById('app'));
