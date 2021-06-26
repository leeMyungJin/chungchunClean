<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data"
            :initialized="initializeGrid">
            <wj-flex-grid-column binding="id" header="ID" :width=50 :isReadOnly=true />
            <wj-flex-grid-column binding="country" header="Country" :isRequired="true" :dataMap="countries" />
            <wj-flex-grid-column binding="sales" header="Sales" format="n2" />
            <wj-flex-grid-column binding="expenses" header="Expenses" format="n2" />
            <wj-flex-grid-column binding="overdue" header="Overdue" />
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import '@grapecity/wijmo.vue2.grid';
import { isNumber, changeType, DataType } from '@grapecity/wijmo';
import '@grapecity/wijmo.input';


new Vue({
  	el: "#app",
  	data: {
        data: [],
        countries : ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece']
    },
    methods:{
        initializeGrid(flex){
            this.data = this._getData();

            // event-based validation
            flex.cellEditEnding.addHandler((s, e) => {
                let col = s.columns[e.col];
                if (col.binding == 'sales' || col.binding == 'expenses') {
                    let value = changeType(s.activeEditor.value, DataType.Number, col.format);
                    if (!isNumber(value) || value < 0) {
                        e.cancel = true;
                        e.stayInEditMode = true;
                        alert('Please enter a positive amount.')
                    }
                }
            });
        },

        // create some random data
        _getData() {
            let data = [];
            for (let i = 0; i < this.countries.length; i++) {
                data.push({
                    id: i,
                    country: this.countries[i],
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000,
                    overdue: i % 4 == 0
                });
            }
            return data;
        }
    }
});
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }

    body {
        margin-bottom: 24px;
    }
</style>