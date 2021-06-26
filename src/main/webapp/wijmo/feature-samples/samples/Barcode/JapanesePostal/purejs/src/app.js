import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { JapanesePostal } from '@grapecity/wijmo.barcode.specialized';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new JapanesePostal('#barcode', {
        value: '6540123789-A-K-Z'
    });
}
