import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { EditHighlighter } from './edit-highlighter';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the grid
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    // create the EditHighlighter
    new EditHighlighter(theGrid, 'cell-changed');
    // create some random data
    function getData() {
        var data = [];
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        for (var i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
