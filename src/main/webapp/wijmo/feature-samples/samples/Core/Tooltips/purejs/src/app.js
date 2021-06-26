import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let tt = new Tooltip();
    //
    // Tooltip with HTML content
    tt.setTooltip('#span1', 'This is the <b>first</b> span.');
    //
    // Tooltip with content from another element
    tt.setTooltip('#span2', '#spanTooltip');
    //
    // Tooltip with custom position (default is Above)
    tt.setTooltip('#btnAddNew', 'This tooltip appears on the right of the button.', PopupPosition.Right);
}
