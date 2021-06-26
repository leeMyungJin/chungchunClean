import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import { CollectionView } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid with on-demand sorting
    var theGrid = new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        itemsSource: new CollectionView(getData(), {
            refreshOnEdit: false // on-demand sorting and filtering
        })
    });
    //
    // and with on-demand filtering as well
    new FlexGridFilter(theGrid);
    //
    // create some random data
    function getData() {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
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
        return data;
    }
}
