import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './style.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { getProductOrders } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let data = getProductOrders(500), customContent = false, includeColumnHeader = false;
    let grid = new wjGrid.FlexGrid('#flexgrid', {
        itemsSource: data,
        formatItem: formatItem,
        columns: [
            { binding: 'id', header: 'ID' },
            { binding: 'start', header: 'Start Date', format: 'd' },
            { binding: 'end', header: 'End Date', format: 'd' },
            { binding: 'country', header: 'Country' },
            { binding: 'product', header: 'Product' },
            { binding: 'color', header: 'Color' },
            { binding: 'amount', header: 'Amount', format: 'c', aggregate: 'Sum' },
            { binding: 'amount2', header: 'Pending', format: 'c', aggregate: 'Sum' },
            { binding: 'discount', header: 'Discount', format: 'p1', aggregate: 'Avg' },
            { binding: 'active', header: 'Active', width: 185 }
        ]
    });
    updateGroup();
    onClick('customCellContent', (e) => {
        customContent = e.target.checked;
        grid.invalidate();
    });
    onClick('importIncludeColumnHeader', (e) => {
        includeColumnHeader = e.target.checked;
        document.querySelector('#exportIncludeColumnHeader').checked = includeColumnHeader;
    });
    onClick('exportIncludeColumnHeader', (e) => {
        includeColumnHeader = e.target.checked;
        document.querySelector('#importIncludeColumnHeader').checked = includeColumnHeader;
    });
    onClick('loadXlsx', () => {
        let inputEle = document.querySelector('#importFile');
        if (inputEle.files[0]) {
            wjGridXlsx.FlexGridXlsxConverter.loadAsync(grid, inputEle.files[0], { includeColumnHeaders: includeColumnHeader });
        }
    });
    onClick('saveXlsx', () => {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(grid, {
            includeColumnHeaders: includeColumnHeader,
            includeCellStyles: false,
            formatItem: customContent ? exportFormatItem : null
        }, 'FlexGrid.xlsx');
    });
    // update group setting for the flex grid
    function updateGroup() {
        let groupNames = ['Product', 'Country', 'Amount'], cv, propName, groupDesc;
        if (grid) {
            // get the collection view, start update
            cv = grid.collectionView;
            cv.beginUpdate();
            // clear existing groups
            cv.groupDescriptions.clear();
            // add new groups
            for (let i = 0; i < groupNames.length; i++) {
                propName = groupNames[i].toLowerCase();
                if (propName == 'amount') {
                    // group amounts in ranges
                    // (could use the mapping function to group countries into continents, 
                    // names into initials, etc)
                    groupDesc = new wjCore.PropertyGroupDescription(propName, function (item, prop) {
                        let value = item[prop];
                        if (value > 1000)
                            return 'Large Amounts';
                        if (value > 100)
                            return 'Medium Amounts';
                        if (value > 0)
                            return 'Small Amounts';
                        return 'Negative';
                    });
                    cv.groupDescriptions.push(groupDesc);
                }
                else if (propName) {
                    // group other properties by their specific values
                    groupDesc = new wjCore.PropertyGroupDescription(propName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }
            // done updating
            cv.endUpdate();
        }
    }
    function formatItem(s, e) {
        let panel = e.panel, r = e.row, c = e.col, cell = e.cell;
        if (panel.cellType === wjGrid.CellType.Cell) {
            let binding = grid.columns[c].binding, row = grid.rows[r];
            if (row instanceof wjGrid.GroupRow) {
                if (row.level <= 2) {
                    if (binding === 'active') {
                        cell.innerHTML = customContent
                            ? 'Amount/Pending: ' + Math.round(grid.getCellData(r, 'amount', false) / grid.getCellData(r, 'amount2', false) * 100) / 100
                            : '';
                    }
                }
            }
            else {
                if (binding === 'color') {
                    cell.style.color = customContent ? grid.getCellData(r, c, true) : '';
                }
            }
        }
    }
    function exportFormatItem(args) {
        let p = args.panel, row = args.row, col = args.col, xlsxCell = args.xlsxCell;
        if (p.cellType === wjGrid.CellType.Cell) {
            if (p.columns[col].binding === 'color') {
                if (xlsxCell.value) {
                    if (!xlsxCell.style.font) {
                        xlsxCell.style.font = {};
                    }
                    xlsxCell.style.font.color = xlsxCell.value.toLowerCase();
                }
            }
            else if (p.columns[col].binding === 'active' && p.rows[row] instanceof wjGrid.GroupRow) {
                let cell = args.getFormattedCell();
                xlsxCell.value = cell.textContent.trim();
            }
        }
    }
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
}
