import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { ChartType, FlexChart, Palettes, Position } from '@grapecity/wijmo.chart';
import { ChartAnimation, AnimationMode } from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let lineChart = new FlexChart('#chart', {
        header: '24 Hours CPU Utilization and Temperature',
        legend: {
            position: Position.None
        },
        chartType: ChartType.Line,
        bindingX: 'time',
        interpolateNulls: false,
        series: [
            {
                binding: 'utilization',
                name: 'Utilization(%)'
            },
            {
                binding: 'temperature',
                name: 'Temperature(°C)'
            }
        ],
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    let ani = new ChartAnimation(lineChart);
    ani.animationMode = AnimationMode.Point;
    //
    let chkbox = document.querySelector('#interpolateNulls');
    chkbox.addEventListener('change', () => {
        lineChart.interpolateNulls = chkbox.checked;
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
