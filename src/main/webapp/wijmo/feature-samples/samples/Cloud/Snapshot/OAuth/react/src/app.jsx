import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Snapshot, OAuth2 } from '@grapecity/wijmo.cloud';
import { Tooltip, PopupPosition, isIE, isSafari } from '@grapecity/wijmo';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        // IE and Safari are not supported
        if (isIE() || isSafari()) {
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
        // expose snapshot
        this.state = {
            snapshot: snapshot,
            isReadOnly: true
        };
    }
    componentDidMount() {
        // IE and Safari are not supported
        if (isIE() || isSafari()) {
            return;
        }
        // create the OAuth2 component
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
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
            // Sign in with credential from the Google user.
            // https://firebase.google.com/docs/auth/web/google-signin
            const firebase = window['firebase'];
            if (firebase.auth) {
                if (user) {
                    let credential = firebase.auth.GoogleAuthProvider.credential(s.idToken);
                    firebase.auth().signInWithCredential(credential)
                        .then(() => {
                        console.log('logged in ok');
                    })
                        .catch(error => {
                        console.log('log in failed:', error);
                    });
                }
                else {
                    firebase.auth().signOut();
                }
            }
            // allow editing if we are authenticated
            this.setState({
                isReadOnly: !user
            });
            // update message
            document.getElementById('auth-msg').textContent = user
                ? 'You are signed in, so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        });
    }
    render() {
        if (!isIE() && !isSafari()) {
            return <div className='container-fluid'>
                <div className="auth">
                    <div id="auth-msg"></div>
                    <button id="auth-btn" className="btn btn-primary">
                        Sign In
                    </button>
                </div>
                <FlexGrid selectionMode="MultiRange" showMarquee={true} isReadOnly={this.state.isReadOnly} itemsSource={this.state.snapshot}>
                    <FlexGridColumn binding="id" header="ID"/>
                    <FlexGridColumn binding="name" header="Name"/>
                    <FlexGridColumn binding="type" header="Type"/>
                </FlexGrid>
            </div>;
        }
        else {
            return <div className='container-fluid'>
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
            </div>;
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
