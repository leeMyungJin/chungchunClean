import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Palettes } from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'stage',
        chartType: 'Funnel',
        options: {
            funnel: {
                type: 'rectangle'
            }
        },
        series: [
            { binding: 'count', name: 'Sales Pipeline' }
        ],
        dataLabel: {
            content: '{item.count}'
        },
        palette: getRandomPalette()
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
