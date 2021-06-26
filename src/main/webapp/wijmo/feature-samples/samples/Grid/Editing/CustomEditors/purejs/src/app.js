import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { FlexGrid, DataMap } from '@grapecity/wijmo.grid';
import { InputDate, InputTime, InputNumber, InputColor, ComboBox, AutoComplete } from '@grapecity/wijmo.input';
import { getData, getCountries, getProducts } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create a grid with custom editors
    new FlexGrid('#theGrid', {
        showMarquee: true,
        selectionMode: 'MultiRange',
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { header: 'ID', binding: 'id', width: 80, isReadOnly: true },
            {
                header: 'Date', binding: 'date', format: 'd',
                editor: new InputDate(document.createElement('div'))
            },
            {
                header: 'Time', binding: 'time', format: 't',
                editor: new InputTime(document.createElement('div'), {
                    isEditable: true,
                    format: 't',
                    step: 30
                })
            },
            {
                header: 'Country', binding: 'country',
                editor: new ComboBox(document.createElement('div'), {
                    itemsSource: getCountries()
                })
            },
            {
                header: 'Product', binding: 'productId',
                dataMap: new DataMap(getProducts(), 'id', 'name'),
                editor: new AutoComplete(document.createElement('div'), {
                    itemsSource: getProducts(),
                    selectedValuePath: 'id',
                    displayMemberPath: 'name'
                })
            },
            {
                header: 'Color', binding: 'color',
                cellTemplate: '<span class="colorbox" style="background:${text};"></span> ${text}',
                editor: new InputColor(document.createElement('div'))
            },
            {
                header: 'Amount', binding: 'amount', format: 'n2',
                editor: new InputNumber(document.createElement('div'), {
                    format: 'n2',
                    step: 10,
                    min: 0,
                    max: 10000
                })
            },
            {
                header: 'Premium', binding: 'premium', cssClass: 'switch'
            }
        ],
        itemsSource: getData()
    });
}
