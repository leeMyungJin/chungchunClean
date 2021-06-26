import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Codabar } from '@grapecity/wijmo.barcode.common';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Codabar('#barcode', {
        value: 'A15126893B',
        autoWidthZoom: 2
    });
}
