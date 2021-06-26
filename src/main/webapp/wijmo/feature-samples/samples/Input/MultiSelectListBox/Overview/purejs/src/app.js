import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theMultiSelectListBox = new input.MultiSelectListBox('#theMultiSelectListBox', {
        displayMemberPath: 'country',
        itemsSource: getData(),
        showFilterInput: true,
        checkedItemsChanged: (sender) => {
            let html = '';
            sender.checkedItems.forEach((item) => {
                html += `<li>${item.country}</li>`;
            });
            document.querySelector('#checkedItems').innerHTML = html;
        }
    });
    //
    // toggle 'select all' checkbox
    document.querySelector('#selectAll').addEventListener('click', e => {
        theMultiSelectListBox.showSelectAllCheckbox = e.target.checked;
    });
    //
    // toggle 'filter' input
    document.querySelector('#filter').addEventListener('click', e => {
        theMultiSelectListBox.showFilterInput = e.target.checked;
    });
}
