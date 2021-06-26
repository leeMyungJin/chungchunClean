import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { DateTime, format } from '@grapecity/wijmo';
import { InputDateRange, InputNumber } from '@grapecity/wijmo.input';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    //
    // select date ranges using the InputDateRange control
    const inputDateRange = new InputDateRange('#theInputDateRange', {
        alwaysShowCalendar: true,
        predefinedRanges: getPredefinedRanges(),
        valueChanged: s => showDateRange(s),
        rangeEndChanged: s => showDateRange(s),
        value: new Date(),
        rangeEnd: DateTime.addDays(new Date(), 2),
        closeOnSelection: true,
        handleWheel: false,
        monthCount: 2,
        weeksBefore: 0,
        weeksAfter: 0,
    });
    //
    // show changes
    function showDateRange(s) {
        let el = document.querySelector('#dateRange');
        el.textContent = format('from {value:d} to {rangeEnd:d}', s);
    }
    //
    // init closeOnSelection checkbox
    const closeOnSelection = document.getElementById('closeOnSelection');
    closeOnSelection.checked = inputDateRange.closeOnSelection;
    closeOnSelection.addEventListener('change', () => {
        inputDateRange.closeOnSelection = closeOnSelection.checked;
    });
    //
    // init monthCount input
    let monthCount = new InputNumber('#monthCount', {
        min: 1,
        step: 1,
        value: inputDateRange.monthCount,
        valueChanged: (sender) => {
            inputDateRange.monthCount = sender.value;
        }
    });
    //
    // init weeksBefore input
    let weeksBefore = new InputNumber('#weeksBefore', {
        min: 0,
        step: 1,
        value: inputDateRange.weeksBefore,
        valueChanged: (sender) => {
            inputDateRange.weeksBefore = sender.value;
        }
    });
    //
    // init weeksAfter input
    let weeksAfter = new InputNumber('#weeksAfter', {
        min: 0,
        step: 1,
        value: inputDateRange.weeksAfter,
        valueChanged: (sender) => {
            inputDateRange.weeksAfter = sender.value;
        }
    });
    //
    // get predefined date ranges
    function getPredefinedRanges() {
        let dt = DateTime, now = new Date();
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
}
