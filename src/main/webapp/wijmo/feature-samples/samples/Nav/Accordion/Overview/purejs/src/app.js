import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Accordion } from '@grapecity/wijmo.nav';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    let acc = new Accordion('#theAccordion'); // create the accordion
    connect(acc, 'showIcons');
    connect(acc, 'autoSwitch');
    connect(acc, 'isAnimated');
    connect(acc, 'allowCollapseAll');
    connect(acc, 'allowExpandMany');
    acc.hostElement.style.display = ''; // show the accordion
}
function connect(acc, id) {
    let cb = document.getElementById(id);
    acc[id] = cb.checked;
    cb.addEventListener('click', e => {
        acc[id] = cb.checked;
    });
}
