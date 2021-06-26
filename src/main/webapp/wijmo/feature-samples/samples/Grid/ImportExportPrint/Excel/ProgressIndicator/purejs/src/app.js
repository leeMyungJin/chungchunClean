import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './style.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getData(5000);
    //
    let grid = new wjGrid.FlexGrid('#flexgrid', {
        autoGenerateColumns: false,
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID' },
            { binding: 'country', header: 'Country' },
            { binding: 'product', header: 'Product' },
            { binding: 'amount', header: 'Amount', format: 'c' },
            { binding: 'amount2', header: 'Pending', format: 'c' },
            { binding: 'discount', header: 'Discount', format: 'p1' },
            { binding: 'active', header: 'Active', width: 185 }
        ]
    });
    //
    let progressBar = new wjGauge.LinearGauge('#progressBar', {
        isReadOnly: true,
        min: 0,
        max: 100,
        value: 0,
        showText: 'Value'
    });
    //
    document.querySelector('#export').addEventListener('click', () => {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(grid, {}, 'FlexGrid.xlsx', null, null, progress => progressBar.value = progress, true);
    });
    //
    document.querySelector('#cancel').addEventListener('click', () => {
        wjGridXlsx.FlexGridXlsxConverter.cancelAsync(() => progressBar.value = 0);
    });
}
