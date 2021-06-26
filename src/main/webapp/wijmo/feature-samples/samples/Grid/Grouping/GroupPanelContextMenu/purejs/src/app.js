import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { FlexGrid } from '@grapecity/wijmo.grid';
import { GroupPanel } from '@grapecity/wijmo.grid.grouppanel';
import { Menu } from '@grapecity/wijmo.input';
import { SortDescription, PropertyGroupDescription } from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create group panel grid
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    //
    // create the group panel
    var thePanel = new GroupPanel('#theGroupPanel', {
        placeholder: 'Drag columns here to create groups',
        grid: theGrid
    });
    //
    // group items by country and product
    ["country", "product"].forEach(prop => {
        theGrid.collectionView.groupDescriptions.push(new PropertyGroupDescription(prop));
    });
    //
    // create the Context Menu
    let groupIndex = -1;
    let menu = new Menu(document.createElement("div"), {
        displayMemberPath: "text",
        dropDownCssClass: "ctx-menu",
        itemsSource: [
            { id: 0, text: "<span class=wj-glyph-down-right></span> Expand All" },
            { id: 1, text: "<span class=wj-glyph-right></span> Collapse All" },
            { id: null, text: "-" },
            { id: 2, text: "<span class=wj-glyph-up></span> Sort Ascending" },
            { id: 3, text: "<span class=wj-glyph-down></span> Sort Descending" },
            { id: 4, text: "<span class=wj-glyph-circle></span> Remove Sort" },
            { id: null, text: "-" },
            { id: 5, text: "<span>&times;</span> Remove Group" }
        ],
        command: {
            executeCommand: cmd => {
                let cv = theGrid.collectionView;
                switch (cmd.id) {
                    case 0: // expand all
                        theGrid.collapseGroupsToLevel(groupIndex + 1);
                        break;
                    case 1: // collapse all
                        theGrid.collapseGroupsToLevel(groupIndex);
                        break;
                    case 2: // sort ascending
                    case 3: // sort descending
                    case 4: // remove sort
                        cv.deferUpdate(() => {
                            cv.sortDescriptions.clear();
                            if (cmd.id != 4) {
                                let binding = cv.groupDescriptions[groupIndex].propertyName;
                                cv.sortDescriptions.push(new SortDescription(binding, cmd.id == 2));
                            }
                        });
                        break;
                    case 5: // remove group
                        cv.groupDescriptions.removeAt(groupIndex);
                        break;
                }
            }
        }
    });
    // use the Menu as a context menu for the GroupPanel
    thePanel.hostElement.addEventListener("contextmenu", e => {
        let groupDescription = thePanel.hitTest(e);
        if (groupDescription) {
            groupIndex = thePanel.collectionView.groupDescriptions.indexOf(groupDescription);
            menu.show(e);
        }
        e.preventDefault();
    });
    //
    // generate some random data
    function getData() {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cameras,Stereos'.split(','), data = [];
        for (var i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                downloads: Math.round(100 + Math.random() * 10000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
            });
        }
        return data;
    }
}
