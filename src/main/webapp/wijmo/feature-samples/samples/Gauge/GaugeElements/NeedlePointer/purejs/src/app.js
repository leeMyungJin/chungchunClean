import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { ComboBox } from '@grapecity/wijmo.input';
import { RadialGauge, ShowText, NeedleShape, NeedleLength } from '@grapecity/wijmo.gauge';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the gauge
    let theRadialGauge = new RadialGauge('#theRadialGauge', {
        showText: ShowText.None,
        min: 0,
        max: 500,
        value: 100,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        showTickText: true,
        tickSpacing: 50,
        thickness: 0.2,
        needleShape: NeedleShape.Pointer,
        isReadOnly: false
    });
    // configure the gauge
    new ComboBox('#start', {
        itemsSource: [-90, -45, 0, 45, 90],
        selectedItem: theRadialGauge.startAngle,
        selectedIndexChanged: (s) => {
            theRadialGauge.startAngle = s.selectedItem;
        }
    });
    new ComboBox('#sweep', {
        itemsSource: [-360, -270, -180, -90, 90, 180, 270, 360],
        selectedItem: theRadialGauge.sweepAngle,
        selectedIndexChanged: (s) => {
            theRadialGauge.sweepAngle = s.selectedItem;
        }
    });
    new ComboBox('#spacing', {
        itemsSource: [20, 50, 100, 200, 250],
        selectedItem: 100,
        selectedIndexChanged: (s) => {
            theRadialGauge.tickSpacing = s.selectedItem;
        }
    });
    new ComboBox('#needle-shape', {
        itemsSource: 'None,Triangle,Diamond,Hexagon,Rectangle,Arrow,WideArrow,Pointer,WidePointer,Outer'.split(','),
        text: NeedleShape[theRadialGauge.needleShape],
        textChanged: (s) => {
            theRadialGauge.needleShape = s.text;
            theRadialGauge.showText = s.text.match(/Outer|None/)
                ? ShowText.Value
                : ShowText.None;
        }
    });
    new ComboBox('#needle-length', {
        itemsSource: 'Outer,Middle,Inner'.split(','),
        text: 'Middle',
        textChanged: (s) => {
            theRadialGauge.needleLength = s.text;
        }
    });
    // gauges with custom needles
    new RadialGauge('#customGauge1', {
        thickness: .2,
        showText: ShowText.None,
        min: 0,
        max: 500,
        value: 100,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        showTickText: true,
        tickSpacing: 50,
        isReadOnly: false,
        needleLength: NeedleLength.Inner,
        needleElement: RadialGauge.createNeedleElement([
            { x: -35, y: 0 },
            { x: -35, y: 35 },
            { x: -30, y: 35 },
            { x: -20, y: 5 },
            { x: 60, y: 5 },
            { x: 100, y: 0 }
        ], 15)
    });
    new RadialGauge('#customGauge2', {
        thickness: .2,
        showText: ShowText.None,
        min: 0,
        max: 500,
        value: 100,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        showTickText: true,
        tickSpacing: 50,
        isReadOnly: false,
        needleLength: NeedleLength.Inner,
        needleElement: RadialGauge.createNeedleElement([
            { x: -10, y: 0 },
            { x: -10, y: 12 },
            { x: 0, y: 20 },
            { x: 35, y: 20 },
            { x: 50, y: 12 },
            { x: 10, y: 12 },
            { x: 10, y: 5 },
            { x: 80, y: 5 },
            { x: 100, y: 0 }
        ])
    });
    new RadialGauge('#customGauge3', {
        thickness: .2,
        showText: ShowText.Value,
        min: 0,
        max: 500,
        value: 100,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        showTickText: true,
        tickSpacing: 50,
        isReadOnly: false,
        needleLength: NeedleLength.Inner,
        needleElement: RadialGauge.createNeedleElement([
            { x: 40, y: 15 },
            { x: 90, y: 0 }
        ])
    });
}
