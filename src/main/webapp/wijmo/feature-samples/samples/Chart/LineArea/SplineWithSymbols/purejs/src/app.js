import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, ChartType, Palettes, Position } from '@grapecity/wijmo.chart';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let chart = new FlexChart('#chart', {
        header: 'Temperature of New York',
        legend: {
            position: Position.Right
        },
        chartType: ChartType.SplineSymbols,
        dataLabel: {
            content: '{y}'
        },
        tooltip: {
            content: ''
        },
        bindingX: 'month',
        series: [
            {
                binding: 'low',
                name: 'Average Low'
            },
            {
                binding: 'high',
                name: 'Average High'
            },
            {
                binding: 'mean',
                name: 'Daily Mean'
            }
        ],
        axisY: {
            title: 'Temperature(°C)'
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(chart);
    ani.animationMode = animation.AnimationMode.Series;
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
