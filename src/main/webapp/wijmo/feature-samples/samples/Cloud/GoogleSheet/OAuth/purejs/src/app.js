import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { GoogleSheet, OAuth2 } from '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
import { FlexGrid, DataMap } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the GoogleSheet data source
    const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
    const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
    let gsNWind = new GoogleSheet(SHEET_ID_NW, API_KEY, {
        sheets: ['Products', 'Categories', 'Suppliers']
    });
    // show products as a grid
    let theGrid = new FlexGrid('#productGrid', {
        selectionMode: 'MultiRange',
        showMarquee: true,
        isReadOnly: true,
        allowAddNew: true,
        allowDelete: true,
        itemsSource: gsNWind.getSheet('Products'),
        loadedRows: s => {
            // assign data maps to columns
            let categoryColumn = s.getColumn('CategoryID');
            if (categoryColumn && !categoryColumn.dataMap) {
                categoryColumn.header = 'Category';
                categoryColumn.width = 200;
                categoryColumn.dataMap = new DataMap(gsNWind.getSheet('Categories'), 'CategoryID', 'CategoryName');
            }
            let supplierColumn = s.getColumn('SupplierID');
            if (supplierColumn && !supplierColumn.dataMap) {
                supplierColumn.header = 'Supplier';
                supplierColumn.width = 200;
                supplierColumn.dataMap = new DataMap(gsNWind.getSheet('Suppliers'), 'SupplierID', 'CompanyName');
            }
        }
    });
    // create the OAuth2 component
    const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
    const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
    let auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
        error: (s, e) => {
            console.log(JSON.stringify(e.error, null, 2));
        }
    });
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
        // update GoogleSheet access token
        gsNWind.accessToken = user ? s.accessToken : null;
        // allow editing if we are authenticated
        theGrid.isReadOnly = !user;
        // update message
        document.getElementById('auth-msg').textContent = user
            ? 'You are signed in, so you may edit the grid (if you have permissions).'
            : 'You are not signed in, so you cannot edit the grid.';
    });
}
