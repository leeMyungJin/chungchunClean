import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { RadialGauge, Range } from '@grapecity/wijmo.react.gauge';
import { Tooltip } from '@grapecity/wijmo';
class App extends React.Component {
    render() {
        return <div className="container-fluid">
            <RadialGauge isReadOnly={false} hasShadow={false} showText="All" startAngle={-30} sweepAngle={240} value={50} showRanges={true} showTicks={true} tickSpacing={10} thumbSize={20} initialized={s => this.setTooltips(s)}>
                <Range wjProperty="pointer" thickness={0.15}/>
                <Range min={0} max={30} color="red" thickness={0.5}/>
                <Range min={30} max={50} color="orange" thickness={0.5}/>
                <Range min={50} max={70} color="gold" thickness={0.5}/>
                <Range min={70} max={100} color="green" thickness={0.5}/>
            </RadialGauge>
        </div>;
    }
    // add tooltips to gauge elements
    setTooltips(s) {
        let tt = new Tooltip(), host = s.hostElement;
        tt.setTooltip(host.querySelector('.wj-face'), 'Face');
        tt.setTooltip(host.querySelector('.wj-pointer'), 'Pointer');
        tt.setTooltip(host.querySelector('.wj-thumb'), 'Thumb');
        tt.setTooltip(host.querySelector('.wj-ranges'), 'Ranges');
        tt.setTooltip(host.querySelector('.wj-ticks'), 'Tickmarks');
        tt.setTooltip(host.querySelector('.wj-value'), 'Text: Value');
        tt.setTooltip(host.querySelector('.wj-min'), 'Text: Min');
        tt.setTooltip(host.querySelector('.wj-max'), 'Text: Max');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
