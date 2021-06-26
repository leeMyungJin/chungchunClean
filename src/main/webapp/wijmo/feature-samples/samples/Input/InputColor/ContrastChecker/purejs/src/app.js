import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { InputColor } from '@grapecity/wijmo.input';
import { Color, toggleClass, format } from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create InputColor controls
    let cpFore = new InputColor('#icFore', {
        value: 'black',
        valueChanged: updateRatio
    });
    let cpBack = new InputColor('#icBack', {
        value: 'white',
        valueChanged: updateRatio
    });
    updateRatio();
    // update the contrast ratio when the colors change
    function updateRatio() {
        // get lightness ratio
        let lFore = getRelativeLuminance(cpFore.value);
        let lBack = getRelativeLuminance(cpBack.value);
        let ratio = (Math.max(lFore, lBack) + .05) / (Math.min(lFore, lBack) + 0.05);
        // show sample text
        let sample = document.querySelectorAll('.sample');
        for (let i = 0; i < sample.length; i++) {
            let style = sample[i].style;
            style.color = cpFore.value;
            style.background = cpBack.value;
        }
        // show the result
        let e = document.getElementById('ratio');
        e.innerHTML = format('<b>{ratio:g1}</b>:1', { ratio: ratio });
        e.style.borderColor = ratio < 7 ? 'whitesmoke' : 'darkgreen';
        pass('aa-normal', ratio >= 4.5);
        pass('aa-large', ratio >= 3);
        pass('aaa-normal', ratio >= 7);
        pass('aaa-large', ratio >= 4.5);
    }
    function pass(id, pass) {
        let e = document.getElementById(id);
        e.textContent = pass ? 'Pass' : 'Fail';
        toggleClass(e, 'fail', !pass);
    }
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance
    function getRelativeLuminance(color) {
        let c = new Color(color);
        let r = getChannel(c.r);
        let g = getChannel(c.g);
        let b = getChannel(c.b);
        return (r * 0.2126 + g * 0.7152 + b * 0.0722);
    }
    function getChannel(rgb) {
        rgb /= 255;
        return rgb <= 0.03928
            ? rgb / 12.92
            : Math.pow((rgb + 0.055) / 1.055, 2.4);
    }
}
