import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Control } from '@grapecity/wijmo';
import { ComboBox, InputMask, InputDate, InputTime, InputNumber, MultiSelect } from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // handle form submit and reset events
    document.getElementById('theForm').addEventListener('submit', e => {
        e.preventDefault();
        e.target.reset();
        alert('The form has been submitted.');
    });
    document.getElementById('theForm').addEventListener('reset', e => {
        let ctls = e.target.querySelectorAll('.wj-control');
        for (let i = 0; i < ctls.length; i++) {
            let ctl = Control.getControl(ctls[i]);
            if (ctl instanceof ComboBox && ctl.itemsSource) {
                ctl.selectedIndex = -1;
            }
            if (ctl instanceof MultiSelect) {
                ctl.checkedItems = [];
            }
        }
    });
    // build the form
    new ComboBox('#name');
    new ComboBox('#email');
    new ComboBox('#country', {
        itemsSource: 'US,UK,Japan,Germany,France,Italy,Russia,China'.split(','),
        isRequired: false,
        isEditable: true,
        text: ''
    });
    new InputMask('#card', {
        mask: '9999 9999 9999 9999',
        isRequired: false,
        value: ''
    });
    new InputDate('#date', {
        isRequired: false,
        value: null
    });
    new InputTime('#time', {
        isRequired: false,
        min: '8:00',
        max: '18:00',
        value: null
    });
    new InputNumber('#qty', {
        isRequired: false,
        format: 'n0',
        step: 1,
        value: null
    });
    new InputNumber('#discount', {
        isRequired: false,
        format: 'p0',
        step: .05,
        min: 0,
        max: .2,
        value: null
    });
    new MultiSelect('#colors', {
        itemsSource: 'Black,White,Grey,Red,Green,Blue'.split(','),
        headerFormat: '{count:n0} favorite colors'
    });
}
