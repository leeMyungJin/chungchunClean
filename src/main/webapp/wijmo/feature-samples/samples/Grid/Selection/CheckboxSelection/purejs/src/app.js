import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, HeadersVisibility } from '@grapecity/wijmo.grid';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { CollectionView, PropertyGroupDescription } from '@grapecity/wijmo';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the data (start grouped)
    let view = new CollectionView(getData(30));
    setGroups(true);
    // create the grid
    let theGrid = new FlexGrid('#theGrid', {
        deferResizing: true,
        showMarquee: true,
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true },
            { binding: 'country', header: 'Country' },
            { binding: 'product', header: 'Product' },
            { binding: 'discount', header: 'Discount', format: 'p0' },
            { binding: 'downloads', header: 'Downloads' },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' }
        ],
        itemsSource: view
    });
    // create the Selector
    let selector = new Selector(theGrid, {
        itemChecked: () => {
            showCheckedCount();
        }
    });
    // toggle groups
    document.getElementById('groups').addEventListener('click', e => {
        setGroups(e.target.checked);
    });
    function setGroups(groupsOn) {
        let groups = view.groupDescriptions;
        groups.clear();
        if (groupsOn) {
            groups.push(new PropertyGroupDescription('country'), new PropertyGroupDescription('product'));
        }
    }
    // toggle header column
    document.getElementById('header').addEventListener('click', e => {
        setHeaderColumn(e.target.checked);
    });
    function setHeaderColumn(headerOn) {
        theGrid.headersVisibility = headerOn
            ? HeadersVisibility.All
            : HeadersVisibility.Column;
        selector.column = headerOn
            ? theGrid.rowHeaders.columns[0]
            : theGrid.columns[0];
    }
    // show checked items
    showCheckedCount();
    function showCheckedCount() {
        let cnt = document.getElementById('checked-count'), sel = theGrid.rows.filter(r => r.isSelected);
        cnt.textContent = sel.length.toString();
    }
}
