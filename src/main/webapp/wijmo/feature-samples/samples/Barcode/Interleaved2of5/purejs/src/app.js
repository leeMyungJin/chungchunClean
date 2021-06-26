import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Interleaved2of5 } from '@grapecity/wijmo.barcode.specialized';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Interleaved2of5('#barcode', {
        value: '1234567895',
        autoWidthZoom: 2
    });
}
