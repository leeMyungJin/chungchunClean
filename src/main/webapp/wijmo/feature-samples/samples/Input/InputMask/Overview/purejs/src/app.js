import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Control } from '@grapecity/wijmo';
import { InputMask } from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    new InputMask('#theSSN', {
        mask: '000-00-0000'
    });
    new InputMask('#theZip', {
        mask: '00000'
    });
    new InputMask('#theZip4', {
        mask: '00000-0000'
    });
    new InputMask('#thePhone', {
        mask: '(999) 000-0000'
    });
    // toggle overwriteMode on all input mask controls
    var overwrite = document.querySelector('#overwrite');
    overwrite.addEventListener('click', e => {
        let imsk = document.body.querySelectorAll('.wj-inputmask'), owm = e.target.checked;
        for (let i = 0; i < imsk.length; i++) {
            let ctl = Control.getControl(imsk[i]);
            ctl.overwriteMode = owm;
        }
    });
}
