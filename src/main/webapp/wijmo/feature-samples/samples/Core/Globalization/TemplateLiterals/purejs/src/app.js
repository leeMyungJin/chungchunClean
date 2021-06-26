import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import { glbz } from '@grapecity/wijmo';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // show first result
    document.getElementById('btn1').addEventListener('click', () => {
        document.getElementById('result1').textContent =
            glbz `Today is‌ ${new Date()}:d, and PI is‌ ${Math.PI}:n4.`;
    });
    // show second result
    document.getElementById('btn2').addEventListener('click', () => {
        document.getElementById('result2').textContent =
            glbz `Today is ${new Date()}:'dddd, MMMM dd'.`;
    });
}
