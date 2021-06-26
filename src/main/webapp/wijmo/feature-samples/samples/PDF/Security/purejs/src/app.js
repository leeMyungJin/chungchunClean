import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as pdf from '@grapecity/wijmo.pdf';
import '@grapecity/wijmo.pdf.security';
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
    document.querySelector('#btn').addEventListener('click', () => {
        let doc = new pdf.PdfDocument({
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
            },
            ended: (doc, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.drawText('Demo page.');
        //
        doc.end();
    });
}
//
function updateMenuHeader(menu, header) {
    menu.header = header + ': <b>' + menu.text + '</b>';
}
