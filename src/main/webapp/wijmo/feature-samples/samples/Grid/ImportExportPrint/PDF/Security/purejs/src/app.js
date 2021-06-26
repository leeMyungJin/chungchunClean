import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import '@grapecity/wijmo.pdf.security';
//
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let menuVersion = new input.Menu('#menuVersion', {
        selectedIndexChanged: (s) => {
            if (s.selectedIndex >= 0) {
                updateMenuHeader(s, 'PDF version');
            }
        }
    });
    updateMenuHeader(menuVersion, 'PDF version');
    //
    let flexGrid = new grid.FlexGrid('#flexGrid', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Start Date', binding: 'start', format: 'd' },
            { header: 'End Date', binding: 'end', format: 'd' },
            { header: 'Country', binding: 'country' }
        ],
        itemsSource: getData(10)
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        let settings = {
            documentOptions: {
                userPassword: document.querySelector('#tbUserPassword').value,
                ownerPassword: document.querySelector('#tbOwnerPassword').value,
                version: menuVersion.selectedValue,
                permissions: {
                    annotating: document.querySelector('#cbAnnotating').checked,
                    contentAccessibility: document.querySelector('#cbContentAccessibility').checked,
                    copying: document.querySelector('#cbCopying').checked,
                    documentAssembly: document.querySelector('#cbDocumentAssembly').checked,
                    fillingForms: document.querySelector('#cbFillingForms').checked,
                    modifying: document.querySelector('#cbModifying').checked,
                    printing: document.querySelector('input[name="printing"]:checked').value
                }
            },
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        };
        //
        gridPdf.FlexGridPdfConverter.export(flexGrid, 'FlexGrid.pdf', settings);
    });
}
//
function updateMenuHeader(menu, header) {
    menu.header = header + ': <b>' + menu.text + '</b>';
}
