import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Tooltip, format } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
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
    var tt = new Tooltip();
    //
    // show the data in a grid
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        resizingColumn: function (s, e) {
            var cell = s.columnHeaders.getCellElement(0, e.col);
            var col = e.panel.columns[e.col];
            var tip = format('Column: <b>{col}</b>, Width: <b>{wid:n0}px</b>', {
                col: col.header || '[no header]',
                wid: col.width
            });
            tt.show(cell, tip);
        },
        resizedColumn: function (s, e) {
            tt.hide();
        }
    });
}
