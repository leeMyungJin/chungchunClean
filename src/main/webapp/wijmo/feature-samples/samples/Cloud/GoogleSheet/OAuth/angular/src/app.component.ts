import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//
import { GoogleSheet, Sheet, OAuth2 } from  '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition } from  '@grapecity/wijmo';
import { FlexGrid, DataMap } from  '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
   
export class AppComponent {
    products: Sheet;
    user: any;
    _auth: any;

    constructor() {

        // create the GoogleSheet data source
        let gs = new GoogleSheet(SHEET_ID_NW, API_KEY, {
            sheets: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose products
        this.products = gs.getSheet('Products');
    }

    // hook up auth button
    ngAfterViewInit() {

        // create the OAuth2 component
        const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
        const SCOPES = [ 'https://www.googleapis.com/auth/userinfo.email' ];
        let auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
            error: (s: any, e: any) => {
                console.log(JSON.stringify(e.error, null, 2));
            }
        });

        // button to log in/out
        let oAuthBtn = document.getElementById('auth-btn'),
            oAuthTip = new Tooltip({
                cssClass: 'auth-tip',
                position: PopupPosition.BelowRight,
                gap: 0
            });

        // click button to log user in or out
        oAuthBtn.addEventListener('click', () => {
            if (auth.user) {
                auth.signOut();
            } else {
                auth.signIn();
            }
        });

        // update button/sheet state when user changes
        auth.userChanged.addHandler((s: OAuth2) => {
            this.user = s.user;
            oAuthBtn.textContent = s.user ? 'Sign Out' : 'Sign In';
            oAuthTip.setTooltip(oAuthBtn, s.user
                ? `<b>Signed in as</b><br/>
                    ${s.user.firstName}<br/>
                    <img src="${s.user.imageUrl}"/><br/>
                    <span class="e-mail">${s.user.eMail}</span>`
                : null);
        
            // update GoogleSheet access token
            this.products.googleSheet.accessToken = s.user ? s.accessToken : null;

            // update message
            document.getElementById('auth-msg').textContent = s.user
                ? 'You are signed in, so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        });
    }

    // assign data maps to grid columns
    loadedRows(s: FlexGrid) {
        let gs = this.products.googleSheet;
        let categoryCol = s.getColumn('CategoryID');
        if (categoryCol && !categoryCol.dataMap) {
            categoryCol.header = 'Category';
            categoryCol.width = 200;
            categoryCol.dataMap = new DataMap(gs.getSheet('Categories'), 'CategoryID', 'CategoryName');
        }
        let supplierCol = s.getColumn('SupplierID');
        if (supplierCol && !supplierCol.dataMap) {
            supplierCol.header = 'Supplier';
            supplierCol.width = 200;
            supplierCol.dataMap = new DataMap(gs.getSheet('Suppliers'), 'SupplierID', 'CompanyName');
        }
    }

}
//
@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

