<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theInputDateRange">InputDateRange: </label>
            <wj-input-date-range
                id="theInputDateRange"
                :alwaysShowCalendar="true"
                :predefinedRanges="predefinedRanges"
                :value.sync="rangeStart"
                :rangeEnd.sync="rangeEnd"
                :closeOnSelection="closeOnSelection"
                :monthCount="monthCount"
                :weeksBefore="weeksBefore"
                :weeksAfter="weeksAfter"
                :handleWheel="false">
            </wj-input-date-range>
        </div>
      <div class="params">
        <div>
          <label for="closeOnSelection">closeOnSelection</label>
          <input type="checkbox" id="closeOnSelection" v-model="closeOnSelection" />
        </div>
        <div>
          <label>monthCount</label>
          <wj-input-number :step="1" :min="1" v-model="monthCount"></wj-input-number>
        </div>
        <div>
          <label>weeksBefore</label>
          <wj-input-number :step="1" :min="0" v-model="weeksBefore"></wj-input-number>
        </div>
        <div>
          <label>weeksAfter</label>
          <wj-input-number :step="1" :min="0" v-model="weeksAfter"></wj-input-number>
        </div>
      </div>
        <p>
            The current range is: <b>from {{rangeStart | wj-format('d')}} to {{rangeEnd | wj-format('d')}}</b>
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import "@grapecity/wijmo.vue2.core";
    import "@grapecity/wijmo.vue2.input";
    import {DateTime} from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data() {
            return {
                rangeStart: new Date(),
                rangeEnd: DateTime.addDays(new Date(), 2),
                predefinedRanges: this.getPredefinedRanges(),
                closeOnSelection: true,
                monthCount: 2,
                weeksBefore: 0,
                weeksAfter: 0,
            };
        },
        methods: {
            // get predefined date ranges
            getPredefinedRanges: function() {
                let dt = DateTime,
                    now = new Date();
                return {

                    // custom
                    'Custom Range': null,

                    // days
                    //'Today': [now, now],
                    //'Yesterday': [dt.addDays(now, -1), dt.addDays(now, -1)],
                    //'Tomorrow': [dt.addDays(now, +1), dt.addDays(now, +1)],

                    // weeks
                    'This Week': [dt.weekFirst(now), dt.weekLast(now)],
                    'Last Week': [dt.weekFirst(dt.addDays(now, -7)), dt.weekLast(dt.addDays(now, -7))],
                    'Next Week': [dt.weekFirst(dt.addDays(now, +7)), dt.weekLast(dt.addDays(now, +7))],

                    // months
                    'This Month': [dt.monthFirst(now), dt.monthLast(now)],
                    'Last Month': [dt.monthFirst(dt.addMonths(now, -1)), dt.monthLast(dt.addMonths(now, -1))],
                    'Next Month': [dt.monthFirst(dt.addMonths(now, +1)), dt.monthLast(dt.addMonths(now, +1))],

                    // years
                    'This Year': [dt.yearFirst(now), dt.yearLast(now)],
                    'Last Year': [dt.addYears(dt.yearFirst(now), -1), dt.addYears(dt.yearLast(now), -1)],
                    'Next Year': [dt.addYears(dt.yearFirst(now), +1), dt.addYears(dt.yearLast(now), +1)],
                };
            }
        },
    });
    //
    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-inputnumber {
        width: 10em;
    }
    .params > div {
        margin-bottom: 0.5em;
    }
    label {
        width: 10em;
        text-align: right;
        margin-right: 0.5em;
    }
    body {
        margin-bottom: 36px;
    }
</style>
