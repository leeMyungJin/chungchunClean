import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import { ODataCollectionView } from '@grapecity/wijmo.odata';
import { CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create ODataCollectionView to demonstrate server-based paging
    var url = 'https://services.odata.org/Northwind/Northwind.svc';
    var view = new ODataCollectionView(url, 'Customers', {
        pageSize: 6,
        pageOnServer: true,
        sortOnServer: true
    });
    //
    // create pager
    var pager = new CollectionViewNavigator('#thePager', {
        byPage: true,
        headerFormat: 'Page {currentPage:n0} of {pageCount:n0}',
        cv: view
    });
    //
    // show the data in a grid
    var grid = new FlexGrid('#theGrid', {
        itemsSource: view,
        alternatingRowStep: 0,
        headersVisibility: 'Column',
        isReadOnly: true // the Northwind sample service is read-only!
    });
}
