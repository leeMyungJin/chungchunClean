import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { RestCollectionViewOData } from './rest-collection-view-odata';
import { CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // Northwind OData service
    let urlOData = 'https://services.odata.org/V4/Northwind/Northwind.svc';
    // fields and columns to show
    let fields = 'CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax'.split(',');
    // create the grid to show the data
    let theGrid = new FlexGrid('#theGrid', {
        isReadOnly: true,
        showMarquee: true,
        selectionMode: 'MultiRange',
        deferResizing: true,
        alternatingRowStep: 0,
        // create RestCollectionViewOData
        itemsSource: new RestCollectionViewOData(urlOData, 'Customers', {
            fields: fields,
            pageSize: 8,
            sortDescriptions: ['CustomerID']
        })
    });
    // auto-number row headers
    theGrid.topLeftCells.columns[0].cellTemplate = $ => $.text || ($.row.index + 1).toString();
    // add the filter
    new FlexGridFilter(theGrid);
    // add the navigator
    new CollectionViewNavigator('#theNavigator', {
        cv: theGrid.collectionView,
        byPage: true
    });
    // toggle pagination
    document.getElementById('paging').addEventListener('click', e => {
        let paging = e.target.checked, view = theGrid.collectionView;
        view.pageSize = paging ? 8 : 0;
    });
}
