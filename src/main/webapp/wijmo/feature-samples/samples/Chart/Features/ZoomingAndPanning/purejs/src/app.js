import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjInput from '@grapecity/wijmo.input';
import * as chartInteraction from '@grapecity/wijmo.chart.interaction';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let resetZoom = document.getElementById('btnReset');
    resetZoom.disabled = true;
    //
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'Candlestick',
        series: [
            { binding: 'high,low,open,close', name: 'Alphabet Inc', symbolSize: 4 }
        ],
        axisX: { axisLine: false },
        legend: { position: 'None' }
    });
    //
    // enable reset when axis range was changed
    window.setTimeout(function () {
        theChart.axisX.rangeChanged.addHandler(function () {
            resetZoom.disabled = undefined;
        });
        theChart.axisY.rangeChanged.addHandler(function () {
            resetZoom.disabled = undefined;
        });
    }, 200);
    //
    // add chart gestures
    let chartGestures = new chartInteraction.ChartGestures(theChart, {
        interactiveAxes: chartInteraction.InteractiveAxes.XY,
        mouseAction: chartInteraction.MouseAction.Zoom
    });
    setTimeout(() => {
        chartGestures.posX = 0.5;
        chartGestures.posY = 0.5;
        chartGestures.scaleX = 0.5;
        chartGestures.scaleY = 0.5;
    }, 100);
    //
    let actionMenu = new wjInput.Menu('#actionMenu', {
        itemClicked: function (s, e) {
            chartGestures.mouseAction = s.selectedValue == 0 ? chartInteraction.MouseAction.Zoom : chartInteraction.MouseAction.Pan;
            updateMenuHeader(actionMenu, 'Mouse Action');
        }
    });
    updateMenuHeader(actionMenu, 'Mouse Action');
    //
    let axesMenu = new wjInput.Menu('#axesMenu', {
        itemClicked: function (s, e) {
            chartGestures.interactiveAxes = s.selectedValue;
            updateMenuHeader(axesMenu, 'Interactive Axes');
        }
    });
    updateMenuHeader(axesMenu, 'Interactive Axes');
    //
    if (navigator.userAgent.match(/iPad/i) != null || /Android/i.test(navigator.userAgent)) {
        document.querySelector('#actionMenu').style.display = 'none';
    }
    //
    // reset chart zoom
    resetZoom.addEventListener('click', () => {
        if (chartGestures) {
            chartGestures.reset();
        }
        window.setTimeout(function () {
            resetZoom.disabled = true;
        }, 20);
    });
    // 
    // show menu header and current value
    function updateMenuHeader(menu, header) {
        menu.header = header
            ? header + ': <b>' + menu.text + '</b>'
            : menu.text;
    }
}
