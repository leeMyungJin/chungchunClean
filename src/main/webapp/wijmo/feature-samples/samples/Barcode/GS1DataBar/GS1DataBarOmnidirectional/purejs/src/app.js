import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Gs1DataBarOmnidirectional } from '@grapecity/wijmo.barcode.composite';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Gs1DataBarOmnidirectional('#barcode', {
        value: '(01)20012345678909'
    });
}
