import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo-core.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getCalculatedView } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // show a CollectionView with calculated fields on a grid
    new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        showMarquee: true,
        selectionMode: 'MultiRange',
        autoGenerateColumns: false,
        columns: [
            // regular data fields
            { binding: 'product', header: 'Product' },
            { binding: 'brand', header: 'Brand' },
            { binding: 'unitPrice', header: 'Unit Price', format: 'c' },
            { binding: 'qty', header: 'Quantity', format: 'n0' },
            { binding: 'discount', header: 'Discount', format: 'p0' },
            // calculated fields
            { binding: 'fullName', header: 'Full Name', cssClass: 'calculated' },
            { binding: 'allCaps', header: 'Uppercase', cssClass: 'calculated' },
            { binding: 'totalPrice', header: 'Total Price', format: 'c', cssClass: 'calculated' },
            { binding: 'tax', header: 'Tax Amount', format: 'c', cssClass: 'calculated' }
        ],
        itemsSource: getCalculatedView()
    });
}
