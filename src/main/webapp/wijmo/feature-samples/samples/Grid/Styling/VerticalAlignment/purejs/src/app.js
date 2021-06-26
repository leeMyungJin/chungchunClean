import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // column properties
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', },
            { binding: 'product', header: 'Product', },
            { binding: 'sales', header: 'Sales', format: 'c0' },
            { binding: 'expenses', header: 'Expenses', format: 'c0' },
            { binding: 'active', header: 'Active' }
        ],
        itemsSource: getData()
    });
    //
    // make rows taller to show the vertical alignment
    theGrid.rows.defaultSize = 45;
    theGrid.columnHeaders.rows.defaultSize = 65;
    theGrid.allowResizing = wjGrid.AllowResizing.Both;
    theGrid.deferResizing = true;
}
