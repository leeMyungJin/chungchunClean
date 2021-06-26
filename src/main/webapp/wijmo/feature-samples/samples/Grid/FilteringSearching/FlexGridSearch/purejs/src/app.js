import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridSearch } from '@grapecity/wijmo.grid.search';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
import { Globalize } from '@grapecity/wijmo';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the grid
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    // create the grid search box
    new FlexGridSearch('#theSearch', {
        placeholder: 'FlexGridSearch',
        grid: theGrid
    });
    // show that the FlexGridSearch works with the FlexGridFilter class
    new FlexGridFilter(theGrid);
    // show filtered item count now and when the filter is applied
    updateItemCount();
    theGrid.collectionView.collectionChanged.addHandler(() => {
        updateItemCount();
    });
    function updateItemCount() {
        let cnt = theGrid.collectionView.items.length;
        document.getElementById('item-count').textContent = Globalize.format(cnt, 'n0');
    }
    // generate some random data
    function getData() {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cars,Stereos'.split(','), colors = 'Red,Green,Blue,Black,White,Yellow'.split(','), data = [];
        for (var i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: pickOne(countries),
                product: pickOne(products),
                color: pickOne(colors),
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
            });
        }
        return data;
    }
    function pickOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
