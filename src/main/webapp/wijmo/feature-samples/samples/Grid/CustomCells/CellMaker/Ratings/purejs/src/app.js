import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { CollectionView } from '@grapecity/wijmo';
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
            { binding: 'rating', header: 'Rating (no stars)' },
            // rating (editable)
            {
                binding: 'rating',
                header: 'Rating (editable)',
                width: 220,
                align: 'center',
                cellTemplate: CellMaker.makeRating({
                    range: [0, 5],
                    label: 'Edit Product Rating'
                })
            },
            // rating (read-only)
            {
                isReadOnly: true,
                binding: 'rating',
                header: 'Rating (read-only)',
                width: 220,
                align: 'center',
                cssClass: 'custom-rating',
                cellTemplate: CellMaker.makeRating({
                    range: [0, 5],
                    label: 'See Product Rating'
                })
            }
        ],
        itemsSource: new CollectionView(getData(1000), {
            getError: (item, prop) => {
                if (prop == 'rating') {
                    if (item.rating < 0 || item.rating > 5) {
                        return 'Ratings should be between zero and five.';
                    }
                }
                return null; // no errors
            }
        })
    });
}
