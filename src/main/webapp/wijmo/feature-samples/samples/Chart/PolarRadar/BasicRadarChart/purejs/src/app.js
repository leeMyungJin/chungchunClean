import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { Palettes } from '@grapecity/wijmo.chart';
import { FlexRadar } from '@grapecity/wijmo.chart.radar';
import { ChartAnimation, AnimationMode, Easing } from '@grapecity/wijmo.chart.animation';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var r = new FlexRadar('#chart', {
        bindingX: 'country',
        palette: getRandomPalette(),
        series: [
            { name: 'Sales', binding: 'sales' },
            { name: 'Downloads', binding: 'downloads' }
        ],
        axisY: {
            min: 0,
            max: 100
        }
    });
    let ani = new ChartAnimation(r, {
        animationMode: AnimationMode.Point,
        easing: Easing.Swing,
        duration: 500
    });
    //
    setTimeout(function () {
        r.itemsSource = getData();
    }, 200);
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
