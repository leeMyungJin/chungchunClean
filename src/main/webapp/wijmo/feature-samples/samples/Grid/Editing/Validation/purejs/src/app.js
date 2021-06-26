import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { changeType, DataType, isNumber } from '@grapecity/wijmo';
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
    // event-based validation
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50, isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' },
            { binding: 'overdue', header: 'Overdue' }
        ],
        cellEditEnding: function (s, e) {
            var col = s.columns[e.col];
            if (col.binding == 'sales' || col.binding == 'expenses') {
                var value = changeType(s.activeEditor.value, DataType.Number, col.format);
                if (!isNumber(value) || value < 0) {
                    e.cancel = true;
                    e.stayInEditMode = true;
                    alert('Please enter a positive amount.');
                }
            }
        }
    });
}
