import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Axis, Palettes, PlotArea, Position } from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart for showing amounts
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        header: 'Sales, Expenses, and Downloads',
        bindingX: 'country',
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
            { binding: 'downloads', name: 'Downloads', chartType: 'LineSymbols' }
        ],
    });
    theChart.palette = getRandomPalette();
    //// create a plot area for amounts
    var p = new PlotArea();
    p.row = theChart.plotAreas.length;
    p.name = 'amounts';
    p.height = '2*';
    theChart.plotAreas.push(p);
    // create a spacer plot area
    p = new PlotArea();
    p.row = theChart.plotAreas.length;
    p.name = 'spacer';
    p.height = 25;
    theChart.plotAreas.push(p);
    // create a plot area for quantities
    p = new PlotArea();
    p.row = theChart.plotAreas.length;
    p.name = 'quantities';
    p.height = '*';
    var axisYQty = new Axis(Position.Left);
    axisYQty.plotArea = p;
    theChart.series[2].axisY = axisYQty;
    theChart.plotAreas.push(p);
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
