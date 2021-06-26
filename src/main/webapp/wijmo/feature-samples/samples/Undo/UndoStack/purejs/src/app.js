import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { UndoStack } from '@grapecity/wijmo.undo';
import { ComboBox, InputNumber, InputDate, AutoComplete, MultiSelect, MultiAutoComplete } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { RadialGauge, NeedleLength, NeedleShape, ShowText } from '@grapecity/wijmo.gauge';
import { CellRangeEventArgs } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create controls
    new ComboBox('#country', {
        itemsSource: getCountries(),
        isRequired: false,
        selectedIndex: -1
    });
    new InputNumber('#amount', {
        format: 'c2',
        min: 0,
        step: 10,
        isRequired: false,
        value: null
    });
    new InputDate('#date', {
        isRequired: false,
        value: null
    });
    new ComboBox('#color', {
        itemsSource: getColors(),
        isRequired: false,
        selectedIndex: -1
    });
    new AutoComplete('#ac', {
        itemsSource: getColors(),
        selectedIndex: -1
    });
    new MultiSelect('#colors', {
        itemsSource: getColors()
    });
    new MultiAutoComplete('#mac', {
        itemsSource: getColors(),
        selectedIndex: -1
    });
    new RadialGauge('#gauge', {
        thickness: .2,
        min: 0,
        max: 100,
        value: 50,
        isReadOnly: false,
        tickSpacing: 10,
        showTicks: true,
        showText: ShowText.Value,
        needleShape: NeedleShape.Outer,
        needleLength: NeedleLength.Inner
    });
    // add a grid
    let g = new FlexGrid('#grid', {
        anchorCursor: true,
        frozenColumns: 2,
        allowAddNew: true,
        allowDelete: true,
        itemsSource: getData(),
    });
    // add some data maps
    let col = g.getColumn('name');
    col.dataMap = getNames();
    col.dataMap.isEditable = true;
    col = g.getColumn('country');
    col.dataMap = getCountries();
    // add/delete grid rows in code
    document.getElementById('add-row').addEventListener('click', (e) => {
        g.focus();
        let view = g.editableCollectionView;
        let newItem = view.addNew();
        newItem.id = -1;
        newItem.name = 'new item';
        newItem.active = true;
        g.onRowAdded(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
        view.commitNew();
        e.preventDefault(); // don't submit the form
    });
    document.getElementById('del-row').addEventListener('click', (e) => {
        g.focus();
        let view = g.editableCollectionView;
        if (view.items.length) {
            let sel = g.selection;
            if (sel.row > -1) {
                let item = g.rows[sel.row].dataItem;
                g.onDeletingRow(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
                view.remove(item);
            }
        }
        e.preventDefault(); // don't submit the form
    });
    document.getElementById('nr-top').addEventListener('click', (e) => {
        g.newRowAtTop = e.target.checked;
    });
    // create undo/redo buttons
    let btnUndo = document.getElementById('undo');
    let btnRedo = document.getElementById('redo');
    let btnClear = document.getElementById('clear');
    let cnt = document.getElementById('undo-cnt');
    // create undo stack
    let undoStack = new UndoStack('#undoable-form', {
        maxActions: 50,
        stateChanged: (s) => {
            btnUndo.disabled = !s.canUndo;
            btnRedo.disabled = !s.canRedo;
            btnClear.disabled = !s.actionCount;
            cnt.textContent = s.actionCount.toString();
        },
    });
    // hook up undo/redo/clear buttons
    btnUndo.addEventListener('click', () => {
        undoStack.undo();
    });
    btnRedo.addEventListener('click', () => {
        undoStack.redo();
    });
    btnClear.addEventListener('click', () => {
        undoStack.clear();
    });
    // create some data
    function getColors() {
        return 'Black,Blue,Brown,Green,Magenta,Orange,Pink,Purple,Red,Teal,Violet,White,Yellow'.split(',');
    }
    function getCountries() {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }
    function getNames() {
        return 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(',');
    }
    function getData() {
        let countries = getCountries(), names = getNames(), data = [];
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
