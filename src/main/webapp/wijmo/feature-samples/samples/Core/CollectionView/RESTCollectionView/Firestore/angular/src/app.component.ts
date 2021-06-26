import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { RestCollectionViewFirestore } from './rest-collection-view-firestore';
import { OAuth2 } from '@grapecity/wijmo.cloud';
//
// Firestore info
const PROJECT_ID = 'test-9c0be';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
//
// field info for Customers table
const fields = 'CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax'.split(',');
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    msg = '';
    isReadOnly = true;
    view = new RestCollectionViewFirestore(PROJECT_ID, API_KEY, 'Customers', {
        fields: fields,
        pageSize: 8,
        sortDescriptions: ['CustomerID'],
    });
    auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
        userChanged: (s: any) => {
            let user = s.user;
            let oAuthBtn = document.getElementById('auth-btn') as HTMLButtonElement;

            // update button text
            oAuthBtn.textContent = user ? 'Sign Out' : 'Sign In';
    
            // apply OAuth id token to the RestCollectionViewFirestore
            this.view.idToken = s.idToken;

            // make the grid read-only if the user is not signed in
            this.isReadOnly = user == null;
    
            // update message
            this.msg = user
                ? 'You are signed in as [<b>' + user.eMail + '</b>], so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        }
    });

    // apply auto-numbering cell template
    initGrid(theGrid: any) {
        theGrid.topLeftCells.columns[0].cellTemplate = ($: any) => $.text || ($.row.index + 1).toString()        
    }

    // log in/out
    logInOut() {
        if (this.auth.user) {
            this.auth.signOut();
        } else {
            this.auth.signIn();
        }
    }
}
//
@NgModule({
    imports: [WjGridModule, WjGridFilterModule, WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

