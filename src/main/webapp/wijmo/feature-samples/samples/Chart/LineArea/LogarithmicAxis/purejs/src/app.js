import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { FlexChart, ChartType, Palettes, Position } from '@grapecity/wijmo.chart';
import * as analytics from '@grapecity/wijmo.chart.analytics';
import * as animation from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let linechart = new FlexChart('#chart', {
        header: 'Logarithmic Axis',
        legend: {
            position: Position.None
        },
        chartType: ChartType.Scatter,
        bindingX: 'x',
        series: [{
                binding: 'y'
            }],
        axisX: {
            logBase: 10
        },
        itemsSource: getData(),
        palette: getRandomPalette()
    });
    //
    let ani = new animation.ChartAnimation(linechart);
    //
    linechart.series.push(new analytics.TrendLine({
        name: 'Trendline',
        binding: 'y',
        sampleCount: 100
    }));
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
