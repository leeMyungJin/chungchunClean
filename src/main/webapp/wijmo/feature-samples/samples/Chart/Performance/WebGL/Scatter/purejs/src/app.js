import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import { ChartGestures, InteractiveAxes, MouseAction } from '@grapecity/wijmo.chart.interaction';
import { WebGLRenderEngine } from '@grapecity/wijmo.chart.webgl';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let chart = new wjChart.FlexChart('#theChart', {
        chartType: 'Scatter',
        bindingX: 'x',
        binding: 'y',
        axisX: { min: -2, max: 2 },
        axisY: { min: -2, max: 2, axisLine: true, majorGrid: false },
    });
    // add interaction
    let chartGestures = new ChartGestures(chart, {
        interactiveAxes: InteractiveAxes.XY,
        mouseAction: MouseAction.Zoom,
        scaleY: 1,
        posY: 0.5,
        scaleX: 1,
        posX: 0.5
    });
    //
    // chart data helper
    const refreshData = () => {
        if (nSerMenu && nPtsMenu && symMenu) {
            const nser = nSerMenu.selectedValue;
            const npts = nPtsMenu.selectedValue;
            const marker = symMenu.selectedValue;
            chart.beginUpdate();
            chart.series.length = 0;
            for (let i = 0; i < nser; i++) {
                let series = new wjChart.Series();
                series.name = `ser ${i + 1}`;
                series.symbolStyle = { strokeWidth: 0 };
                series.symbolMarker = marker;
                series.itemsSource = getData(Math.random() - 0.5, Math.random() - 0.5, npts / nser, 0.5 * (1 - i / nser));
                chart.series.push(series);
            }
            chart.endUpdate();
        }
    };
    //
    // menu header helper
    const updateMenuHeader = (menu, header) => {
        menu.header = header ? `${header}: <b>${menu.text}</b>` : menu.text;
    };
    //
    // number of points menu
    const nPtsMenu = new wjInput.Menu('#nPtsMenu', {
        itemClicked: (s) => {
            updateMenuHeader(s, 'NumPoints');
            refreshData();
        }
    });
    nPtsMenu.onItemClicked();
    //
    // number of series menu
    let nSerMenu = new wjInput.Menu('#nSerMenu', {
        itemClicked: (s) => {
            updateMenuHeader(s, 'NumSeries');
            refreshData();
        }
    });
    nSerMenu.onItemClicked();
    //
    // series symbol menu
    let symMenu = new wjInput.Menu('#symbolMenu', {
        itemClicked: (s) => {
            // const marker = parseInt(s.selectedValue);
            const marker = s.selectedValue;
            chart.series.forEach((ser) => ser.symbolMarker = marker);
            updateMenuHeader(s, 'Symbol');
        }
    });
    symMenu.onItemClicked();
    //
    // serias symbol size menu
    let symSize = new wjInput.Menu('#symbolSize', {
        itemClicked: (s) => {
            chart.symbolSize = parseInt(s.selectedValue);
            updateMenuHeader(s, 'Size');
        }
    });
    symSize.onItemClicked();
    //
    // render engine to use
    const webjlEl = document.getElementById('webgl');
    const webglEng = new WebGLRenderEngine();
    const svgEng = new wjChart.SvgRenderEngine();
    const updateRenderEngin = () => {
        chart.renderEngine = webjlEl.checked ? webglEng : svgEng;
    };
    webjlEl.addEventListener('click', updateRenderEngin);
    updateRenderEngin();
    //
    // refresh data button
    document.getElementById('btnNew').addEventListener('click', refreshData);
    //
    // reset zoom button
    document.getElementById('btnReset').addEventListener('click', () => chartGestures.reset());
    //
    // initialize data
    refreshData();
}
