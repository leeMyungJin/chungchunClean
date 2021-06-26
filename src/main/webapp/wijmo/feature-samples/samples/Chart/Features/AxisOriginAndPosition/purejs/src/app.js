import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Palettes } from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new FlexChart('#theChart', {
        chartType: 'Scatter',
        axisY: {
            axisLine: true,
            majorGrid: false,
            origin: 0,
            majorUnit: 1,
            max: 1,
            min: -1,
            labels: false
        },
        axisX: {
            origin: 0,
            min: -1,
            max: 1,
            majorUnit: 1,
            labels: false
        },
        legend: {
            position: 'None'
        },
        tooltip: {
            content: ''
        },
        bindingX: 'x',
        itemsSource: getData(750),
        series: [
            {
                name: 'data1',
                binding: 'y1'
            },
            {
                name: 'data2',
                binding: 'y2'
            }
        ]
    });
    theChart.palette = getRandomPalette();
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
