<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
            :showMarquee="true"
            selectionMode="MultiRange"
            :autoGenerateColumns="false"
            :itemsSource="view">

            <!-- regular fields --> 
            <wj-flex-grid-column binding="product" header="Product" />
            <wj-flex-grid-column binding="brand" header="Brand" />
            <wj-flex-grid-column binding="unitPrice" header="Unit Price" format="c" />
            <wj-flex-grid-column binding="qty" header="Quantity" format="n0" />
            <wj-flex-grid-column binding="discount" header="Discount" format="p0" />

            <!-- calculated fields --> 
            <wj-flex-grid-column binding="fullName" header="Full Name" cssClass="calculated" />
            <wj-flex-grid-column binding="allCaps" header="Uppercase" cssClass="calculated" />
            <wj-flex-grid-column binding="totalPrice" header="Total Price" format="c" cssClass="calculated" />
            <wj-flex-grid-column binding="tax" header="Tax Amount" format="c" cssClass="calculated" />

        </wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as wijmo from "@grapecity/wijmo";
    import { getCalculatedView } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                view: getCalculatedView()
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>
<style scoped>
    .wj-cell.calculated {
        background-color: azure;
    }
</style>
