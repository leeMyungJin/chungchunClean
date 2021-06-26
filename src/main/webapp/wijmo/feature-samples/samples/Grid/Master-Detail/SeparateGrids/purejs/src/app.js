import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { CollectionView, DateTime, Control, isString } from '@grapecity/wijmo';
import { ComboBox, InputDate, InputNumber } from '@grapecity/wijmo.input';
import { FlexGrid } from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var products = 'Phones,Cars,Stereos,Watches,Computers'.split(',');
    var data = [];
    for (var i = 0; i < 50; i++) {
        data.push({
            id: i,
            country: countries[Math.floor(Math.random() * countries.length)],
            product: products[Math.floor(Math.random() * products.length)],
            date: DateTime.addDays(new Date(), i),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // show countries in combo
    var theCombo = new ComboBox('#theCombo', {
        itemsSource: countries,
        selectedIndexChanged: () => {
            view.refresh(); // refresh view to filter by country
        }
    });
    //
    // create CollectionView to show items for the selected country
    var view = new CollectionView(data, {
        filter: item => {
            return item.country == theCombo.text;
        }
    });
    //
    // show items for the selected country in the detail grid
    var theGridDetail = new FlexGrid('#theGridDetail', {
        itemsSource: view
    });
    //
    // using a grid as the master
    var theGridMaster = new FlexGrid('#theGridMaster', {
        itemsSource: data,
        selectionMode: 'Row',
        isReadOnly: true,
        selectionChanged: (s, e) => {
            updateDetailControls();
        }
    });
    //
    // update detail controls when selection changes
    function updateDetailControls() {
        var item = theGridMaster.collectionView.currentItem;
        var bndCtls = document.querySelectorAll('.bnd-ctl');
        for (var i = 0; i < bndCtls.length; i++) {
            var host = bndCtls[i];
            var prop = host.id.substr(3).toLowerCase();
            var ctl = Control.getControl(host);
            if (isString(item[prop])) {
                ctl['text'] = item[prop];
            }
            else {
                ctl['value'] = item[prop];
            }
        }
    }
    //
    // set a property on the current item
    function setProperty(prop, val) {
        var v = theGridMaster.collectionView;
        v.editItem(v.currentItem);
        v.currentItem[prop] = val;
        v.commitEdit();
    }
    //
    // define detail controls
    var theCountry = new ComboBox('#theCountry', {
        itemsSource: countries,
        text: data[0].country,
        textChanged: (s, e) => {
            setProperty('country', s.text);
        }
    });
    var theProduct = new ComboBox('#theProduct', {
        itemsSource: products,
        text: data[0].product,
        textChanged: (s, e) => {
            setProperty('product', s.text);
        }
    });
    var theDate = new InputDate('#theDate', {
        value: data[0].date,
        valueChanged: (s, e) => {
            setProperty('date', s.value);
        }
    });
    var theSales = new InputNumber('#theSales', {
        format: 'n2',
        step: 10,
        value: data[0].sales,
        valueChanged: (s, e) => {
            setProperty('sales', s.value);
        }
    });
    var theExpenses = new InputNumber('#theExpenses', {
        format: 'n2',
        step: 10,
        value: data[0].expenses,
        valueChanged: (s, e) => {
            setProperty('expenses', s.value);
        }
    });
}
