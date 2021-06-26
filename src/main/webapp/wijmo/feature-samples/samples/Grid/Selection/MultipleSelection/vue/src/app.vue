<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
            :showMarquee="true"
            :anchorCursor="true"
            :selectionMode="'MultiRange'"
            :showSelectedHeaders="'All'"
            :itemsSource="data"
            :selectionChanged="selectionChanged"
            :initialized="initialized">
        </wj-flex-grid>
        <pre id="mr-aggregates">Ready</pre>
        
        <button class="btn btn-primary" @click="exportGridToCsv(false)">
            Export Whole Grid
        </button>
        <button id="btn-csv-sel" class="btn btn-primary" @click="exportGridToCsv(true)">
            Export Selection
        </button>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.grid';
    import { glbz, format, isNumber, saveFile } from '@grapecity/wijmo';
    import { CellRange } from '@grapecity/wijmo.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: this.getData(),
                grid: null
            }
        },
        methods: {

            // create some random data
            getData: function() {
                let data = [];
                let countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
                for (let i = 0; i < 300; i++) {
                    data.push({
                        id: i,
                        from: countries[i % countries.length],
                        to: countries[(i+1) % countries.length],
                        sales: Math.random() * 10000,
                        expenses: Math.random() * 5000,
                        amount: Math.random() * 10000,
                        extra: Math.random() * 10000,
                    });
                }
                return data;
            },

            initialized: function(s) {
                this.grid = s;
            },

            // update aggregates when selection changes
            selectionChanged: function() {

                // calculate aggregates
                let tally = { cnt: 0, cntAll: 0, sum: 0, avg: 0 },
                    ranges = this.grid.selectedRanges;
                for (let i = 0; i < ranges.length; i++) {
                    this.aggregateRange(tally, this.grid, ranges, i);
                }

                // update the display using template literals
                let msg = (tally.cnt > 1)
                    ? glbz`Count: <b>${tally.cntAll}:n0</b>\tAverage: <b>${tally.avg}:g4\tSum: <b>${tally.sum}:g4</b>`
                    : (tally.cntAll > 1)
                        ? glbz`Count: <b>${tally.cntAll}:n0</b>`
                        : 'Ready'

                // update the display using wijmo.format
                //let msg = (tally.cnt > 1)
                //    ? format('Count: <b>{cntAll:n0}</b>\tAverage: <b>{avg:g4}</b>\tSum: <b>{sum:g4}</b>', tally)
                //    : (tally.cntAll > 1)
                //        ? format('Count: <b>{cntAll:n0}</b>', tally)
                //        : 'Ready';

                // show the result
                document.getElementById('mr-aggregates').innerHTML = msg;
            },

            // update aggregates for a range, accounting for overlapping ranges
            aggregateRange: function(tally, grid, ranges, index) {
                let rng = ranges[index];
                for (let r = rng.topRow; r <= rng.bottomRow; r++) {
                    for (let c = rng.leftCol; c <= rng.rightCol; c++) {

                        // account for overlapping ranges
                        let overlapped = false;
                        for (let i = 0; i < index && !overlapped; i++) {
                            let rng = ranges[i];
                            if (rng.contains(r, c)) {
                                overlapped = true;
                            }
                        }

                        // tally non-overlapped cells
                        if (!overlapped) {
                            let data = grid.getCellData(r, c, false);
                            if (isNumber(data)) { // handle numbers
                                tally.cnt++;
                                tally.sum += data;
                            }
                            if (data !== '' && data !== null) { // handle non-empty cells
                                tally.cntAll++;
                            }
                        }
                    }
                }
                tally.avg = tally.cnt > 0 ? tally.sum / tally.cnt : 0;
            },

            // export grid or selection to CSV
            exportGridToCsv: function(selection) {
                let rng = selection
                    ? null // selection plus extended selection
                    : new CellRange(0, 0, this.grid.rows.length - 1, this.grid.columns.length - 1);
                let csv = this.grid.getClipString(rng, true, true);
                saveFile(csv, selection ? 'FlexGridSelection.csv' : 'FlexGrid.csv');
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
    height: 300px;
}
</style>
