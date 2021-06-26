import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Gs1DataBarExpanded } from '@grapecity/wijmo.barcode.composite';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let barcode = new Gs1DataBarExpanded('#barcode', {
        value: '(01)00012345678905(10)ABC123',
        autoWidthZoom: 2
    });
}
