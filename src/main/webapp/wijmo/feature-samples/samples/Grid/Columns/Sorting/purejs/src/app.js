import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, AllowSorting } from '@grapecity/wijmo.grid';
import { ComboBox } from '@grapecity/wijmo.input';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // default behavior: single column sorting
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: getData(),
        allowSorting: AllowSorting.MultiColumn
    });
    // change the allowSorting value
    new ComboBox('#cmbSort', {
        itemsSource: 'None,SingleColumn,MultiColumn'.split(','),
        selectedIndex: 2,
        selectedIndexChanged: (s) => {
            theGrid.collectionView.sortDescriptions.clear();
            theGrid.allowSorting = s.selectedIndex;
        }
    });
}
// generate some random data
function getData() {
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            num1: Math.random() * 5000,
            num2: Math.random() * 5000,
            num3: Math.random() * 5000,
            num4: Math.random() * 5000,
            num5: Math.random() * 5000,
        });
    }
    return data;
}
