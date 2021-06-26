import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        showMarquee: true,
        showSelectedHeaders: 'All',
        itemsSource: getData()
    });
}
