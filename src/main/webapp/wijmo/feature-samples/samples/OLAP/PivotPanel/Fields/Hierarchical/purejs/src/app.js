import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { PivotEngine, PivotPanel, PivotGrid } from '@grapecity/wijmo.olap';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // initialize pivot engine
    var ng = new PivotEngine({
        autoGenerateFields: false,
        fields: [
            {
                header: 'Dimensions', subFields: [
                    { header: 'Buyer', binding: 'buyer' },
                    { header: 'Type', binding: 'type' },
                    {
                        header: 'Date', subFields: [
                            { header: 'Year', binding: 'date', format: 'yyyy' },
                            { header: 'Quarter', binding: 'date', format: '"Q"Q' },
                            { header: 'Month', binding: 'date', format: 'MMM' },
                        ]
                    }
                ]
            },
            {
                header: 'Measures', subFields: [
                    { header: 'Amount', binding: 'amount', format: 'c0' }
                ]
            }
        ],
        valueFields: ['Amount'],
        rowFields: ['Year', 'Quarter'],
        columnFields: ['Buyer'],
        showRowTotals: 'Subtotals',
        itemsSource: getData(),
    });
    // show pivot panel
    new PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    // show pivot grid
    new PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
}
