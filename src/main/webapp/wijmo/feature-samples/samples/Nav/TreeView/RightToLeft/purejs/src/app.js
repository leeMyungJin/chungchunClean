import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { TreeView } from '@grapecity/wijmo.nav';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the tree
    let theTree = new TreeView('#theTree', {
        itemsSource: getData(),
        displayMemberPath: 'header',
        childItemsPath: 'items'
    });
}
