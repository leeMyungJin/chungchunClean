<template>
    <div class="container-fluid">
        <h2>
            Default Grid
        </h2>
        <p>
            Products are rendered as rows.
        </p>
        <wj-flex-grid class="product-grid"
            :autoGenerateColumns="false"
            :alternatingRowStep="0"
            :showSelectedHeaders="'Row'"
            :headersVisibility="'Row'"
            :isReadOnly="true"
            :copyHeaders="'Row'"
            :selectionMode="'CellRange'"
            :formatItem="formatItem"
            :itemsSource="data">
            <wj-flex-grid-column v-for="c in columns" v-bind:key="c.binding"
                :binding="c.binding"
                :header="c.header"
                :align="c.align"
                :format="c.format" 
                :wordWrap="c.wordWrap"/>
        </wj-flex-grid>
        <h2>
            Transposed Grid
        </h2>
        <p>
            Products are rendered as columns.
        </p>
        <wj-transposed-grid class="product-grid"
            :autoGenerateRows="false"
            :alternatingRowStep="0"
            :showSelectedHeaders="'Row'"
            :headersVisibility="'Row'"
            :isReadOnly="true"
            :copyHeaders="'Row'"
            :selectionMode="'CellRange'"
            :formatItem="formatItem"
            :loadedRows="loadedRows"
            :itemsSource="data">
            <wj-transposed-grid-row v-for="c in columns" v-bind:key="c.binding"
                :binding="c.binding"
                :header="c.header"
                :align="c.align"
                :format="c.format" 
                :wordWrap="c.wordWrap"/>
        </wj-transposed-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import "bootstrap.css";
    import Vue from "vue";

    import "@grapecity/wijmo.vue2.grid";
    import "@grapecity/wijmo.vue2.grid.transposed";
    import { ObservableArray } from "@grapecity/wijmo";
    import { getData, getDataColumns } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: new ObservableArray(getData()),
                columns: getDataColumns()
            };
        },
        methods: {

            // customize cells to show product images and star rating
            formatItem: function(s, e) {
                if (e.panel == s.cells) {

                    // get binding from row if possible, then from column
                    let binding = s.rows[e.row].binding || s.columns[e.col].binding;
                    switch (binding) {

                        // product image
                        case 'img':
                            e.cell.innerHTML = '<img src="{img}" draggable="false"/>'.replace('{img}', e.cell.textContent);
                            break;

                        // stars for rating
                        case 'rating':
                            let rating = s.getCellData(e.row, e.col, false),
                                html = new Array(Math.floor(rating) + 1).join('&#x2605;');
                            if (rating > Math.floor(rating)) {
                                html += '&#9734;'; // white star (half star doesn't work...)
                            }
                            e.cell.innerHTML = '<span class="rating">' + html + '</span>';
                            break;
                    }
                }
            },

            // customize transposed product grid row/column sizes
            loadedRows: function(s) {
                s.columns.defaultSize = 200;
                setTimeout(() => {
                    s.autoSizeColumn(0, true, 10); // auto-size row headers
                    s.autoSizeRows(); // auto-size data rows
                    s.rows[0].height = 180; // make product images large
                });
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .product-grid {
        max-height: 2000px;
    }

    .product-grid .wj-rowheaders .wj-cell {
        text-transform: uppercase;
        font-size: 80%;
    }

    .product-grid .wj-cell {
        padding: 12px;
        border-bottom: none;
    }

    .product-grid .wj-cell span.rating {
        font-size: 200%;
        color: #e7711b;
    }

    .product-grid img {
        height: 100%;
    }
</style>
