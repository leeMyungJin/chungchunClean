import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CollectionView } from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // shared data source
    let data = new CollectionView(getData());
    //
    // regular grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    //
    // RTL grid (host element is contained in a div with dir="rtl")
    var theGridRTL = new wjGrid.FlexGrid('#theGridRTL', {
        itemsSource: data
    });
    //
    // generate some random data
    function getData() {
        var countries = 'US,Germany,UK,Japan,China,Korea,Italy,Greece,Spain'.split(','), data = [];
        for (var i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
