import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { MultiRow } from '@grapecity/wijmo.grid.multirow';
import { getGroupedData, getLayoutDefinition } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the MultiRow
    let theMultiRow = new MultiRow('#theMultiRow', {
        itemsSource: getGroupedData(200),
        layoutDefinition: getLayoutDefinition(),
        multiRowGroupHeaders: true
    });
    // start collapsed
    theMultiRow.collapseGroupsToLevel(1);
    // toggle multiRowGroupHeaders
    document.getElementById('cbMultiRowGroupHeaders').addEventListener('click', function (e) {
        theMultiRow.multiRowGroupHeaders = e.target.checked;
    });
}
