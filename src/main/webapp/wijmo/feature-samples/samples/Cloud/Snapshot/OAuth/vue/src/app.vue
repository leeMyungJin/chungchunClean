<template>
    <div class="container-fluid" v-if="snapshot">
        <div class="auth">
            <div id="auth-msg"></div>
            <button id="auth-btn" class="btn btn-primary">
                Sign In
            </button>
        </div>
        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :isReadOnly="isReadOnly"
            :itemsSource="snapshot">
            <wj-flex-grid-column binding="id" header="ID" />
            <wj-flex-grid-column binding="name" header="Name" />
            <wj-flex-grid-column binding="type" header="Type" />
        </wj-flex-grid>
    </div>
    <div class="container-fluid" v-else>
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
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { Tooltip, PopupPosition, isIE, isSafari } from "@grapecity/wijmo";
import { Snapshot, OAuth2 } from "@grapecity/wijmo.cloud";
import "@grapecity/wijmo.vue2.grid";

new Vue({
    el: "#app",
    data: function() {

        // IE and Safari are not supported
        if (isIE() || isSafari()) {
            return { snapshot: null };
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
        return {
            snapshot: snapshot,
            isReadOnly: true
        };
    },

    mounted: function() {
        
        // IE and Safari are not supported
        if (isIE() || isSafari()) {
            return;
        }

        // create the OAuth2 component
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
        const SCOPES = [ 'https://www.googleapis.com/auth/userinfo.email' ];
        let auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES);

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
                            this.isReadOnly = false;
                            console.log('logged in ok');
                        })
                        .catch(error => {
                            this.isReadOnly = true;
                            console.log('log in failed:', error);
                        });
                } else {
                    firebase.auth().signOut();
                    this.isReadOnly = true;
                }
            } else {
                this.isReadOnly = !user; // allow editing if we are authenticated
            }



            // update message
            document.getElementById('auth-msg').textContent = user
                ? 'You are signed in, so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        });
    }
});
</script>

<style>
    .wj-flexgrid {
        height: 300px;
    }

    .auth {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
    }

    .auth-tip {
        text-align: right;
        background: #fffacf8e;
        border-radius: 0;
    }

    .auth-tip .e-mail {
        font-size: 70%;
        font-style: italic;
    }
</style>