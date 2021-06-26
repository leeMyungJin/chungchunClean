import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { RestCollectionViewJson } from './rest-collection-view-json';
import { CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the grid to show the data
    let theGrid = new FlexGrid('#theGrid', {
        allowAddNew: true,
        allowDelete: true,
        showMarquee: true,
        selectionMode: 'MultiRange',
        deferResizing: true,
        alternatingRowStep: 0,
        // create RestCollectionViewJson
        itemsSource: new RestCollectionViewJson('todos', {
            key: 'id',
            pageSize: 8
        })
    });
    // auto-number row headers
    theGrid.topLeftCells.columns[0].cellTemplate = $ => $.text || ($.row.index + 1).toString();
    // add the filter
    new FlexGridFilter(theGrid);
    // add the navigator
    new CollectionViewNavigator('#theNavigator', {
        cv: theGrid.collectionView,
        byPage: true
    });
    // toggle pagination
    document.getElementById('paging').addEventListener('click', e => {
        let paging = e.target.checked, view = theGrid.collectionView;
        view.pageSize = paging ? 8 : 0;
    });
}
