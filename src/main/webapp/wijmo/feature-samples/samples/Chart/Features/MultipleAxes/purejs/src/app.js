import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Axis, Position, Palettes } from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
            { binding: 'downloads', name: 'Downloads', chartType: 'LineSymbols' }
        ],
        axisY: {
            format: 'n0,',
            title: 'Sales/Expenses (US$ k)',
            axisLine: true
        },
    });
    theChart.palette = getRandomPalette();
    //
    // create and apply extra Y axis for 'Downloads' series
    let axisY2 = new Axis();
    axisY2.position = Position.Right;
    axisY2.title = 'Downloads (k)';
    axisY2.format = 'n0,';
    axisY2.min = 0;
    axisY2.axisLine = true;
    getSeries('downloads').axisY = axisY2;
    //
    // toggle extra axis
    document.querySelector('#secondaryAxis').addEventListener('click', e => {
        getSeries('downloads').axisY = e.target.checked ? axisY2 : null;
    });
    //
    // get a series by its binding
    function getSeries(binding) {
        let s = theChart.series;
        //
        for (let i = 0; i < s.length; i++) {
            if (s[i].binding == binding) {
                return s[i];
            }
        }
        //
        return null;
    }
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
