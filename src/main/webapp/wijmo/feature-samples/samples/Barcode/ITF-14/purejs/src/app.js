import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Itf14 } from '@grapecity/wijmo.barcode.specialized';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Itf14('#barcode', {
        value: '98765432109213'
    });
}
