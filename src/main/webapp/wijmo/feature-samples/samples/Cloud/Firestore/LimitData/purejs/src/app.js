import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Firestore, Collection } from '@grapecity/wijmo.cloud';
import { ComboBox, CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the Firestore data source
    const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
    const PROJECT_ID = 'test-9c0be';
    const fireStore = new Firestore(PROJECT_ID, API_KEY);
    // load the Customers collection (selected fields, server-side paging)
    const countries = 'Brazil,France,Germany,UK,USA'.split(',');
    const customers = new Collection(fireStore, 'Customers', {
        sortDescriptions: ['CustomerID'],
        fields: [
            'CustomerID',
            'CompanyName',
            'ContactName',
            'City',
            'Country'
        ],
        pageSize: 6,
        pageOnServer: true
    }).where('Country', '==', countries[0]);
    // filter the Collection by country
    new ComboBox('#cmbCountries', {
        itemsSource: countries,
        textChanged: (s, e) => {
            customers.where('Country', '==', s.text);
            customers.moveToFirstPage();
        }
    });
    // navigate the Collection by page
    new CollectionViewNavigator('#fsCustomerPager', {
        cv: customers,
        byPage: true,
        headerFormat: 'Page {current:n0}'
    });
    // show the filtered/paged customers
    new FlexGrid('#fsCustomerGrid', {
        selectionMode: 'MultiRange',
        showMarquee: true,
        isReadOnly: true,
        autoGenerateColumns: false,
        columns: customers.fields.map(fld => {
            return { binding: fld };
        }),
        itemsSource: customers
    });
}
