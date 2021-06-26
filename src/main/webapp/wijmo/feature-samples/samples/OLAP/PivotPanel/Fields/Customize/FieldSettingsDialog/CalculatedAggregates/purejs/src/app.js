import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { PivotEngine, PivotPanel, PivotGrid } from '@grapecity/wijmo.olap';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let ng = new PivotEngine({
        autoGenerateFields: false,
        itemsSource: getData(10000),
        showColumnTotals: 'GrandTotals',
        showRowTotals: 'Subtotals',
        fields: [
            { binding: 'product', header: 'Product' },
            { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
            {
                header: 'Range',
                dataType: 'String',
                aggregate: 'Cnt',
                // use getValue to calculate the sales range (High, Medium, or Low)
                getValue: (item) => {
                    let sales = item.sales;
                    return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
                }
            },
            { binding: 'sales', header: 'Sales', format: 'n0' },
            { binding: 'downloads', header: 'Downloads', format: 'n0' },
            {
                header: 'Conversion',
                dataType: 'Number',
                format: 'p0',
                // getAggregateValue computes an aggregate from a summary row (Sales/Downloads)
                getAggregateValue: row => row.Downloads ? row.Sales / row.Downloads : 0
            }
        ],
        rowFields: ['Date', 'Range'],
        valueFields: ['Sales', 'Downloads', 'Conversion']
    });
    //
    // show panel
    new PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show summary
    new PivotGrid('#pivotGrid', {
        isReadOnly: true,
        itemsSource: ng
    });
}
