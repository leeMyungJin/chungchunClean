import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { toggleClass } from '@grapecity/wijmo';
import { RadialGauge, LinearGauge } from '@grapecity/wijmo.gauge';
import { ComboBox } from '@grapecity/wijmo.input';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create gauges
    let theRadialGauge = new RadialGauge('#theRadialGauge', {
        min: 0,
        max: 500,
        value: 100,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        showTickText: true,
        tickSpacing: 50,
        showText: 'Value',
        isReadOnly: false
    });
    let theLinearGauge = new LinearGauge('#theLinearGauge', {
        min: 0,
        max: 500,
        value: 100,
        showTicks: true,
        showTickText: true,
        tickSpacing: 50,
        isReadOnly: false
    });
    // configure gauges
    new ComboBox('#start', {
        itemsSource: [-90, -45, 0, 45, 90],
        selectedItem: -45,
        selectedIndexChanged: function (s, e) {
            theRadialGauge.startAngle = s.selectedItem;
        }
    });
    new ComboBox('#sweep', {
        itemsSource: [-360, -270, -180, -90, 90, 180, 270, 360],
        selectedItem: -270,
        selectedIndexChanged: function (s, e) {
            theRadialGauge.sweepAngle = s.selectedItem;
        }
    });
    new ComboBox('#spacing', {
        itemsSource: [25, 50, 100, 200, 250],
        selectedItem: 100,
        selectedIndexChanged: function (s, e) {
            theRadialGauge.tickSpacing = s.selectedItem;
            theLinearGauge.tickSpacing = s.selectedItem;
        }
    });
    new ComboBox('#direction', {
        itemsSource: 'Left,Right,Up,Down'.split(','),
        selectedItem: 'Right',
        selectedIndexChanged: function (s, e) {
            theLinearGauge.direction = s.selectedItem;
            toggleClass(theLinearGauge.hostElement, 'vertical', s.text.match(/Up|Down/) != null);
        }
    });
}
