import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import { CollectionView } from '@grapecity/wijmo';
import { CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create an array with 1000 data items
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
    var data = [];
    for (var i = 0; i < 1000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    // create a paged CollectionView with 6 data items per page
    var view = new CollectionView(data, {
        pageSize: 6
    });
    // navigate the pages
    new CollectionViewNavigator('#thePager', {
        byPage: true,
        headerFormat: 'Page {currentPage:n0} of {pageCount:n0}',
        cv: view
    });
    // show the data in a grid
    new FlexGrid('#theGrid', {
        headersVisibility: 'Column',
        alternatingRowStep: 0,
        itemsSource: view,
    });
}
