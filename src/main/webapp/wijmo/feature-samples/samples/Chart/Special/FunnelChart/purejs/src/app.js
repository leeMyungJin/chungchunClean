import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Palettes } from '@grapecity/wijmo.chart';
import { InputNumber, ComboBox } from '@grapecity/wijmo.input';
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
                neckWidth: .2,
                neckHeight: .4,
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
    //
    // adjust parameters
    let theNeckWidth = new InputNumber('#neckWidth', {
        min: 0,
        max: 1,
        step: .1,
        format: 'p0',
        value: theChart.options.funnel.neckWidth,
        valueChanged: (s) => {
            theChart.options.funnel.neckWidth = s.value;
            theChart.refresh(true);
        }
    });
    //
    let theNeckHeight = new InputNumber('#neckHeight', {
        min: 0,
        max: 1,
        step: .1,
        format: 'p0',
        value: theChart.options.funnel.neckHeight,
        valueChanged: (s) => {
            theChart.options.funnel.neckHeight = s.value;
            theChart.refresh(true);
        }
    });
    //
    let theNeckStyle = new ComboBox('#neckStyle', {
        textChanged: (s) => {
            theChart.options.funnel.type = s.text.toLowerCase();
            theChart.refresh(true);
        },
        itemsSource: ['Default', 'Rectangle']
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
