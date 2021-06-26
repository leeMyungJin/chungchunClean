import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { UpcE0 } from '@grapecity/wijmo.barcode.common';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new UpcE0('#barcode', {
        value: '012345'
    });
}
