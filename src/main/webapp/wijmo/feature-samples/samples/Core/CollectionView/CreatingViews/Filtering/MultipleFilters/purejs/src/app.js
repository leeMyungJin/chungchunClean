import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Globalize } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create a grid and bind it to some data
    let theGrid = new FlexGrid('#theGrid', {
        itemsSource: getData(),
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
    // add a FlexGridFilter filter to the grid (in addition to the country filter)
    new FlexGridFilter(theGrid);
    // add a country filter to the grid's collectionView (will not disturb the FlexGridFilter)
    let view = theGrid.collectionView, filterText = '';
    view.filters.push((item) => {
        return filterText
            ? item.country.toLowerCase().indexOf(filterText) > -1
            : true;
    });
    // update the country filter when the text changes
    document.querySelector('#theFilter').addEventListener('input', (e) => {
        filterText = e.target.value.toLowerCase();
        view.refresh();
    });
    // update the count now and when the collection changes
    let eCount = document.getElementById('cnt');
    eCount.textContent = Globalize.format(view.totalItemCount, 'n0');
    view.collectionChanged.addHandler(() => {
        eCount.textContent = Globalize.format(view.totalItemCount, 'n0');
    });
}
