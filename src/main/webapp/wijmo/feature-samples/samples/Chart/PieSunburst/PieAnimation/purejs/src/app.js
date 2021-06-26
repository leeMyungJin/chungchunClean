import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { InputNumber, Menu } from '@grapecity/wijmo.input';
import { FlexPie, Palettes } from '@grapecity/wijmo.chart';
import { ChartAnimation, AnimationMode, Easing } from '@grapecity/wijmo.chart.animation';
import { getData, getRandomData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let insertPieIdx = 1;
    //
    let flexPie = new FlexPie('#chart', {
        bindingName: 'id',
        binding: 'y0',
        innerRadius: 0,
        palette: getRandomPalette(),
        itemsSource: getData()
    });
    //
    //Pie Easing
    let pieEasing = new Menu('#pieEasing', {
        itemsSource: [
            'Linear', 'Swing', 'EaseInQuad', 'EaseOutQuad', 'EaseInOutQuad', 'EaseInCubic', 'EaseOutCubic',
            'EaseInOutCubic', 'EaseInQuart', 'EaseOutQuart', 'EaseInOutQuart', 'EaseInQuint', 'EaseOutQuint',
            'EaseInOutQuint', 'EaseInSine', 'EaseOutSine', 'EaseInOutSine', 'EaseInExpo', 'EaseOutExpo',
            'EaseInOutExpo', 'EaseInCirc', 'EaseOutCirc', 'EaseInOutCirc', 'EaseInBack', 'EaseOutBack',
            'EaseInOutBack', 'EaseInBounce', 'EaseOutBounce', 'EaseInOutBounce', 'EaseInElastic',
            'EaseOutElastic', 'EaseInOutElastic'
        ],
        selectedValue: 'Swing',
        itemClicked: (sender) => {
            pieAnimation.easing = sender.selectedValue;
            pieAnimation.animate();
            updateMenuHeader(pieEasing, '<b>Easing</b>: ' + sender.text);
        }
    });
    updateMenuHeader(pieEasing, '<b>Easing</b>: ' + pieEasing.text);
    //
    //Pie Duration
    let pieDuration = new InputNumber('#pieDuration', {
        value: 400,
        min: 200,
        max: 5000,
        step: 200,
        format: 'n0',
        valueChanged: (sender) => {
            pieAnimation.duration = sender.value;
            pieAnimation.animate();
        }
    });
    //
    // Pie Inner Radius
    let pieInnerRadius = new InputNumber('#pieInnerRadius', {
        min: 0,
        max: 1,
        step: 0.1,
        format: 'n1',
        valueChanged: (sender) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            flexPie.innerRadius = sender.value;
        }
    });
    //
    // Pie Animation
    let pieAnimation = new ChartAnimation(flexPie, {
        animationMode: AnimationMode.All,
        easing: Easing.Swing,
        duration: 400
    });
    //
    //Pie Animation Mode
    let pieAnimationMode = new Menu('#pieAnimationMode', {
        itemsSource: ['Point', 'Series', 'All'],
        selectedValue: 'All',
        itemClicked: (sender) => {
            pieAnimation.animationMode = sender.selectedValue;
            pieAnimation.animate();
            updateMenuHeader(pieAnimationMode, '<b>Animation Mode</b>: ' + sender.text);
        }
    });
    updateMenuHeader(pieAnimationMode, '<b>Animation Mode</b>: ' + pieAnimationMode.text);
    //
    //Pie Reset Data
    document.querySelector('#pieResetData').addEventListener('click', () => {
        flexPie.itemsSource = getData();
        insertPieIdx = 1;
    });
    //
    //Pie Add Slice
    document.querySelector('#pieAddSlice').addEventListener('click', () => {
        flexPie.itemsSource.push(getRandomData('added' + insertPieIdx));
        insertPieIdx++;
    });
    //
    //Pie Remove Slice
    document.querySelector('#pieRemoveSlice').addEventListener('click', () => {
        if (flexPie.itemsSource.length) {
            flexPie.itemsSource.pop();
            insertPieIdx = insertPieIdx <= 1 ? 1 : insertPieIdx--;
        }
    });
    //
    function updateMenuHeader(menu, value) {
        menu.header = value;
    }
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
