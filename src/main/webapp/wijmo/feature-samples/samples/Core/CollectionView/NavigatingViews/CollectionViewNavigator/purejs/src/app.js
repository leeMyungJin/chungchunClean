import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CollectionView } from '@grapecity/wijmo';
import { ComboBox, CollectionViewNavigator } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the CollectionView
    let view = new CollectionView(getData(), {
        pageSize: 5
    });
    // allow user to change the CollectionView's page size
    new ComboBox('#cmb-pg-size', {
        itemsSource: [0, 5, 10],
        selectedValue: view.pageSize,
        textChanged: (s) => {
            view.pageSize = s.selectedValue;
        }
    });
    // navigate the CollectionView by item (within the current page)
    new CollectionViewNavigator('#cv-nav', {
        cv: view,
        headerFormat: 'Item {currentItem:n0} of {itemCount:n0} (on page {currentPage:n0})'
    });
    // navigate the CollectionView by page
    new CollectionViewNavigator('#cv-pg', {
        cv: view,
        byPage: true,
        headerFormat: 'Page {current:n0} of {count:n0}'
    });
    // show the data in a grid
    new FlexGrid('#cv-grid', {
        itemsSource: view,
        selectionMode: 'RowRange',
        showMarquee: true
    });
    // get the data for the CollectionView
    function getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), names = 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(','), data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i,
                name: names[i % names.length],
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.round(Math.random() * 20000),
            });
        }
        return data;
    }
}
