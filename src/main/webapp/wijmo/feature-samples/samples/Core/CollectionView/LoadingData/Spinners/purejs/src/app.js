import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as grid from '@grapecity/wijmo.grid';
import * as gauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
import * as core from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a grid to use with GIF spinner
    let theGridGif = new grid.FlexGrid('#theGridGif');
    let theSpinnerGif = document.querySelector('#theSpinnerGif');
    const gifWrapper = document.querySelector('#gifWrapper');
    //
    // load data into the grid
    document.querySelector('#btn-load-gif').addEventListener('click', () => {
        // prepare to load data
        theGridGif.isDisabled = true;
        theGridGif.itemsSource = null;
        core.toggleClass(theGridGif.hostElement, 'hidden');
        gifWrapper.appendChild(theSpinnerGif);
        //
        // load data with a delay
        getData((data) => {
            theGridGif.itemsSource = data;
            theGridGif.isDisabled = false;
            core.removeChild(theSpinnerGif);
            core.toggleClass(theGridGif.hostElement, 'hidden');
        }, 3000);
    });
    //
    // create a grid to use with Gauge spinner
    let theGridGauge = new grid.FlexGrid('#theGridGauge');
    const gaugeWrapper = document.querySelector('#gaugeWrapper');
    //
    // load data into the grid
    document.querySelector('#btn-load-gauge').addEventListener('click', () => {
        //
        // prepare to load data
        core.toggleClass(theGridGauge.hostElement, 'hidden');
        theGridGauge.itemsSource = null;
        setSpinner(theGridGauge, true);
        //
        // load data
        getData((data) => {
            theGridGauge.itemsSource = data;
            setSpinner(theGridGauge, false);
            core.toggleClass(theGridGauge.hostElement, 'hidden');
        }, 3000);
    });
    //
    // create a spinner Gauge
    let theSpinnerInterval;
    let theSpinnerGauge = new gauge.RadialGauge('#theSpinnerGauge', {
        isAnimated: false,
        showText: 'None',
        sweepAngle: 360,
        step: 5,
        showTicks: true,
        face: {
            color: 'transparent'
        }
    });
    //
    // add or remove a spinner to/from the grid
    function setSpinner(grid, on) {
        // stop spinner
        if (theSpinnerInterval) {
            clearInterval(theSpinnerInterval);
            theSpinnerInterval = null;
        }
        //
        // add/remove spinner
        let spinner = theSpinnerGauge.hostElement;
        if (on) {
            grid.isDisabled = true;
            gaugeWrapper.appendChild(spinner);
            theSpinnerGauge.invalidate();
            theSpinnerGauge.value = 0;
            theSpinnerInterval = setInterval(() => {
                theSpinnerGauge.value = (theSpinnerGauge.value + 1) % 100;
            }, 50);
        }
        else {
            grid.isDisabled = false;
            core.removeChild(spinner);
        }
    }
}
