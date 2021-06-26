import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { UpcA } from '@grapecity/wijmo.barcode.common';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new UpcA('#barcode', {
        value: '01234567890'
    });
}
