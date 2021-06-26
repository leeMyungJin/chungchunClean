import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Palettes } from '@grapecity/wijmo.chart';
import { ErrorBar } from '@grapecity/wijmo.chart.analytics';
import { ComboBox } from '@grapecity/wijmo.input';
import { getData, getComboData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        axisX: { format: 'MMM yy' },
        palette: getRandomPalette()
    });
    //
    // create an ErrorBar series and add it to the Chart
    let errorBar = new ErrorBar({
        errorBarStyle: {
            stroke: 'darkred',
            strokeWidth: 3
        }
    });
    theChart.series.push(errorBar);
    //
    // select chart type
    let chartType = new ComboBox('#chartType', {
        itemsSource: ['Column', 'Bar', 'Scatter', 'Line', 'LineSymbols', 'Area', 'Spline', 'SplineSymbols', 'SplineArea'],
        textChanged: (s) => {
            theChart.chartType = s.text;
        }
    });
    //
    // select error mode/amount
    let errorAmount = new ComboBox('#errorAmount', {
        displayMemberPath: 'hdr',
        textChanged: (sender) => {
            let value = sender.selectedItem.value;
            errorBar.value = value;
            errorBar.binding = value != null ? 'amount' : 'amount,errorPlus,errorMinus';
            errorBar.errorAmount = sender.selectedItem.mode;
        },
        itemsSource: getComboData()
    });
    //
    // randomize the data
    document.querySelector('#btnRandomize').addEventListener('click', () => {
        theChart.itemsSource = getData();
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
