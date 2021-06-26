import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, AllowSorting } from '@grapecity/wijmo.grid';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    new FlexGrid('#theGrid', {
        itemsSource: getData(200),
        allowSorting: AllowSorting.MultiColumn
    });
}
