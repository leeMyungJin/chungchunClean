import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexChart, Palettes, Series, SeriesVisibility } from '@grapecity/wijmo.chart';
import { isArray, isNumber, toHeaderCase, showPopup, hidePopup } from '@grapecity/wijmo';
import { ListBox } from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country'
    });
    theChart.palette = getRandomPalette();
    //
    // auto-generate series
    let item = theChart.itemsSource[0];
    for (let k in item) {
        if (isNumber(item[k])) {
            let series = new Series();
            series.binding = k;
            series.name = toHeaderCase(k);
            series['visible'] = true; // add 'visible' property for binding
            theChart.series.push(series);
        }
    }
    //
    // create the series picker
    let theSeriesPicker = new ListBox('#theSeriesPicker', {
        itemsSource: theChart.series,
        checkedMemberPath: 'visible',
        displayMemberPath: 'name',
        lostFocus: () => {
            hidePopup(theSeriesPicker.hostElement);
        },
        checkedItemsChanged: (s) => {
            // map extra 'visible' property to 'Series.visibility' values
            theChart.series.forEach((series) => {
                series.visibility = s.checkedItems.indexOf(series) > -1
                    ? SeriesVisibility.Visible
                    : SeriesVisibility.Hidden;
            });
        }
    });
    //
    document.querySelector('#pickerButton').addEventListener('click', e => {
        showPopup(theSeriesPicker.hostElement, e.target, false, true, false);
        theSeriesPicker.focus();
        e.preventDefault();
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
