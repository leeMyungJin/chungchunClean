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
        bindingX: 'longitude',
        palette: getRandomPalette(),
        series: [
            { binding: 'latitude1' },
            { binding: 'latitude2' }
        ],
        axisX: {
            min: 0,
            max: 360,
            majorUnit: 60
        },
        axisY: {
            min: 0,
            max: 100,
            majorUnit: 25
        }
    });
    //
    let ani = new ChartAnimation(r, {
        animationMode: AnimationMode.Series,
        easing: Easing.EaseInOutBounce,
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
