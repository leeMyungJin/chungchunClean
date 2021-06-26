import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import '@grapecity/wijmo.touch';
import { toggleClass } from '@grapecity/wijmo';
import { HeadersVisibility } from '@grapecity/wijmo.grid';
import { TransposedGrid } from '@grapecity/wijmo.grid.transposed';
import { getRowGroups, getDeeperRowGroups, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // row grouping options
    let rowGroups1 = getRowGroups(), rowGroups2 = getDeeperRowGroups();
    // create the grid with row groups
    let trnGrid = new TransposedGrid('#trnGrid', {
        alternatingRowStep: 0,
        showMarquee: true,
        showSelectedHeaders: HeadersVisibility.Row,
        autoGenerateRows: false,
        rowGroups: rowGroups1,
        itemsSource: getData()
    });
    // toggle group definition
    document.getElementById('toggle').addEventListener('click', e => {
        trnGrid.rowGroups = trnGrid.rowGroups != rowGroups1 ? rowGroups1 : rowGroups2;
    });
    // toggle row group collapse/expand animation
    document.getElementById('animated').addEventListener('click', e => {
        toggleClass(trnGrid.hostElement, 'animated', e.target.checked);
    });
}
