<template>
    <div class="container-fluid">

        <wj-combo-box
            :itemsSource="countries"
            :textChanged="countryChanged" />

        <wj-collection-view-navigator
            :cv="customers"
            :byPage="true"
            headerFormat="Page {current:n0}" />

        <wj-flex-grid
            selectionMode="MultiRange"
            :showMarquee="true"
            :isReadOnly="true"
            :itemsSource="customers">
            <wj-flex-grid-column binding="CustomerID" header="Customer ID" />
            <wj-flex-grid-column binding="CompanyName" header="Company Name" :width="200" />
            <wj-flex-grid-column binding="ContactName" header="Contact Name" :width="150" />
            <wj-flex-grid-column binding="City" />
            <wj-flex-grid-column binding="Country" />
        </wj-flex-grid>

    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import { Firestore, Collection } from "@grapecity/wijmo.cloud";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid";

new Vue({
    el: "#app",
    data: function() {

        // create the Firestore data source
        const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
        const PROJECT_ID = 'test-9c0be';
        const fireStore = new Firestore(PROJECT_ID, API_KEY);

        // load the Customers collection (selected fields, server-side paging)
        const countries = 'Brazil,France,Germany,UK,USA'.split(',');
        const customers = new Collection(fireStore, 'Customers', {
            sortDescriptions: ['CustomerID'],
            fields: [
                'CustomerID',
                'CompanyName',
                'ContactName',
                'City',
                'Country'
            ],
            pageSize: 6,
            pageOnServer: true
        }).where('Country', '==', countries[0]);

        // expose customers, countries
        return {
            customers: customers,
            countries: countries
        };
    },    
    methods: {

        // update filter when selected country changes
        countryChanged: function(countryCombo) {
            this.customers.where('Country', '==', countryCombo.text);
            this.customers.moveToFirstPage();
        }
    }
});
</script>

<style>
    .wj-flexgrid {
        margin: 1em 0;
    }

    .wj-combobox {
        margin-right: 1em;
    }
</style>