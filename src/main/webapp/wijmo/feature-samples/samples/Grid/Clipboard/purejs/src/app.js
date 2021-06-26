import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, HeadersVisibility } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    // default clipboard behavior
    new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        itemsSource: data
    });
    // read-only, copy headers as well as data
    new FlexGrid('#theCustomGrid', {
        copyHeaders: HeadersVisibility.Column,
        isReadOnly: true,
        alternatingRowStep: 0,
        itemsSource: data
    });
}
