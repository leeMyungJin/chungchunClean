import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let tree = new wjNav.TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items',
        showCheckboxes: true,
        //
        // show checked items below the tree
        checkedItemsChanged: (sender) => {
            let items = sender.checkedItems, msg = '';
            //
            if (items.length) {
                msg = '<p><b>Checked Items:</b></p><ol>\r\n';
                for (let i = 0; i < items.length; i++) {
                    msg += '<li>' + items[i].header + '</li>\r\n';
                }
                msg += '</ol>';
            }
            //
            document.getElementById('tvChkStatus').innerHTML = msg;
        }
    });
    //
    let checkedItems = [];
    //
    // handle buttons
    document.getElementById('btnCheckAll').addEventListener('click', () => {
        tree.checkAllItems(true);
    });
    //
    document.getElementById('btnUncheckAll').addEventListener('click', () => {
        tree.checkAllItems(false);
    });
    //
    document.getElementById('btnSaveState').addEventListener('click', () => {
        checkedItems = tree.checkedItems || [];
    });
    //
    document.getElementById('btnRestoreState').addEventListener('click', () => {
        tree.checkedItems = checkedItems;
    });
}
