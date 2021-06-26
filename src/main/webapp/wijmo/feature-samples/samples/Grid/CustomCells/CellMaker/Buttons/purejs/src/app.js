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
            // button with regular bound text
            {
                binding: 'country',
                header: 'Simple Button',
                width: 150,
                cellTemplate: CellMaker.makeButton({
                    click: (e, ctx) => {
                        alert('Clicked Button ** ' + ctx.item.country + ' **');
                    }
                })
            },
            // button with fixed text
            {
                binding: 'country',
                header: 'Custom Button',
                width: 150,
                cellTemplate: CellMaker.makeButton({
                    text: '<b>${item.country}</b> Button',
                    click: (e, ctx) => alert('Clicked Button ** ' + ctx.item.country + ' **')
                })
            }
        ],
        itemsSource: getData(1000)
    });
}
