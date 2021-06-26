import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { toggleClass } from '@grapecity/wijmo';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: getData(),
        alternatingRowStep: 0,
        anchorCursor: true,
        showMarquee: true,
        showSelectedHeaders: 'All',
        // add spill class if this cell is not empty and the next one is
        formatItem: (s, e) => {
            if (e.panel == s.cells) {
                var spill = e.col < s.columns.length - 1 &&
                    e.cell.innerHTML && !s.getCellData(e.row, e.col + 1);
                toggleClass(e.cell, 'spill', spill);
            }
        }
    });
}
