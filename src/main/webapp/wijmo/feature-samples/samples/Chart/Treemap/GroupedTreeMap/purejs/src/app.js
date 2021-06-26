import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import { TreeMap } from '@grapecity/wijmo.chart.hierarchical';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var treemap = new TreeMap('#chart', {
        binding: 'sales',
        bindingName: ['category', 'subCategory'],
        itemsSource: getData(),
        dataLabel: {
            position: 'Center',
            content: '{name}'
        }
    });
    treemap.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
