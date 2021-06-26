import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Snapshot } from '@grapecity/wijmo.cloud';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { isIE, isSafari, createElement } from '@grapecity/wijmo';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // Chrome and Safari are not supported
    if (isIE() || isSafari()) {
        createElement(`
            <h4>
                IE and Safari are not supported
            </h4>
            <p>
                Sorry, this sample requires features that are not available in IE or Safari.
                Please try it in Chrome, Firefox, or Edge.
            </p>
            <p>
                Running the firestore client libraries in IE or Safari is possible, but
                requires a polyfill. For more information, please see 
                <a href="https://firebase.google.com/support/guides/environments_js-sdk">
                Supported environments for the Firebase JavaScript SDK</a>.
            </p>
        `, document.body);
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
    const snapshot = new Snapshot(restaurants, {
    //query: restaurants.where('type', 'in', ['Japanese', 'German' ]),
    //deferCommits: true,
    //pageSize: 5
    });
    // show the data in a FlexGrid
    new FlexGrid('#theGrid', {
        isReadOnly: true,
        selectionMode: 'MultiRange',
        showMarquee: true,
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID' },
            { binding: 'name', header: 'Name' },
            { binding: 'type', header: 'Type' },
        ],
        itemsSource: snapshot
    });
}
