import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.input';
import { FlexGrid, DataMap } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the grid
    let grid = new FlexGrid('#theGrid', {
        showMarquee: true,
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true },
            { binding: 'country', header: 'AutoComplete', dataMap: getDataMap(), dataMapEditor: 'AutoComplete' },
            { binding: 'country', header: 'DropDownList', dataMap: getDataMap(), dataMapEditor: 'DropDownList' },
            { binding: 'country', header: 'RadioButtons', dataMap: getDataMap(), dataMapEditor: 'RadioButtons', width: 300, align: 'center' },
            { binding: 'active', header: 'Active' },
            { binding: 'downloads', header: 'Downloads' },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' }
        ],
        itemsSource: getData()
    });
    // create the data
    function getDataMap() {
        let countries = 'US,UK,Japan,Other'.split(','), arr = countries.map((name, id) => { return { id: id, name: name }; });
        return new DataMap(arr, 'id', 'name');
    }
    function getData() {
        let data = [], map = getDataMap(), len = map.collectionView.items.length;
        for (let i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: Math.floor(Math.random() * len),
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}
