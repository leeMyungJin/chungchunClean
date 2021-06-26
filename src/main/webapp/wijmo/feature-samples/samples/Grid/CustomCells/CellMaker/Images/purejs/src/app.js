import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { getData, getCountries } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    new FlexGrid('#theGrid', {
        showMarquee: true,
        selectionMode: 'MultiRange',
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true, width: 80 },
            { binding: 'country', header: 'Country', dataMap: getCountries() },
            // images
            {
                binding: 'img',
                header: 'Images',
                cssClass: 'cell-img',
                cellTemplate: CellMaker.makeImage({
                    label: 'image for ${item.country}',
                    click: (e, ctx) => alert('Clicked image for ' + ctx.item.country)
                })
            }
        ],
        itemsSource: getData(1000)
    });
}
