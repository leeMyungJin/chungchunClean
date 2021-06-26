import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Code93 } from '@grapecity/wijmo.barcode.specialized';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Code93('#barcode', {
        value: 'CODE93',
        checkDigit: true,
        autoWidthZoom: 2
    });
}
