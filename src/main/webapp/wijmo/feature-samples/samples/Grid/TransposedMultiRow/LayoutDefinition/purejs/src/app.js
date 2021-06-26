import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { MultiRow } from '@grapecity/wijmo.grid.multirow';
import { TransposedMultiRow } from '@grapecity/wijmo.grid.transposedmultirow';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    let orders = appData.orders;
    let layoutDefs = appData.layoutDefs;
    let currentLayout = appData.layoutDefs.currentItem;
    let trnMultirow = new TransposedMultiRow('#trnMultirow', {
        itemsSource: orders,
        layoutDefinition: currentLayout.def
    });
    let ordMultirow = new MultiRow('#ordMultirow', {
        itemsSource: orders,
        layoutDefinition: currentLayout.def
    });
    let ldComboBox = new wjInput.ComboBox('#ldComboBox', {
        itemsSource: layoutDefs,
        displayMemberPath: 'name'
    });
    //
    updateDescriptions();
    layoutDefs.currentChanged.addHandler(() => {
        currentLayout = appData.layoutDefs.currentItem;
        updateMultirow();
        updateDescriptions();
    });
    //
    document.getElementById('btnExportToExcel').addEventListener('click', function () {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(trnMultirow, {
            includeRowHeaders: true
        }, 'FlexGrid.xlsx');
    });
    //
    document.getElementById('btnExportToPDF').addEventListener('click', function () {
        wjGridPdf.FlexGridPdfConverter.export(trnMultirow, 'FlexGrid.pdf', {
            documentOptions: {
                pageSettings: {
                    layout: wjPdf.PdfPageOrientation.Landscape
                }
            },
            scaleMode: wjGridPdf.ScaleMode.ActualSize
        });
    });
    //
    function updateMultirow() {
        trnMultirow.layoutDefinition = currentLayout.def;
        ordMultirow.layoutDefinition = currentLayout.def;
    }
    //
    function updateDescriptions() {
        wjCore.setText(document.querySelector('#mainDesc'), currentLayout.descriptions.main);
        wjCore.setText(document.querySelector('#trnDesc'), currentLayout.descriptions.transposedView);
        wjCore.setText(document.querySelector('#ordDesc'), currentLayout.descriptions.ordinaryView);
    }
}
