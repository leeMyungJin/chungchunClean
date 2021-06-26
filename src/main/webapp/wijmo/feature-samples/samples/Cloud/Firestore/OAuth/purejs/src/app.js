import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Firestore, OAuth2 } from '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition, SortDescription } from '@grapecity/wijmo';
import { FlexGrid, DataMap } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the Firestore data source
    const PROJECT_ID = 'test-9c0be';
    const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
    let fireStore = new Firestore(PROJECT_ID, API_KEY, {
        collections: ['Products', 'Categories', 'Suppliers']
    });
    // get products and data maps
    let products = fireStore.getCollection('Products');
    products.sortDescriptions.push(new SortDescription('ProductID', true));
    let mapCat = new DataMap(fireStore.getCollection('Categories'), 'CategoryID', 'CategoryName');
    let mapSup = new DataMap(fireStore.getCollection('Suppliers'), 'SupplierID', 'CompanyName');
    // show products as a grid
    let theGrid = new FlexGrid('#productGrid', {
        selectionMode: 'MultiRange',
        showMarquee: true,
        isReadOnly: true,
        allowAddNew: true,
        allowDelete: true,
        autoGenerateColumns: false,
        columns: [
            { binding: 'ProductID', header: 'ID' },
            { binding: 'ProductName', header: 'Product Name', width: 200, },
            { binding: 'CategoryID', header: 'Category', width: 150, dataMap: mapCat },
            { binding: 'SupplierID', header: 'Supplier', width: 150, dataMap: mapSup },
            { binding: 'UnitPrice', header: 'Unit Price', format: 'n2' },
            { binding: 'QuantityPerUnit', header: 'Qty per Unit', width: 150 },
            { binding: 'UnitsInStock', header: 'Units in Stock' },
            { binding: 'Discontinued' }
        ],
        itemsSource: products
    });
    // create the OAuth2 component
    const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
    const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
    let auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES);
    // button to log in/out
    let oAuthBtn = document.getElementById('auth-btn'), oAuthTip = new Tooltip({
        cssClass: 'auth-tip',
        position: PopupPosition.BelowRight,
        gap: 0
    });
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
        oAuthTip.setTooltip(oAuthBtn, user
            ? `<b>Signed in as</b><br/>
                ${user.firstName}<br/>
                <img src="${user.imageUrl}"/><br/>
                <span class="e-mail">${user.eMail}</span>`
            : null);
        // update Firestore id token
        fireStore.idToken = user ? s.idToken : null; // Firestore authentication
        //fireStore.accessToken = user ? s.accessToken : null; // IAM authentication
        // allow editing if we are authenticated
        theGrid.isReadOnly = !user;
        // update message
        document.getElementById('auth-msg').textContent = user
            ? 'You are signed in, so you may edit the grid (if you have permissions).'
            : 'You are not signed in, so you cannot edit the grid.';
    });
}
