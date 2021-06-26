import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { DataType } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (i + 1) % 4 == 0
        });
    }
    //
    // create the grid with custom editing behavior
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        gotFocus: s => startEditing(s),
        selectionChanged: s => startEditing(s)
    });
    function startEditing(grid) {
        let index = grid.selection.col, col = index > -1 ? grid.columns[index] : null;
        if (col && !col.isReadOnly && col.dataType != DataType.Boolean) {
            setTimeout(() => {
                grid.startEditing(false); // quick mode
            }, 50); // let the grid update first
        }
    }
}
