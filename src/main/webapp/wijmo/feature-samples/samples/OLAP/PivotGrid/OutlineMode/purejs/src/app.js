import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { PivotEngine, PivotPanel, PivotGrid } from '@grapecity/wijmo.olap';
import { CellRange } from '@grapecity/wijmo.grid';
import { toggleClass, saveFile } from '@grapecity/wijmo';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the olap components
    let theEngine = new PivotEngine({
        itemsSource: getData(1000),
        showRowTotals: 'Subtotals',
        showColumnTotals: 'None',
        totalsBeforeData: true,
        rowFields: ['Country', 'Product', 'Color'],
        valueFields: ['Sales', 'Expenses', 'Downloads']
    });
    let thePanel = new PivotPanel('#thePanel', {
        engine: theEngine,
    });
    let theGrid = new PivotGrid('#theGrid', {
        itemsSource: theEngine,
        outlineMode: true
    });
    // customize the olap components
    document.getElementById('outline').addEventListener('click', e => {
        theGrid.outlineMode = e.target.checked;
        if (theGrid.outlineMode) {
            let before = document.getElementById('before');
            theEngine.totalsBeforeData = before.checked = true;
        }
        else {
            let before = document.getElementById('style');
            before.checked = false;
            toggleClass(theGrid.hostElement, 'outline', false);
        }
    });
    document.getElementById('style').addEventListener('click', e => {
        let customStyle = e.target.checked;
        toggleClass(theGrid.hostElement, 'outline', customStyle);
    });
    document.getElementById('before').addEventListener('click', e => {
        theEngine.totalsBeforeData = e.target.checked;
    });
    document.getElementById('headers').addEventListener('click', e => {
        theGrid.showRowFieldHeaders = e.target.checked;
    });
    // export to CSV
    document.getElementById('csv').addEventListener('click', e => {
        let rng = new CellRange(0, 0, theGrid.rows.length - 1, theGrid.columns.length - 1), csv = theGrid.getClipString(rng, true, true, true);
        saveFile(csv, 'FlexGrid.csv');
    });
}
