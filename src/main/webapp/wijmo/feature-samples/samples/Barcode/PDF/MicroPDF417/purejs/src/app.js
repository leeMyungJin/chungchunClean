import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { MicroPdf417 } from '@grapecity/wijmo.barcode.composite';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new MicroPdf417('#barcode', {
        value: 'This is a MicroPDF417 barcode'
    });
}
