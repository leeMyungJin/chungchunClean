<template>
    <div class="container-fluid">
        <div class="auth">
            <div id="auth-msg"></div>
            <button id="auth-btn" class="btn btn-primary">
                Sign In
            </button>
        </div>
        <wj-flex-grid #grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :isReadOnly="!user"
            :itemsSource="products"
            :loadedRows="loadedRows">
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { GoogleSheet, OAuth2 } from "@grapecity/wijmo.cloud";
import { Tooltip, PopupPosition } from "@grapecity/wijmo";
import { DataMap } from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";

const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';

new Vue({
    el: "#app",
    data: function() {

        // create the GoogleSheet data source
        let gs = new GoogleSheet(SHEET_ID_NW, API_KEY, {
            sheets: [ 'Products', 'Categories', 'Suppliers' ]
        });

        // expose products, current user
        return {
            products: gs.getSheet('Products'),
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
        
            // update GoogleSheet access token
            this.products.googleSheet.accessToken = s.user ? s.accessToken : null;

            // update message
            document.getElementById('auth-msg').textContent = s.user
                ? 'You are signed in, so you may edit the grid (if you have permissions).'
                : 'You are not signed in, so you cannot edit the grid.';
        });

    },

    methods: {

        // assign data maps to grid columns
        loadedRows: function(grid) {
            let gs = this.products.googleSheet;
            let categoryCol = grid.getColumn('CategoryID');
            if (categoryCol && !categoryCol.dataMap) {
                categoryCol.header = 'Category';
                categoryCol.width = 200;
                categoryCol.dataMap = new DataMap(gs.getSheet('Categories'), 'CategoryID', 'CategoryName');
            }
            let supplierCol = grid.getColumn('SupplierID');
            if (supplierCol && !supplierCol.dataMap) {
                supplierCol.header = 'Supplier';
                supplierCol.width = 200;
                supplierCol.dataMap = new DataMap(gs.getSheet('Suppliers'), 'SupplierID', 'CompanyName');
            }
        }
    },
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