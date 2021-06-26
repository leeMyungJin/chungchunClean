import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RadialGauge, Range } from '@grapecity/wijmo.react.gauge';
import { InputNumber } from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: 100,
            step: 5,
            value: 75,
            startAngle: 0,
            sweepAngle: 180,
            autoScale: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label data-for="value">value:</label>
                            <InputNumber id="value" min={this.state.min} max={this.state.max} step={this.state.step} value={this.state.value} valueChanged={(s) => this.setState({ value: s.value })}/>
                        </div>

                        <div className="form-group">
                            <label data-for="startAngle">startAngle:</label>
                            <InputNumber id="startAngle" step={10} min={-360} max={360} value={this.state.startAngle} valueChanged={(s) => this.setState({ startAngle: s.value })}/>
                        </div>

                        <div className="form-group">
                            <label data-for="sweepAngle">sweepAngle:</label>
                            <InputNumber id="sweepAngle" step={10} min={-360} max={360} value={this.state.sweepAngle} valueChanged={(s) => this.setState({ sweepAngle: s.value })}/>
                        </div>

                        <div className="form-check">
                            <label htmlFor="autoScale" className="form-check-label">autoScale:</label>
                            <input id="autoScale" type="checkbox" className="form-check-input" checked={this.state.autoScale} onChange={e => this.setState({ autoScale: e.target.checked })}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="gauge-holder">
                            <RadialGauge isReadOnly={false} min={this.state.min} max={this.state.max} step={this.state.step} value={this.state.value} showRanges={false} startAngle={this.state.startAngle} sweepAngle={this.state.sweepAngle} autoScale={this.state.autoScale} valueChanged={s => { this.setState({ value: s.value }); }}>
                                <Range min={0} max={33} color="red"/>
                                <Range min={33} max={66} color="yellow"/>
                                <Range min={66} max={100} color="green"/>
                            </RadialGauge>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
