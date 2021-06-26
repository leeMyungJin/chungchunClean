import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { InputNumber } from '@grapecity/wijmo.input';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import { TreeMap } from '@grapecity/wijmo.chart.hierarchical';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var treemap = new TreeMap('#chart', {
        maxDepth: 1,
        binding: 'sales',
        bindingName: 'type',
        childItemsPath: 'items',
        itemsSource: getData(),
        dataLabel: {
            position: 'Center',
            content: '{name}'
        }
    });
    treemap.palette = getRandomPalette();
    // change chart's maxDepth property
    var maxDepth = new InputNumber('#maxDepth', {
        min: 0,
        max: 4,
        step: 1,
        format: 'n0',
        valueChanged: function (s, e) {
            if (s.value >= s.min && s.value <= s.max) {
                treemap.maxDepth = s.value;
            }
        },
        value: treemap.maxDepth
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
