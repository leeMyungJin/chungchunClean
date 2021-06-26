<template>
    <div class="container-fluid">
        <div class="auth">
            <div id="auth-msg"></div>
            <button id="auth-btn" class="btn btn-primary">
                Sign In
            </button>
        </div>
        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :isReadOnly="!user"
            :autoGenerateColumns="false"
            :itemsSource="products">
            <wj-flex-grid-column binding="ProductID" header="ID" />
            <wj-flex-grid-column binding="ProductName" header="Product Name" :width="200" />
            <wj-flex-grid-column binding="CategoryID" header="Category" :width="150" :dataMap="mapCat" />
            <wj-flex-grid-column binding="SupplierID" header="Supplier" :width="150" :dataMap="mapSup" />
            <wj-flex-grid-column binding="UnitPrice" header="Unit Price" format="n2" />
            <wj-flex-grid-column binding="QuantityPerUnit" header="Qty per Unit" :width="150" />
            <wj-flex-grid-column binding="UnitsInStock" header="Units in Stock" />
            <wj-flex-grid-column binding="Discontinued" />
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { Firestore, OAuth2 } from "@grapecity/wijmo.cloud";
import { Tooltip, PopupPosition, SortDescription } from "@grapecity/wijmo";
import { DataMap } from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";

const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';

new Vue({
    el: "#app",
    data: function() {

        // create the Firestore data source
        const PROJECT_ID = 'test-9c0be';
        let fs = new Firestore(PROJECT_ID, API_KEY, {
            collections: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose products, data maps, current user
        let products = fs.getCollection('Products');
        products.sortDescriptions.push(new SortDescription('ProductID', true));
        let mapCat = new DataMap(fs.getCollection('Categories'), 'CategoryID', 'CategoryName');
        let mapSup = new DataMap(fs.getCollection('Suppliers'), 'SupplierID', 'CompanyName');
        return {
            products: products,
            mapCat: mapCat,
            mapSup: mapSup,
            user: null
        };
    },
    mounted: function() {

        // create the OAuth2 component
        const CLIENT_ID = '60621001861-h0u4ek4kmd3va9o2bubhq9ean0bgrhu2.apps.googleusercontent.com';
        const SCOPES = [ 'https://www.googleapis.com/auth/userinfo.email' ];
        const auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
            error: (s, e) => {
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
        auth.userChanged.addHandler(s => {
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
});
</script>

<style>
    .wj-flexgrid {
        height: 350px;
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