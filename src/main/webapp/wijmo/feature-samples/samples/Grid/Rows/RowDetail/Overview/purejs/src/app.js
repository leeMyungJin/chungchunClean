import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridDetail from '@grapecity/wijmo.grid.detail';
import * as wjInput from '@grapecity/wijmo.input';
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
    const htmlDetail = new wjGrid.FlexGrid('#htmlDetail', {
        autoGenerateColumns: false,
        columns: categoryColumns,
        itemsSource: categories,
        isReadOnly: true,
    });
    //
    // html detail provider
    const dpHtml = new wjGridDetail.FlexGridDetailProvider(htmlDetail, {
        // use animation when showing details
        isAnimated: true,
        //
        // create detail cells for a given row
        createDetailCell: function (row) {
            // build detail content for the current category
            const cat = row.dataItem;
            const prods = getProducts(cat.CategoryID);
            let html = `ID: <b>${cat.CategoryID}</b><br />`;
            html += `Name: <b>${cat.CategoryName}</b><br />`;
            html += `Description: <b>${cat.Description}</b><br />`;
            html += `Products: <b>${prods.length} items</b><br />`;
            html += '<ol>';
            prods.forEach(product => { html += `<li>${product.ProductName}</li>`; });
            html += '</ol>';
            //
            // create and return detail cell
            const cell = document.createElement('div');
            cell.innerHTML = html;
            return cell;
        },
    });
    //
    //
    // grid with grid detail
    const gridDetail = new wjGrid.FlexGrid('#gridDetail', {
        autoGenerateColumns: false,
        columns: categoryColumns,
        itemsSource: categories,
        isReadOnly: true,
    });
    //
    // grid detail provider
    const initialOptions = {
        // specifies when and how the row details are displayed
        detailVisibilityMode: wjGridDetail.DetailVisibilityMode.ExpandSingle,
        //
        // maximum height of the detail rows, in pixels
        maxHeight: null,
        //
        // whether to use animation when showing row details
        isAnimated: true,
        //
        // action to perform when the ENTER key is pressed
        keyActionEnter: wjGridDetail.KeyAction.None,
        //
        // callback function that determines whether a row has details
        rowHasDetail: null,
        //
        // function that creates detail cells
        createDetailCell: function (row) {
            const cell = document.createElement('div');
            new wjGrid.FlexGrid(cell, {
                headersVisibility: wjGrid.HeadersVisibility.Column,
                isReadOnly: true,
                autoGenerateColumns: false,
                itemsSource: getProducts(row.dataItem.CategoryID),
                columns: [
                    { header: 'ID', binding: 'ProductID' },
                    { header: 'Name', binding: 'ProductName' },
                    { header: 'Qty/Unit', binding: 'QuantityPerUnit' },
                    { header: 'Unit Price', binding: 'UnitPrice' },
                    { header: 'Discontinued', binding: 'Discontinued' },
                ],
            });
            return cell;
        },
    };
    const dpGrid = new wjGridDetail.FlexGridDetailProvider(gridDetail, initialOptions);
    //
    // create detailVisibilityMode selector
    const detailVisibilityModeMenu = new wjInput.Menu('#detailVisibilityMode', {
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                dpGrid.detailVisibilityMode = s.selectedValue;
            }
        },
        header: 'detailVisibilityMode',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'Code', value: wjGridDetail.DetailVisibilityMode.Code },
            { header: 'Selection', value: wjGridDetail.DetailVisibilityMode.Selection },
            { header: 'ExpandSingle', value: wjGridDetail.DetailVisibilityMode.ExpandSingle },
            { header: 'ExpandMulti', value: wjGridDetail.DetailVisibilityMode.ExpandMulti },
        ],
    });
    detailVisibilityModeMenu.selectedValue = initialOptions.detailVisibilityMode;
    //
    // create maxHeight selector
    const maxHeightMenu = new wjInput.Menu('#maxHeight', {
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                dpGrid.maxHeight = s.selectedValue;
            }
        },
        header: 'maxHeight',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'null', value: null },
            { header: '100', value: 100 },
            { header: '200', value: 200 },
            { header: '300', value: 300 },
            { header: '400', value: 400 },
            { header: '500', value: 500 },
        ],
    });
    maxHeightMenu.selectedValue = initialOptions.maxHeight;
    //
    // create isAnimated selector
    const isAnimatedMenu = new wjInput.Menu('#isAnimated', {
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                dpGrid.isAnimated = s.selectedValue;
            }
        },
        header: 'isAnimated',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'False', value: false },
            { header: 'True', value: true },
        ],
    });
    isAnimatedMenu.selectedValue = initialOptions.isAnimated;
    //
    // create keyActionEnter selector
    const keyActionEnterMenu = new wjInput.Menu('#keyActionEnter', {
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                dpGrid.keyActionEnter = s.selectedValue;
            }
        },
        header: 'keyActionEnter',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'None', value: wjGridDetail.KeyAction.None },
            { header: 'ToggleDetail', value: wjGridDetail.KeyAction.ToggleDetail },
        ],
    });
    keyActionEnterMenu.selectedValue = initialOptions.keyActionEnter;
    //
    // create rowDetails selector
    const rowDetailsMenu = new wjInput.Menu('#rowDetails', {
        selectedIndexChanged: (s, e) => {
            if (s.selectedIndex > -1) {
                formatMenuHeader(s);
                dpGrid.rowHasDetail = s.selectedValue ? null : (row => !(row.dataItem.CategoryID % 2));
            }
        },
        header: 'rowDetails',
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'All', value: true },
            { header: 'Even rows only', value: false },
        ],
    });
    rowDetailsMenu.selectedValue = initialOptions.rowHasDetail;
    //
    //
    function formatMenuHeader(menu) {
        let index = menu.header.indexOf(':');
        if (index !== -1) {
            menu.header = menu.header.substring(0, menu.header.indexOf(':')) +
                wjCore.format(': <b>{header}</b>', menu.selectedItem);
        }
        else {
            menu.header = menu.header + wjCore.format(': <b>{header}</b>', menu.selectedItem);
        }
    }
}
