import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjInput from '@grapecity/wijmo.input';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import { getCountries, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let multirow = new wjMultiRow.MultiRow('#multirow', {
        itemsSource: getData(),
        layoutDefinition: [
            {
                header: 'Identity', cells: [
                    { binding: 'id', header: 'ID' },
                    {
                        binding: 'date', header: 'Date', colspan: 1, width: 180,
                        editor: new wjInput.InputDate(document.createElement('div'))
                    }
                ]
            },
            {
                header: 'Statistics', colspan: 2, cells: [
                    {
                        binding: 'country', header: 'Country', colspan: 2,
                        cellTemplate: '<img src="resources/${item.country}.png"/> ${text}',
                        editor: new wjInput.ComboBox(document.createElement('div'), {
                            itemsSource: getCountries()
                        })
                    },
                    {
                        binding: 'downloads', header: 'Downloads', width: 150, aggregate: 'Sum',
                        cellTemplate: '<span class=${item.downloads > 10000 ? "high-val" : "low-val"}>${text}</span>',
                        editor: new wjInput.InputNumber(document.createElement('div'), {
                            step: 1
                        })
                    },
                    {
                        binding: 'sales', header: 'Sales', width: 150, aggregate: 'Sum',
                        cellTemplate: '<span class=${item.sales > 3000 ? "high-val" : "low-val"}>${text}</span>',
                        editor: new wjInput.InputNumber(document.createElement('div'), {
                            step: 1
                        })
                    }
                ]
            }
        ],
        multiRowGroupHeaders: true
    });
}
