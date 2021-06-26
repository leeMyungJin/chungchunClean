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
            // link with bound text and no href (uses click event)
            {
                header: 'Simple Link',
                binding: 'country',
                cellTemplate: CellMaker.makeLink({
                    click: (e, ctx) => alert('Clicked Link ** ' + ctx.item.country + ' **')
                })
            },
            // link with fixed text and bound href
            {
                header: 'Real Link',
                binding: 'country',
                cellTemplate: CellMaker.makeLink({
                    text: 'Visit <b>${item.country}</b>',
                    href: '${item.url}',
                    attributes: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        tabIndex: -1
                    }
                    // no need for click handler, the link navigates automatically
                })
            }
        ],
        itemsSource: getData(1000)
    });
}
