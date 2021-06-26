import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    let countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    let data = countries.map((country, index) => {
        return {
            id: index,
            country: country,
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (index + 1) % 4 == 0
        };
    });
    //
    // show the data in a grid
    let theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoClipboard: false,
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        beginningEdit: (s, e) => {
            let col = s.columns[e.col];
            if (col.binding != 'overdue') {
                let item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;
                    showMessage('Overdue items cannot be edited');
                }
            }
        },
        cellEditEnding: (s, e) => {
            showMessage('&nbsp;');
            let col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                let value = wjCore.changeType(s.activeEditor.value, wjCore.DataType.Number, col.format);
                if (!wjCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                    e.cancel = true;
                    showMessage('Please enter a positive amount');
                }
            }
        }
    });
    //
    // show log message
    let elLog = document.getElementById('log');
    function showMessage(msg) {
        elLog.innerHTML = msg;
    }
}
