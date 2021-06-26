import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, ChartType, Stacking, Palettes } from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let chart = new FlexChart('#chart', {
        stacking: Stacking.Stacked100pc,
        chartType: ChartType.Area,
        bindingX: 'year',
        series: [
            { binding: 'africa', name: 'Africa' },
            { binding: 'oceania', name: 'Oceania' },
            { binding: 'asia', name: 'Asia' },
            { binding: 'europe', name: 'Europe' },
            { binding: 'southAmerica', name: 'South America' },
            { binding: 'northAmerica', name: 'North America' }
        ],
        axisY: {
            title: 'Populations'
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(chart);
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
