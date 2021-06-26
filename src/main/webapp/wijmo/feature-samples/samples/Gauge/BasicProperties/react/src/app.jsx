import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._comboSource = ['None', 'Value', 'MinMax', 'All'];
        this.state = {
            min: 0,
            max: 100,
            value: 75,
            step: 1,
            showText: 'None',
            isReadOnly: true,
            isAnimated: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label htmlFor="min">min:</label>
                            <wjInput.InputNumber id="min" step={10} value={this.state.min} valueChanged={s => this.setState({ min: s.value })}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label htmlFor="max">max:</label>
                            <wjInput.InputNumber id="max" step={10} value={this.state.max} valueChanged={s => this.setState({ max: s.value })}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label htmlFor="value">value:</label>
                            <wjInput.InputNumber id="value" step={10} value={this.state.value} valueChanged={s => this.setState({ value: s.value })}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label htmlFor="showText">showText:</label>
                            <wjInput.ComboBox id="showText" text={this.state.showText} itemsSource={this._comboSource} selectedIndexChanged={s => this.setState({ showText: s.selectedValue })}>
                            </wjInput.ComboBox>
                        </div>

                        <div className="form-check">
                            <label htmlFor="isReadOnly">isReadOnly:</label>
                            <input id="isReadOnly" type="checkbox" className="form-check-input" checked={this.state.isReadOnly} onChange={() => this.setState({ isReadOnly: !this.state.isReadOnly })}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="step">step:</label>
                            <wjInput.InputNumber id="step" min={1} step={1} value={this.state.step} valueChanged={s => this.setState({ step: s.value })}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-check">
                            <label htmlFor="isAnimated">isAnimated:</label>
                            <input id="isAnimated" type="checkbox" className="form-check-input" checked={this.state.isAnimated} onChange={() => this.setState({ isAnimated: !this.state.isAnimated })}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <wjGauge.RadialGauge min={this.state.min} max={this.state.max} value={this.state.value} showText={this.state.showText} step={this.state.step} isReadOnly={this.state.isReadOnly} isAnimated={this.state.isAnimated} valueChanged={s => this.setState({ value: s.value })}>
                        </wjGauge.RadialGauge>
                        <wjGauge.LinearGauge min={this.state.min} max={this.state.max} value={this.state.value} showText={this.state.showText} step={this.state.step} isReadOnly={this.state.isReadOnly} isAnimated={this.state.isAnimated} valueChanged={s => this.setState({ value: s.value })}>
                        </wjGauge.LinearGauge>
                        <wjGauge.BulletGraph min={this.state.min} max={this.state.max} value={this.state.value} showText={this.state.showText} step={this.state.step} isReadOnly={this.state.isReadOnly} isAnimated={this.state.isAnimated} target={60} good={70} bad={50} valueChanged={s => this.setState({ value: s.value })}>
                        </wjGauge.BulletGraph>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
