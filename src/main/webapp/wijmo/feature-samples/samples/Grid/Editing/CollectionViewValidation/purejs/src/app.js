import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CollectionView, DateTime } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.input';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // CollectionView with validation
    var view = new CollectionView(getData(), {
        getError: (item, prop, parsing) => {
            // parsing errors
            if (parsing) {
                switch (prop) {
                    case 'country':
                        return 'Please select a country from the list.';
                    case 'date':
                        return 'Please enter a date in the format "M/d/yyyy".';
                    default:
                        return 'Please enter a number.';
                }
            }
            // data errors
            if (prop == 'sales' && item.sales < 0) {
                return 'Sales cannot be negative!';
            }
            if (prop == 'expenses' && item.expenses < 0) {
                return 'Expenses cannot be negative!';
            }
            // no errors
            return null;
        }
    });
    // show the data in a grid
    new FlexGrid('#theGrid', {
        itemsSource: view,
        columns: [
            { binding: 'id', header: 'ID', isReadOnly: true },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: getCountries() },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' },
            { binding: 'date', header: 'Date', isRequired: true, format: 'M/d/yyyy' },
            { binding: 'overdue', header: 'Overdue' }
        ]
    });
    // create some random data
    function getCountries() {
        return 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    }
    function getData() {
        let countries = getCountries(), today = new Date(), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                date: DateTime.addDays(today, -Math.random() * 360),
                overdue: (i + 1) % 4 == 0
            });
        }
        return data;
    }
}
