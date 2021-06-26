import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 0
        };
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    render() {
        return <div className="container-fluid">
            <p>
                For example, here is an InputNumber with default settings:
            </p>
            <div className="form-group">
                <label htmlFor="theNumber">InputNumber</label>
                <wjInput.InputNumber id="theNumber" value={this.state.theValue} valueChanged={this.onValueChanged}>
                </wjInput.InputNumber>
            </div>
            <div>
                The current value is <b>{this.state.theValue}</b>.
            </div>

            <hr />

            <p>
                By default, InputNumber values are required, so you can't delete the entire content of the control. If you
            want to enter a number that is optional, set the <b>isRequired</b> property to false:
            </p>
            <div className="form-group">
                <label htmlFor="theNumberNotRequired">Not Required</label>
                <wjInput.InputNumber id="theNumberNotRequired" isRequired={false} value={null} placeholder="Your age (optional)">
                </wjInput.InputNumber>
            </div>
        </div>;
    }
    onValueChanged(sender) {
        this.setState({ theValue: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
