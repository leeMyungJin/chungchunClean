import './license';
// Styles
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './index.css';
// Import Wijmo web components
import '@grapecity/wijmo.webcomponents.input';
import '@grapecity/wijmo.webcomponents.grid';
import '@grapecity/wijmo.webcomponents.grid.filter';
import '@grapecity/wijmo.webcomponents.grid.grouppanel';
import '@grapecity/wijmo.webcomponents.chart';
import '@grapecity/wijmo.webcomponents.gauge';
// Though TabPanel is used in code, we need to import 'webcomponents.nav' to perform
// dummy registering of it as a web component; otherwise, TabPanel instances can't be created.
import '@grapecity/wijmo.webcomponents.nav';
import * as wjNav from '@grapecity/wijmo.nav';
import * as dataSvc from './data';
if (document.readyState !== "loading") {
    init();
}
else {
    let readyEH = () => {
        if (document.readyState !== "loading") {
            document.removeEventListener('readystatechange', readyEH);
            init();
        }
    };
    document.addEventListener('readystatechange', readyEH);
}
function init() {
    // initialize tabs used to show the source code
    var tabSrc = document.querySelectorAll('.tab-source');
    for (var i = 0; i < tabSrc.length; i++) {
        new wjNav.TabPanel(tabSrc[i]);
    }
    //// Introduction
    let gridIntro = document.getElementById('gridIntro');
    gridIntro.itemsSource = dataSvc.getData(100);
    //// Referencing and using in code
    // Find grid element in the DOM tree
    let gridRef = document.getElementById('gridRef');
    // The element is also a FlexGrid instance (inherited from FlexGrid),
    // so we can use FlexGrid api on the element, e.g. to assign its data
    // source.
    gridRef.itemsSource = dataSvc.getData(100);
    // Find group panel element in the DOM tree
    let panelRef = document.getElementById('panelRef');
    // and attach it to the grid:
    panelRef.grid = gridRef;
    // Find wjc-flex-grid-filter component in the DOM tree
    let filterRef = document.getElementById('filterRef');
    // and specify the filterColumns property value of its 
    // underlying FlexGridFilter object
    filterRef.control.filterColumns = ['country', 'date'];
    //// Child components
    let chData = dataSvc.getData(dataSvc.countries.length);
    let gridWithChildren = document.getElementById('gridWithChildren');
    gridWithChildren.itemsSource = chData;
    let chartWithChildren = document.getElementById('chartWithChildren');
    chartWithChildren.itemsSource = chData;
    //// Events
    // InputNumber and LinearGauge synchronized using valueChanged event
    let inpNumEvents = document.getElementById('inpNumEvents');
    let gaugeEvents = document.getElementById('gaugeEvents');
    inpNumEvents.addEventListener('value-changed', (e) => {
        // CustomEvent.target references the component where event occurred
        gaugeEvents.value = e.target.value;
    });
    gaugeEvents.addEventListener('value-changed', (e) => {
        inpNumEvents.value = e.target.value;
    });
    // FlexGrid's Active column formatted using formatItem event
    let gridEvents = document.getElementById('gridEvents');
    gridEvents.itemsSource = dataSvc.getData(100);
    gridEvents.addEventListener('format-item', (e) => {
        // CustomEvent.detail contains corresponding Wijmo event arguments
        let args = e.detail, grid = args.panel.grid;
        if (args.panel === grid.cells &&
            grid.columns[args.col].binding === 'active' &&
            !args.range.equals(grid.editRange)) {
            args.cell.innerHTML = grid.getCellData(args.row, args.col, false) ? 'Yes' : 'No';
        }
    });
    //// Creating programmatically
    // Find placeholder element
    let placeHolder = document.getElementById('gridProg');
    // Create FlexGrid web component
    let gridProg = document.createElement('wjc-flex-grid');
    // Add grid to DOM
    placeHolder.appendChild(gridProg);
    // Create Column web component
    let countryCol = document.createElement('wjc-flex-grid-column');
    // add child to parent before assigning its properties
    gridProg.appendChild(countryCol);
    countryCol.control.binding = 'country';
    countryCol.control.header = 'Country';
    countryCol.control.width = '*';
    // Create Column web component
    let downloadsCol = document.createElement('wjc-flex-grid-column');
    // add child to parent before assigning its properties
    gridProg.appendChild(downloadsCol);
    downloadsCol.control.binding = 'downloads';
    downloadsCol.control.header = 'Downloads';
    // Create FlexGridFilter web component
    let filter = document.createElement('wjc-flex-grid-filter');
    // add child to parent before assigning its properties
    gridProg.appendChild(filter);
    filter.filterColumns = ['country'];
    // Set grid data
    gridProg.itemsSource = dataSvc.getData(100);
}
