import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridDetail from '@grapecity/wijmo.grid.detail';
//
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // get OData categories and products
    const url = 'https://services.odata.org/Northwind/Northwind.svc';
    const categories = new wjOdata.ODataCollectionView(url, 'Categories', {
        fields: ['CategoryID', 'CategoryName', 'Description']
    });
    const products = new wjOdata.ODataCollectionView(url, 'Products');
    //
    // shared column definitions
    const categoryColumns = [
        { binding: 'CategoryName', header: 'Category Name', width: '*' },
        { binding: 'Description', header: 'Description', width: '2*' }
    ];
    //
    // get products for a given category
    const _catToProductMap = new Map();
    function getProducts(categoryID) {
        let categoryProducts = _catToProductMap.get(categoryID);
        if (!categoryProducts) {
            categoryProducts = products.items.filter(product => (product.CategoryID === categoryID));
            _catToProductMap.set(categoryID, categoryProducts);
        }
        return categoryProducts;
    }
    //
    //
    // grid with HTML detail
    const customDetail = new wjGrid.FlexGrid('#customDetail', {
        autoGenerateColumns: false,
        itemsSource: categories,
        isReadOnly: true,
        headersVisibility: 'Column',
        selectionMode: 'Row',
        columns: categoryColumns,
        itemFormatter: (panel, rowIdx, columnIdx, cell) => {
            if ((panel.cellType == wjGrid.CellType.Cell) && (columnIdx == 0)) {
                const cat = panel.rows[rowIdx].dataItem;
                if (cat) {
                    cell.innerHTML = `${cat.CategoryName} (ID: ${cat.CategoryID})`;
                    const control = document.createElement('span');
                    control.className = 'glyphicon';
                    if (dpCustom.isDetailAvailable(rowIdx)) {
                        if (dpCustom.isDetailVisible(rowIdx)) {
                            control.className = 'glyphicon glyphicon-chevron-up';
                            control.addEventListener('click', () => dpCustom.hideDetail(rowIdx));
                        }
                        else {
                            control.className = 'glyphicon glyphicon-chevron-down';
                            control.addEventListener('click', () => dpCustom.showDetail(rowIdx, true));
                        }
                    }
                    cell.insertBefore(control, cell.firstChild);
                }
            }
        },
    });
    //
    //custom show/hide detail provider
    const dpCustom = new wjGridDetail.FlexGridDetailProvider(customDetail, {
        detailVisibilityMode: 'Code',
        rowHasDetail: row => !(row.dataItem.CategoryID % 2),
        createDetailCell: function (row) {
            // build detail content for the current category
            const cat = row.dataItem;
            const prods = getProducts(cat.CategoryID);
            let html = `ID: <b>${cat.CategoryID}</b><br/>`;
            html += `Name: <b>${cat.CategoryName}</b><br/>`;
            html += `Description: <b>${cat.Description}</b><br/>`;
            html += `<button class="btn btn-default btn-xs">Hide Detail</button>`;
            //
            // create and return detail cell
            const cell = document.createElement('div');
            cell.innerHTML = html;
            //
            // bind button click
            cell.querySelector('button').addEventListener('click', e => {
                dpCustom.hideDetail(row);
            });
            return cell;
        },
    });
}
