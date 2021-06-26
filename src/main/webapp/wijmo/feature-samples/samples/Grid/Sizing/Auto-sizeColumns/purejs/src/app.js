import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // show the data in a grid with fixed height
    var theGrid = new FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', minWidth: 60, isReadOnly: true },
            { binding: 'countries', header: 'Countries' },
            { binding: 'sales', header: 'Sales', minWidth: 80 },
            { binding: 'expenses', header: 'Expenses', minWidth: 80 }
        ],
        loadedRows: function (s, e) {
            s.autoSizeColumns();
        },
        cellEditEnded: function (s, e) {
            s.autoSizeColumn(e.col);
        },
        rowEditEnded: function (s, e) {
            s.autoSizeColumns();
        },
        itemsSource: getData(),
        allowResizing: 'None'
    });
    theGrid.autoSizeColumns();
}
