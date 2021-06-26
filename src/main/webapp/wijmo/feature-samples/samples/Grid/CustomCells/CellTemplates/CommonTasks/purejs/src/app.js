import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo-core.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getData, getProducts, getColors, getCountryMap } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the grid with cell templates
    new FlexGrid('#theGrid', {
        showMarquee: true,
        showSelectedHeaders: 'All',
        selectionMode: 'MultiRange',
        headersVisibility: 'Column',
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true, width: '.5*' },
            { binding: 'date', header: 'Date', width: '*' },
            { binding: 'product', header: 'Product', dataMap: getProducts(), width: '*' },
            {
                binding: 'country', header: 'Country', dataMap: getCountryMap(), width: '*',
                cellTemplate: '<span class="flag-icon flag-icon-${col.dataMap.getDataItem(value).flag}"></span> ${text}'
            },
            {
                binding: 'color', header: 'Color', dataMap: getColors(), width: '*',
                cellTemplate: '<span class="color-tile" style="background:${value}"></span> ${value}'
            },
            { binding: 'value', header: 'Value', format: 'c0', width: '*' },
            {
                binding: 'change', header: 'Change', align: 'center', format: 'p0', width: '*',
                cellTemplate: '<span class=${value > 0 ? "change-up" : "change-down"}>${value}:p0'
            },
        ],
        itemsSource: getData()
    });
}
