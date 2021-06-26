<template>
    <div class="container-fluid">
        <h2>FlexGrid Validation</h2>
        <p>
            When you use the <b>CollectionView.getError</b> method for validation,
            the <b>FlexGrid</b> will show errors in data cells and also in the
            row header cells.
        </p>
        <p>
            By default, the row header cells will show all the errors in the item.
            To customize that behavior, return the error message you want to show
            for the row header when <b>getError</b> is called without a specific
            property (prop == null).
        </p>
        <p>
            Try entering an invalid country or a negative number to see how the grid
            identifies the error and prevents the invalid entry from being committed:
        </p>
        <wj-flex-grid :itemsSource="view"></wj-flex-grid>

        <h2>Forms Validation</h2>
        <p>
            You can use the the
            <b>CollectionView.getError</b> property to validate forms as well. Simply call the function
            and apply the result to the appropriate input element using the
            <b>setCustomValidity</b> method that is part of
            the HTML5 validation API:
        </p>
        <form id="theForm" class="form-inline" @input="validateForm($event.target)" @submit="$event.preventDefault()">
            <div class="form-group">
                <label for="country">Country</label>
                <input id="country" type="text" class="form-control" required value="US">
            </div>

            <div class="form-group">
                <label for="downloads">Downloads</label>
                <input id="downloads" type="number" class="form-control" required value="123">
            </div>

            <div class="form-group">
                <label for="sales">Sales</label>
                <input id="sales" type="number" class="form-control" required value="123">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as wijmo from "@grapecity/wijmo";
    import { getData, countries } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                theItem: {},
                view: new wijmo.CollectionView(getData(), {
                    sortDescriptions: ["country"],
                    getError: this.getError,
                })
            };
        },
        methods: {
            validateForm: function(input) {
                let propName = input.id;
                //
                this.theItem[propName] = input.value;
                input.setCustomValidity(this.view.getError(this.theItem, propName));
            },
            getError(item, propName) {
                switch (propName) {
                    case 'country':
                        return countries.indexOf(item.country) < 0 ? 'Invalid Country' : '';
                    case 'downloads':
                    case 'sales':
                    case 'expenses':
                        return item[propName] < 0 ? 'Negative values not allowed!' : '';
                    case 'active':
                        return item.active && item.country.match(/^(US|Germany)$/)
                            ? 'Active items not allowed in the US or Germany!'
                            : '';
                    case null:
                        let errors = [];
                        for (let key in item) {
                            let err = this.getError(item, key);
                            if (err) errors.push(err);
                        }
                        return errors.length > 1
                            ? 'this item has ' + errors.length + ' errors'
                            : (errors.length == 1 ? errors[0] : null);
                }
                return null;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .form-group {
        margin-right: 8px;
    }

    .form-group > label {
        margin-right: 3px;
    }

    .form-group input:invalid {
        border-color: red;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(255,0,0,.6);    
    }
</style>