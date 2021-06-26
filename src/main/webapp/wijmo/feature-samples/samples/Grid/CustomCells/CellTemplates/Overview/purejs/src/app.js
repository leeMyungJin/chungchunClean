import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo-core.css';
import './styles.css';
import { FlexGrid } from '@grapecity/wijmo.grid';
import * as DataService from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the grid with cell templates
    new FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        columns: [
            {
                header: 'Country', binding: 'country', width: '*',
                cellTemplate: '<img src="resources/${item.country}.png"/> ${text}'
            },
            {
                header: 'Downloads', binding: 'downloads', width: 170, aggregate: 'Sum',
                cellTemplate: '<span class=${item.downloads > 10000 ? "high-val" : "low-val"}>${text}</span>'
            }
        ],
        itemsSource: DataService.getCv()
    });
}
