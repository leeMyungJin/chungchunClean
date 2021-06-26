import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo-core.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { toggleClass } from '@grapecity/wijmo';
import * as DataService from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // column grouping options
    let colGroups1 = DataService.getColumnGroups(), colGroups2 = DataService.getDeeperColumnGroups();
    // create the grid with column groups
    let theGrid = new FlexGrid('#theGrid', {
        headersVisibility: 'Column',
        alternatingRowStep: 0,
        showMarquee: true,
        showSelectedHeaders: 'All',
        autoGenerateColumns: false,
        columnGroups: colGroups1,
        itemsSource: DataService.getData()
    });
    // toggle group definition
    document.getElementById('toggle').addEventListener('click', e => {
        theGrid.columnGroups = theGrid.columnGroups != colGroups1 ? colGroups1 : colGroups2;
    });
    // toggle column collapse/expand animation
    document.getElementById('animated').addEventListener('click', e => {
        toggleClass(theGrid.hostElement, 'animated', e.target.checked);
    });
}
