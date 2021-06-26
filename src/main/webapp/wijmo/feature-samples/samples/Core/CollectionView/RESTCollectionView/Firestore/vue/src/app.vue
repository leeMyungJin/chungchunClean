<template>
    <div className="container-fluid">

        <label>
            Paging
            <input id="paging"
                type="checkbox"
                :checked="view.pageSize > 0"
                v-on:click="view.pageSize = view.pageSize == 0 ? 8 : 0">
        </label>
        <button id="auth-btn" class="btn btn-primary" style="float:right"
            v-on:click="auth.user ? auth.signOut() : auth.signIn()">
            Sign In
        </button>

        <br />

        <wj-collection-view-navigator
                :cv="view"
                :byPage="true"
                headerFormat="{current:n0}"/>
        <wj-flex-grid
                :allowAddNew="true"
                :allowDelete="true"
                :showMarquee="true"
                :deferResizing="true"
                :alternatingRowStep="0"
                selectionMode="MultiRange"
                :itemsSource="view"
                :isReadOnly="isReadOnly"
                :initialized="initGrid">
                <wj-flex-grid-filter />
        </wj-flex-grid>

        <div v-html="msg"></div>

    </div >
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    //
    import Vue from 'vue';
    import "@grapecity/wijmo.vue2.grid";
    import "@grapecity/wijmo.vue2.grid.filter";
    import "@grapecity/wijmo.vue2.input";
    import { OAuth2 } from "@grapecity/wijmo.cloud";
    import { RestCollectionViewFirestore } from './rest-collection-view-firestore';
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
    new Vue({
        el: '#app',
        data: function () {
            return {
                msg: '',
                isReadOnly: true,
                view: new RestCollectionViewFirestore(PROJECT_ID, API_KEY, 'Customers', {
                    fields: fields,
                    pageSize: 8,
                    sortDescriptions: ['CustomerID'],
                }),
                auth: new OAuth2(API_KEY, CLIENT_ID, SCOPES, {
                    userChanged: (s) => {
                        let user = s.user;
                        let oAuthBtn = document.getElementById('auth-btn');

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
                }),
            }
        },
        methods: {
            initGrid: function(s) {
                s.topLeftCells.columns[0].cellTemplate = function($) {
                    return $.text || ($.row.index + 1).toString()
                }
            }
        }
    })
</script>

<style>
    body {
        margin-bottom: 36pt;
    }

    .wj-flexgrid {
        max-height: 400px;
    }
</style>