import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { RestCollectionViewFirestore } from './rest-collection-view-firestore';
import { isNumber } from '@grapecity/wijmo';
import { CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
import { OAuth2 } from '@grapecity/wijmo.cloud';
//
// Firestore info
const PROJECT_ID = 'test-9c0be';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
//
// field info for Customers table
const fields = 'CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax'.split(',');
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the grid to show the data
    let theGrid = new FlexGrid('#theGrid', {
        allowAddNew: true,
        allowDelete: true,
        showMarquee: true,
        selectionMode: 'MultiRange',
        deferResizing: true,
        alternatingRowStep: 0,
        isReadOnly: true,
        // create RestCollectionViewFirestore
        itemsSource: new RestCollectionViewFirestore(PROJECT_ID, API_KEY, 'Customers', {
            fields: fields,
            pageSize: 8,
            sortDescriptions: ['CustomerID'],
        })
    });
    // auto-number row headers
    theGrid.topLeftCells.columns[0].cellTemplate = $ => $.text || ($.row.index + 1).toString();
    // add the filter
    new FlexGridFilter(theGrid);
    // add the navigator
    let nav = new CollectionViewNavigator('#theNavigator', {
        cv: theGrid.collectionView,
        byPage: true
    });
    // update navigator header
    let cv = theGrid.collectionView;
    cv.collectionChanged.addHandler(() => updateHeader(cv, nav));
    cv.pageChanged.addHandler((s, e) => {
        updateHeader(cv, nav);
    });
    // toggle pagination
    document.getElementById('paging').addEventListener('click', e => {
        let paging = e.target.checked, view = theGrid.collectionView;
        view.pageSize = paging ? 8 : 0;
    });
    // handle authorization (login/out)
    const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
    let auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES);
    // button to log in/out
    let oAuthBtn = document.getElementById('auth-btn');
    // click button to log user in or out
    oAuthBtn.addEventListener('click', () => {
        if (auth.user) {
            auth.signOut();
        }
        else {
            auth.signIn();
        }
    });
    // update button/sheet state when user changes
    auth.userChanged.addHandler(s => {
        let user = s.user;
        oAuthBtn.textContent = user ? 'Sign Out' : 'Sign In';
        // apply OAuth id token to the RestCollectionViewFirestore
        let fireStoreCV = theGrid.collectionView;
        fireStoreCV.idToken = s.idToken;
        // make the grid read-only if the user is not signed in
        theGrid.isReadOnly = user == null;
        // update message
        document.getElementById('msg').innerHTML = user
            ? 'You are signed in as [<b>' + user.eMail + '</b>], so you may edit the grid (if you have permissions).'
            : 'You are not signed in, so you cannot edit the grid.';
    });
}
//
// update CollectionViewNavigator header
function updateHeader(cv, nav) {
    let tot = cv.totalItemCount;
    nav.headerFormat = isNumber(tot) && tot < 10000
        ? '{current:n0} / {count:n0}'
        : '{current:n0}';
}
