import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wj from '@grapecity/wijmo';
import { FlexChart, FlexPie, Palettes } from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new FlexChart('#theChart', {
        header: 'Country GDP',
        footer: '2016, in USD billions',
        itemsSource: getData(),
        tooltip: { content: '<b>{country}</b><br>{value}' },
        bindingX: 'country',
        series: [
            { binding: '2016' }
        ],
        itemFormatter: (engine, ht, defaultRenderer) => {
            const pal = theChart.palette ? theChart.palette : Palettes.standard;
            engine.fill = pal[ht.pointIndex]; // each bar has own color
            engine.stroke = null;
            defaultRenderer();
        }
    });
    //
    let thePie = new FlexPie('#thePie', {
        header: 'Country GDP',
        footer: '2016, in USD billions',
        itemsSource: getData(),
        bindingName: 'country',
        binding: '2016',
        itemFormatter: (engine, ht, defaultRenderer) => {
            let clr = new wj.Color(engine.fill);
            clr.a = 1; // use opaque color
            engine.fill = clr.toString();
            engine.stroke = null;
            defaultRenderer();
        }
    });
    // select the chart palette
    let thePalette = new wjInput.ComboBox('#thePalette', {
        itemsSource: getPalettes(),
        displayMemberPath: 'name',
        showGroups: true,
        selectedIndexChanged: (s) => theChart.palette = thePie.palette = s.selectedItem.colors,
        formatItem: (sender, e) => {
            let item = e.data;
            if (item.name && item.colors) {
                // create palette swatch
                let html = '<div style="width:100px;display:inline-block">' + item.name + '</div>';
                item.colors.forEach(clr => {
                    html += `<div style="width:1em;height:1em;display:inline-block;background-color:${clr};"></div>`;
                });
                e.item.innerHTML = html;
            }
        }
    });
}
//
function getPalettes() {
    let items = [];
    let palettes = Palettes;
    for (let key in palettes) {
        if (!palettes.hasOwnProperty(key)) {
            continue;
        }
        if (Array.isArray(palettes[key])) {
            items.push({ name: key, colors: palettes[key] });
        }
        else {
            for (let subkey in palettes[key]) {
                if (palettes[key].hasOwnProperty(subkey)) {
                    items.push({ name: subkey, colors: palettes[key][subkey], group: key });
                }
            }
        }
    }
    return new wj.CollectionView(items, { groupDescriptions: ['group'] });
}
