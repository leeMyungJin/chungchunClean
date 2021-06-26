import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//
import { Firestore, Collection, OAuth2 } from  '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition, SortDescription } from  '@grapecity/wijmo';
import { DataMap } from  '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
   
export class AppComponent {
    products: Collection;
    mapCat: DataMap;
    mapSup: DataMap;
    user: any;

    constructor() {

        // create the Firestore data source
        const PROJECT_ID = 'test-9c0be';
        let fs = new Firestore(PROJECT_ID, API_KEY, {
            collections: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose products and data maps
        this.products = fs.getCollection('Products');
        this.products.sortDescriptions.push(new SortDescription('ProductID', true));
        this.mapCat = new DataMap(fs.getCollection('Categories'), 'CategoryID', 'CategoryName');
        this.mapSup = new DataMap(fs.getCollection('Suppliers'), 'SupplierID', 'CompanyName');
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
        
            // update Firestore id token
            this.products.store.idToken = s.user ? s.idToken : null; // Firestore authentication
            //this.products.store.accessToken = s.user ? s.accessToken : null; // IAM authentication

            // update message
            document.getElementById('auth-msg').textContent = s.user
                ? 'You are signed in, so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        });
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

