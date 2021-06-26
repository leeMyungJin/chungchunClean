import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray, toggleClass } from '@grapecity/wijmo';
import { FlexChart, Palettes } from '@grapecity/wijmo.chart';
import { ComboBox } from '@grapecity/wijmo.input';
import { getData, getComboData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a chart
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        legend: { position: 'Right' },
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
            { binding: 'downloads', name: 'Downloads' }
        ]
    });
    theChart.palette = getRandomPalette();
    // toggle custom styles
    document.getElementById('customTitles').addEventListener('click', function (e) {
        toggleClass(theChart.hostElement, 'custom-titles', e.target.checked);
    });
    // toggle custom legend styles
    document.getElementById('customLegend').addEventListener('click', function (e) {
        toggleClass(theChart.hostElement, 'custom-legend', e.target.checked);
    });
    // change legend position
    var legendPosition = new ComboBox('#legendPosition', {
        itemsSource: getComboData(),
        textChanged: function (s, e) {
            theChart.legend.position = s.text;
        },
        text: 'Left'
    });
    //
    // customize chart titles
    let header = new ComboBox('#header', {
        textChanged: (s) => theChart.header = s.text
    });
    let footer = new ComboBox('#footer', {
        textChanged: (s) => theChart.footer = s.text
    });
    let xTitle = new ComboBox('#xTitle', {
        textChanged: (s) => theChart.axisX.title = s.text
    });
    let yTitle = new ComboBox('#yTitle', {
        textChanged: (s) => theChart.axisY.title = s.text
    });
    //
    // initialize titles
    header.text = 'My Great Chart';
    footer.text = 'powered by Wijmo\'s FlexChart';
    xTitle.text = 'country';
    yTitle.text = 'values/units';
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
