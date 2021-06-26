import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan'.split(',');
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: i % 4 == 0
        });
    }
    //
    // bind a grid to the data
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: new wjCore.CollectionView(data, {
            groupDescriptions: ['country'] // group data by country
        }),
        formatItem: function (s, e) {
            if (e.panel == s.cells) {
                if (s.columns[e.col].binding == 'country' && !(s.rows[e.row] instanceof wjGrid.GroupRow)) {
                    if (s.editRange != null && s.editRange.contains(e.row, e.col)) {
                        let spanEle = document.createElement('span');
                        spanEle.className = 'my-button';
                        spanEle.innerHTML = '&#x2b24;';
                        s.activeEditor.style.width = '75%';
                        e.cell.insertBefore(spanEle, s.activeEditor);
                    }
                    else {
                        let html = '<span class="my-button">&#x2b24;</span>' + e.cell.innerHTML;
                        e.cell.innerHTML = html;
                    }
                }
            }
        }
    });
    //
    // monitor and log mouse moves
    var logEl = document.getElementById('log');
    theGrid.addEventListener(theGrid.hostElement, 'mousemove', function (e) {
        var ht = theGrid.hitTest(e);
        var logText = wjCore.format('panel <b>{cellType}</b> row <b>{row}</b> col <b>{col}</b>', {
            cellType: wjGrid.CellType[ht.cellType],
            row: ht.row,
            col: ht.col
        });
        if (e.target.classList.contains('my-button')) {
            logText += ' (fake button!)';
        }
        else if (e.target.tagName == 'INPUT' && e.target.type == 'checkbox') {
            logText += ' (checkbox!)';
        }
        else if (ht.panel == theGrid.cells) {
            if (theGrid.rows[ht.row] instanceof wjGrid.GroupRow) {
                logText += ' (group row)';
            }
            else {
                logText += ' (value: <b>' + theGrid.cells.getCellData(ht.row, ht.col, true) + '</b>)';
            }
        }
        logEl.innerHTML = logText;
    });
}
