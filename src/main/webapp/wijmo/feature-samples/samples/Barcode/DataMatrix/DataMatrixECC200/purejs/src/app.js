import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { DataMatrixEcc200 } from '@grapecity/wijmo.barcode.specialized';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new DataMatrixEcc200('#barcode', {
        value: 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+'
    });
}
