import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridContextMenu } from './flex-grid-context-menu';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let theGrid = new FlexGrid('#theGrid', {
        showMarquee: true,
        allowSorting: 'MultiColumn',
        itemsSource: getData(100)
    });
    new FlexGridContextMenu(theGrid);
}
