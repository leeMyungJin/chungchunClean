import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Firestore } from '@grapecity/wijmo.cloud';
import { ComboBox } from '@grapecity/wijmo.input';
import { FlexGrid, DataMap } from '@grapecity/wijmo.grid';
import { FlexChart } from '@grapecity/wijmo.chart';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the Firestore data source
    const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
    const PROJECT_ID = 'test-9c0be';
    let fireStore = new Firestore(PROJECT_ID, API_KEY, {
        collections: ['Products', 'Categories', 'Suppliers']
    });
    // add a ComboBox so users can see and select product categories:
    new ComboBox('#categoryCombo', {
        placeholder: '(All Categories)',
        isRequired: false,
        displayMemberPath: 'CategoryName',
        itemsSource: fireStore.getCollection('Categories'),
        selectedIndexChanged: (s, e) => {
            let cat = s.selectedItem;
            fireStore.getCollection('Products').filter = item => {
                return cat == null || cat.CategoryID == item.CategoryID;
            };
        }
    });
    // show products for the selected category as a grid
    let supplierMap = new DataMap(fireStore.getCollection('Suppliers'), 'SupplierID', 'CompanyName');
    new FlexGrid('#productGrid', {
        selectionMode: 'MultiRange',
        showMarquee: true,
        isReadOnly: true,
        autoGenerateColumns: false,
        columns: [
            { binding: 'ProductName', header: 'Product Name', width: 200 },
            { binding: 'UnitPrice', header: 'Unit Price', format: 'n2' },
            { binding: 'QuantityPerUnit', header: 'Quantity Per Unit', width: 150 },
            { binding: 'SupplierID', header: 'Supplier', dataMap: supplierMap, width: 200 },
            { binding: 'UnitsInStock', header: 'In Stock', format: 'n0' },
            { binding: 'UnitsOnOrder', header: 'On Order', format: 'n0' },
        ],
        itemsSource: fireStore.getCollection('Products')
    });
    // show products for the selected category as a chart
    new FlexChart('#productChart', {
        chartType: 'Bar',
        axisX: { majorGrid: true, axisLine: false },
        axisY: { majorGrid: false, axisLine: false, reversed: true },
        legend: { position: 'Bottom' },
        bindingX: 'ProductName',
        series: [
            { binding: 'UnitPrice', name: 'Product Unit Prices (US$)' }
        ],
        itemsSource: fireStore.getCollection('Products')
    });
}
