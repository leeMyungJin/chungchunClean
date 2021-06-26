import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Code39 } from '@grapecity/wijmo.barcode.common';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Code39('#barcode', {
        value: 'A1312BCV',
        autoWidthZoom: 2
    });
}
