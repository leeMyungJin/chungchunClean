import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Menu } from '@grapecity/wijmo.input';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import { TreeMap, TreeMapType } from '@grapecity/wijmo.chart.hierarchical';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // change chart type
    var typeMenu = new Menu('#typeMenu', {
        itemClicked: function (s, e) {
            treemap.type = parseInt(s.selectedValue);
            updateMenuHeader(s, 'Type');
        }
    });
    updateMenuHeader(typeMenu, 'Type');
    //
    var treemap = new TreeMap('#chart', {
        binding: 'sales',
        bindingName: ['category', 'subCategory'],
        itemsSource: getData(),
        dataLabel: {
            position: 'Center',
            content: '{name}'
        },
        type: TreeMapType.Squarified
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
// show menu header and current value
function updateMenuHeader(menu, header) {
    menu.header = header
        ? header + ': <b>' + menu.text + '</b>'
        : menu.text;
}
