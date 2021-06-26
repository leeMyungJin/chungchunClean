import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { DataMatrixEcc000, DataMatrixVersion } from '@grapecity/wijmo.barcode.specialized';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new DataMatrixEcc000('#barcode', {
        value: 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+',
        version: DataMatrixVersion.Ecc100
    });
}
