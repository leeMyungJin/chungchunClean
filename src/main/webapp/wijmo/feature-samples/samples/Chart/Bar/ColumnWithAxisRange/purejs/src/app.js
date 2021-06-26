import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Palettes, Position } from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barchart = new FlexChart('#chart', {
        header: 'World Population(in millions)',
        legend: {
            position: Position.None
        },
        bindingX: 'year',
        axisY: {
            min: 4000
        },
        series: [{
                binding: 'population',
                name: 'Population'
            }],
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(barchart);
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
