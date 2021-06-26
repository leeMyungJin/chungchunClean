import './license';
// Styles
import 'bootstrap.css';
import '@grapecity/wijmo.styles/themes/wijmo.theme.light.css';
import './index.css';
// Import Wijmo web components
import '@grapecity/wijmo.webcomponents.input';
import '@grapecity/wijmo.webcomponents.grid';
import '@grapecity/wijmo.webcomponents.grid.filter';
import '@grapecity/wijmo.webcomponents.grid.grouppanel';
import '@grapecity/wijmo.webcomponents.grid.multirow';
import '@grapecity/wijmo.webcomponents.olap';
import '@grapecity/wijmo.webcomponents.chart';
import '@grapecity/wijmo.webcomponents.chart.finance';
import '@grapecity/wijmo.webcomponents.chart.hierarchical';
import '@grapecity/wijmo.webcomponents.chart.radar';
import '@grapecity/wijmo.webcomponents.gauge';
import '@grapecity/wijmo.webcomponents.nav';
import '@grapecity/wijmo.webcomponents.viewer';
import '@grapecity/wijmo.webcomponents.grid.sheet';
import * as wjCore from '@grapecity/wijmo';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjFinanceChart from '@grapecity/wijmo.chart.finance';
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
    //// Input secction
    let theDateValue = new Date(), allCountries = dataSvc.getAllCountries(), editMenuOptions = [
        '<i class="fa fa-cut"></i>&nbsp;&nbsp;<b>Cut</b><br><small><i>move the current selection to the clipboard</i></small>',
        '<i class="fa fa-copy"></i>&nbsp;&nbsp;<b>Copy</b><br><small><i>copy the current selection to the clipboard</i></small>',
        '<i class="fa fa-paste"></i>&nbsp;&nbsp;<b>Paste</b><br><small><i>insert clipboard content at the cursor position</i></small>'
    ];
    // Number
    let nb = document.getElementById('nb'), nbStr = document.getElementById('nbStr');
    nbStr.textContent = nb.text;
    nb.addEventListener('value-changed', (e) => {
        // CustomEvent.target references the component where event occurred
        let value = e.target.value;
        nb.value = value;
        nbStr.textContent = e.target.text;
    });
    // Date time
    let setDateValue = function (value) {
        dt.value = value;
        tm.value = value;
        dtm.value = value;
        let vstr = value ? wjCore.Globalize.formatDate(value, 'yyyy/MM/dd  HH:mm') : '';
        dtStr.textContent = vstr;
        dtmStr.textContent = vstr;
    };
    let dt = document.getElementById('dt'), tm = document.getElementById('tm'), dtm = document.getElementById('dtm'), dtmStr = document.getElementById('dtmStr'), dtStr = document.getElementById('dtStr');
    dt.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        setDateValue(value);
    });
    dt.value = theDateValue;
    // Time
    tm.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        setDateValue(value);
    });
    tm.value = theDateValue;
    // DateTime
    dtm.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        setDateValue(value);
    });
    dtm.value = theDateValue;
    // Calendar
    let cl = document.getElementById('cl'), clStr = document.getElementById('clStr');
    cl.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        cl.value = value;
        clStr.textContent = value ? wjCore.Globalize.formatDate(value, 'yyyy/MM/dd  HH:mm') : '';
    });
    cl.value = theDateValue;
    // Mask
    let msk = document.getElementById('msk'), mskStr = document.getElementById('mskStr');
    msk.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        msk.value = value;
        mskStr.textContent = value;
    });
    // Combobox
    let cmb2 = document.getElementById('cmb2'), cmb2Str = document.getElementById('cmb2Str');
    cmb2.addEventListener('text-changed', (e) => {
        let text = e.target.text;
        cmb2.text = text;
        cmb2Str.textContent = text;
    });
    cmb2.itemsSource = allCountries;
    // ListBox
    let lbx = document.getElementById('lbx'), lbxSi = document.getElementById('lbxSi'), lbxSv = document.getElementById('lbxSv');
    lbx.addEventListener('selected-index-changed', (e) => {
        lbxSi.textContent = lbx.selectedIndex;
        lbxSv.textContent = lbx.selectedValue;
    });
    lbx.itemsSource = allCountries;
    // MultiSelect
    let mst = document.getElementById('mst'), mstStr = document.getElementById('mstStr');
    mst.addEventListener('checked-items-changed', (e) => {
        mstStr.textContent = mst.checkedItems ? mst.checkedItems.toString() : '';
    });
    mst.itemsSource = allCountries;
    // AutoComplete
    let ac2 = document.getElementById('ac2'), ac2Str = document.getElementById('ac2Str');
    ac2.addEventListener('text-changed', (e) => {
        ac2Str.textContent = ac2.text;
    });
    ac2.itemsSource = allCountries;
    ac2.text = allCountries[0];
    // MultiAutoComplete
    let mac = document.getElementById('mac'), macStr = document.getElementById('macStr');
    mac.addEventListener('selected-items-changed', (e) => {
        macStr.textContent = mac.selectedItems ? mac.selectedItems.toString() : '';
    });
    mac.itemsSource = allCountries;
    // Menu
    let menu = document.getElementById('menu');
    menu.itemsSource = editMenuOptions;
    menu.addEventListener('item-clicked', (e) => {
        alert('You\'ve selected option ' + menu.selectedIndex + ' from the ' + menu.header + ' menu!');
    });
    // ColorPicker
    let cp = document.getElementById('cp'), cpStr = document.getElementById('cpStr');
    cp.addEventListener('value-changed', (e) => {
        cpStr.textContent = cp.value;
    });
    // InputColor
    let ic = document.getElementById('ic'), icStr = document.getElementById('icStr');
    ic.addEventListener('value-changed', (e) => {
        icStr.textContent = ic.value;
    });
    ic.value = '#fff';
    // Popup
    //let ac3 = <any>document.getElementById('ac3');
    //ac3.itemsSource = allCountries;
    //// Grid section
    let gridRef = document.getElementById('gridRef'), gridDetail = document.getElementById('gridDetail');
    gridRef.itemsSource = dataSvc.getData(100);
    gridRef.addEventListener('selection-changed', (e) => {
        let selectedItem = gridRef.selectedItems[0];
        if (selectedItem) {
            gridDetail.innerHTML =
                '<p> ID: ' + selectedItem.id + '</p>' +
                    '<p>Country: ' + selectedItem.country + '</p>' +
                    '<p>Date: ' + wjCore.Globalize.format(selectedItem.date, 'D') + '</p>' +
                    '<p>Downloads: ' + wjCore.Globalize.format(selectedItem.downloads, 'n0') + '</p>' +
                    '<p>Revenue: ' + wjCore.Globalize.format(selectedItem.sales, 'c') + '</p>';
        }
    });
    let panelRef = document.getElementById('panelRef');
    panelRef.grid = gridRef;
    // Olap section
    let rawData = dataSvc.getSimpleDataSet();
    let chartTypes = 'Column,Bar,Scatter,Line,Area,Pie'.split(',');
    // PivotPanel
    let ppRef = document.getElementById('ppRef');
    ppRef.itemsSource = rawData;
    let ng = ppRef.engine;
    ng.itemsSource = rawData;
    ng.rowFields.push('Product', 'Country');
    ng.valueFields.push('Sales', 'Downloads');
    ng.showRowTotals = wjOlap.ShowTotals.Subtotals;
    ng.showColumnTotals = wjOlap.ShowTotals.Subtotals;
    // PivotGrid
    let pgRef = document.getElementById('pgRef');
    pgRef.itemsSource = ng;
    // PivotChart
    let pcRef = document.getElementById('pcRef');
    pcRef.chartType = 'Column';
    pcRef.itemsSource = ng;
    let ctcb = document.getElementById('ctcb');
    ctcb.itemsSource = chartTypes;
    ctcb.addEventListener('text-changed', (e) => {
        pcRef.chartType = ctcb.text;
    });
    //// Multirow section
    let layoutDefs = dataSvc.getLayoutDefs();
    let mrRef = document.getElementById('mrRef');
    mrRef.itemsSource = dataSvc.getMultiRowData();
    mrRef.layoutDefinition = layoutDefs.items[2].def;
    let descStr = document.getElementById('descStr');
    descStr.textContent = layoutDefs.items[2].description;
    let olCmb = document.getElementById('olCmb');
    olCmb.itemsSource = layoutDefs;
    olCmb.addEventListener('text-changed', (e) => {
        var currentItem = layoutDefs.currentItem;
        mrRef.layoutDefinition = currentItem.def;
        descStr.textContent = currentItem.description;
    });
    //// FlexChart section
    let chartTypes2 = 'Column,Bar,Scatter,Line,LineSymbols,Area,Spline,SplineSymbols,SplineArea'.split(',');
    let chartType = 'Line';
    let ctCmb = document.getElementById('ctCmb');
    ctCmb.itemsSource = chartTypes2;
    ctCmb.text = chartType;
    ctCmb.addEventListener('text-changed', (e) => {
        chartRef.chartType = wjChart.ChartType[ctCmb.text];
    });
    // FlexChart
    let chartRef = document.getElementById('chartRef');
    chartRef.itemsSource = dataSvc.getData(100);
    chartRef.chartType = wjChart.ChartType[chartType];
    // FlexPie
    let pieRef = document.getElementById('pieRef');
    pieRef.itemsSource = dataSvc.getPieData();
    ;
    let irdRef = document.getElementById('irdRef');
    irdRef.value = 0;
    irdRef.addEventListener('value-changed', (e) => {
        if (irdRef.value <= 1 && irdRef.value >= 0) {
            pieRef.innerRadius = irdRef.value;
        }
    });
    let ofsRef = document.getElementById('ofsRef');
    ofsRef.value = 0;
    ofsRef.addEventListener('value-changed', (e) => {
        if (ofsRef.value <= 1 && ofsRef.value >= 0) {
            pieRef.offset = ofsRef.value;
        }
    });
    let sagRef = document.getElementById('sagRef');
    sagRef.value = 0;
    sagRef.addEventListener('value-changed', (e) => {
        pieRef.startAngle = sagRef.value;
    });
    //// FinancialChart section
    let fChartTypes = dataSvc.getFinanciaChartType();
    let bindingYs = dataSvc.getBindingYs();
    let fcCmb = document.getElementById('fcCmb');
    fcCmb.itemsSource = fChartTypes;
    fcCmb.text = 'Area';
    fcCmb.addEventListener('text-changed', (e) => {
        let bindingY = bindingYs[fcCmb.selectedIndex], chartType = fcCmb.text;
        fcc.chartType = chartType;
        fcc.series[0].binding = bindingY;
        if (chartType === 'Renko') {
            fcc.options = {
                renko: {
                    boxSize: 2,
                    rangeMode: 'Fixed',
                    fields: 'Close'
                }
            };
        }
        else if (chartType === 'Kagi') {
            fcc.options = {
                kagi: {
                    reversalAmount: 1,
                    rangeMode: 'Fixed',
                    fields: 'Close'
                }
            };
        }
        else {
            fcc.options = null;
        }
    });
    let fcc = document.getElementById('fcc');
    fcc.itemsSource = dataSvc.getFinanciaChartData();
    fcc.chartType = wjFinanceChart.FinancialChartType.Area;
    //// HierarchicalChart section
    let maxDepth = 2;
    let innerRadius = 0;
    let offset = 0;
    let startAngle = 0;
    // TreeMap
    let tmRef = document.getElementById('tmRef');
    tmRef.itemsSource = dataSvc.getGroupCVData();
    tmRef.bindingName = 'type';
    tmRef.binding = 'sales';
    tmRef.childItemsPath = 'items';
    tmRef.maxDepth = maxDepth;
    tmRef.dataLabel.content = '{name}';
    let mdNum = document.getElementById('mdNum');
    mdNum.value = maxDepth;
    mdNum.addEventListener('value-changed', (e) => {
        tmRef.maxDepth = mdNum.value;
    });
    // Sunburst
    let sbtRef = document.getElementById('sbtRef');
    sbtRef.itemsSource = dataSvc.getHierarchicalData();
    sbtRef.innerRadius = innerRadius;
    sbtRef.binding = 'value';
    sbtRef.offset = offset;
    sbtRef.startAngle = startAngle;
    sbtRef.dataLabel.content = '{name}';
    let irdNum = document.getElementById('irdNum');
    irdNum.value = innerRadius;
    irdNum.addEventListener('value-changed', (e) => {
        sbtRef.innerRadius = irdNum.value;
    });
    let ofsNum = document.getElementById('ofsNum');
    ofsNum.value = offset;
    ofsNum.addEventListener('value-changed', (e) => {
        sbtRef.offset = ofsNum.value;
    });
    let stgNum = document.getElementById('stgNum');
    stgNum.value = startAngle;
    stgNum.addEventListener('value-changed', (e) => {
        sbtRef.startAngle = stgNum.value;
    });
    //// FlexRadar section
    // FlexRadar
    let frdRef = document.getElementById('frdRef');
    frdRef.itemsSource = dataSvc.getRadarData();
    let rdtCmb = document.getElementById('rdtCmb');
    rdtCmb.itemsSource = 'Line,LineSymbols,Area,Scatter,Column'.split(',');
    rdtCmb.addEventListener('text-changed', (e) => {
        frdRef.chartType = rdtCmb.text;
    });
    let stCmb = document.getElementById('stCmb');
    stCmb.itemsSource = 'None,Stacked,Stacked100pc'.split(',');
    stCmb.addEventListener('text-changed', (e) => {
        frdRef.stacking = stCmb.text;
    });
    let staNum = document.getElementById('staNum');
    staNum.addEventListener('value-changed', (e) => {
        frdRef.startAngle = staNum.value;
    });
    let taNum = document.getElementById('taNum');
    taNum.addEventListener('value-changed', (e) => {
        frdRef.totalAngle = taNum.value;
    });
    //// Gauge Section
    // LinearGauge 
    let lgRef = document.getElementById('lgRef');
    // RadialGauge
    let rgRef = document.getElementById('rgRef');
    // BulletGraph
    let bgRef = document.getElementById('bgRef');
    let gNum = document.getElementById('gNum');
    lgRef.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        rgRef.value = value;
        bgRef.value = value;
        gNum.value = value;
    });
    rgRef.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        bgRef.value = value;
        lgRef.value = value;
        gNum.value = value;
    });
    bgRef.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        rgRef.value = value;
        lgRef.value = value;
        gNum.value = value;
    });
    gNum.addEventListener('value-changed', (e) => {
        let value = e.target.value;
        rgRef.value = value;
        bgRef.value = value;
        lgRef.value = value;
    });
    //// TreeView Section
    let tvRef = document.getElementById('tvRef');
    let tSetItm = document.getElementById('tSetItm');
    tvRef.itemsSource = dataSvc.getTreeData();
    tvRef.addEventListener('selected-item-changed', (e) => {
        tSetItm.textContent = tvRef.selectedItem ? tvRef.selectedItem.header : '';
    });
    //// FlexSheet section
    let fsRef = document.getElementById('fsRef');
    let sheetIdx, sheetName, colIdx, rowIdx, date;
    if (fsRef) {
        for (sheetIdx = 0; sheetIdx < fsRef.sheets.length; sheetIdx++) {
            fsRef.selectedSheetIndex = sheetIdx;
            sheetName = fsRef.selectedSheet.name;
            for (colIdx = 0; colIdx < fsRef.columns.length; colIdx++) {
                for (rowIdx = 0; rowIdx < fsRef.rows.length; rowIdx++) {
                    if (sheetName === 'Number') {
                        fsRef.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                    }
                    else {
                        date = new Date(2015, colIdx, rowIdx + 1);
                        fsRef.setCellData(rowIdx, colIdx, date);
                    }
                }
            }
        }
        fsRef.selectedSheetIndex = 0;
        fsRef.refresh(true);
    }
}
