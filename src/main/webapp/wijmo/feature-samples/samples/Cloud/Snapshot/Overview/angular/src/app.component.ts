import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { Snapshot } from  '@grapecity/wijmo.cloud';
import { isIE, isSafari } from  '@grapecity/wijmo';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    snapshot: Snapshot;

    constructor() {

        // IE and Safari are not supported
        if (isIE() || isSafari()) {
            this.snapshot = null;
            return;
        }

        // initialize the Firestore web client libraries
        const firebaseConfig = {
            apiKey: "AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE",
            authDomain: "test-9c0be.firebaseapp.com",
            databaseURL: "https://test-9c0be.firebaseio.com",
            projectId: "test-9c0be",
            storageBucket: "test-9c0be.appspot.com",
            messagingSenderId: "60621001861",
            appId: "1:60621001861:web:41612ef8a472741dbd45ec"
        };
        const firebase = window['firebase'];
        firebase.initializeApp(firebaseConfig);

        // create the Snapshot
        const db = firebase.firestore();
        const restaurants = db.collection('restaurants');
        this.snapshot = new Snapshot(restaurants, {
            //query: restaurants.where('type', 'in', ['Japanese', 'German' ]),
            //deferCommits: true,
            //pageSize: 5
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

