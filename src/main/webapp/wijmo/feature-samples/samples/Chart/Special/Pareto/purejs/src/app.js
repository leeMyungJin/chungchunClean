import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { isArray } from '@grapecity/wijmo';
import { FlexChart, Axis, Position, Palettes } from '@grapecity/wijmo.chart';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create secondary Y axis for cumulative sales values
    let axisY2 = new Axis();
    axisY2.position = Position.Right;
    axisY2.title = 'Cumulative Sales';
    axisY2.format = 'p0';
    axisY2.min = 0;
    axisY2.axisLine = true;
    //
    // create the Pareto chart
    let theChart = new FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Column',
        bindingX: 'make',
        axisY: {
            format: 'n0,',
            title: 'Sales (thousands)',
            axisLine: true
        },
        axisX: {
            labelAngle: -90
        },
        legend: {
            position: 'None'
        },
        series: [
            {
                binding: 'sales',
                name: 'Sales (thousands)'
            },
            {
                binding: 'cumSales',
                name: 'Cumulative Sales',
                chartType: 'Line',
                axisY: axisY2,
                style: {
                    stroke: 'orange',
                    strokeWidth: 4
                }
            }
        ],
        palette: getRandomPalette()
    });
    //
    // change the data to update the chart
    document.querySelector('#btnUpdate').addEventListener('click', () => {
        let view = theChart.collectionView;
        //
        view.deferUpdate(() => {
            view.items.forEach((item) => {
                item.sales += (Math.random() - .5) * .5 * item.sales;
            });
        });
    });
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(Palettes).filter(prop => isArray(Palettes[prop]));
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return Palettes[palettes[rand]];
}
