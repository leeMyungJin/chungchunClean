import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Pdf417 } from '@grapecity/wijmo.barcode.composite';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Pdf417('#barcode', {
        value: 'This is a PDF417 barcode',
        autoWidthZoom: 2
    });
}
