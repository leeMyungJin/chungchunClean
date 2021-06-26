import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // column header tooltips
    let hdrTips = new Tooltip({
        position: PopupPosition.RightTop,
        showAtMouse: true,
        showDelay: 600,
        cssClass: 'hdr-tip'
    });
    // grid with column header tooltips
    new FlexGrid('#theGrid', {
        // clean up tooltips when loading the rows
        loadingRows: () => {
            hdrTips.dispose();
        },
        // add/update tooltips when rendering the cells
        formatItem: (s, e) => {
            if (e.panel == s.columnHeaders) {
                hdrTips.setTooltip(e.cell, 'this is column<br/>' +
                    '<span class="col-header">' + e.getColumn().header + '</span>');
            }
        },
        // populate the grid
        itemsSource: getData(),
    });
    // get some dummy data
    function getCountries() {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }
    function getData(cnt = 10) {
        let countries = getCountries(), data = [];
        for (var i = 0; i < cnt; i++) {
            data.push({
                id: i,
                date: new Date(2020, i % 12, (i + 1) % 25),
                active: i % 4 == 0,
                country: countries[i % countries.length],
                sales: Math.random() * 2000,
                expenses: Math.random() * 1000,
            });
        }
        return data;
    }
}
