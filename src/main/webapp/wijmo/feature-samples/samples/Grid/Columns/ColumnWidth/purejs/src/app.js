import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let data = getData(50);
    let theFirstGrid = new FlexGrid('#theFirstGrid', {
        autoClipboard: false,
        autoGenerateColumns: false,
        columns: [
            { binding: 'start', header: 'Date', width: 80, minWidth: 40, maxWidth: 160 },
            { binding: 'product', header: 'Product', width: '2*', allowResizing: false },
            { binding: 'amount', header: 'Revenue', format: 'n0', width: '*', allowResizing: false },
            { binding: 'amount2', header: 'Expense', format: 'n0', width: '*', allowResizing: false
            }
        ],
        itemsSource: data
    });
    let theSecondGrid = new FlexGrid('#theSecondGrid', {
        autoClipboard: false,
        autoGenerateColumns: false,
        columns: [
            { binding: 'start', header: 'Date', width: 80 },
            { binding: 'product', header: 'Product', width: '*', minWidth: 100, allowResizing: false },
            { binding: 'amount', header: 'Revenue', format: 'n0', width: 120 }
        ],
        itemsSource: data
    });
    let theThirdGrid = new FlexGrid('#theThirdGrid', {
        autoClipboard: false,
        autoGenerateColumns: false,
        allowResizing: 'None',
        columns: [
            { binding: 'start', header: 'Date', width: '*' },
            { binding: 'product', header: 'Product', width: '*', minWidth: 100 },
            { binding: 'amount', header: 'Revenue', format: 'n0', width: '*' },
            { binding: 'amount2', header: 'Expense', format: 'n0', width: '*' }
        ],
        itemsSource: data
    });
}
