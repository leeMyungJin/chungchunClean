import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { Clipboard } from '@grapecity/wijmo';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let hasHeaders = false;
    // show the data in a grid
    new FlexGrid('#theGrid', {
        itemsSource: getData(),
        // copying with or without headers
        copying: (s, e) => {
            hasHeaders = document.getElementById('includeHeaders').checked;
            if (hasHeaders) {
                // copy text with headers and copyright notice to clipboard
                let text = s.getClipString(null, false, true, false);
                text = text + '\r\n(c) 2019 Grapecity Inc';
                // put text with headers on the clipboard
                Clipboard.copy(text);
                // prevent the grid from overwriting our clipboard content
                e.cancel = true;
            }
        },
        // prevent pasting content with headers...
        pasting: (s, e) => {
            if (hasHeaders) {
                e.cancel = true;
            }
        }
    });
}
