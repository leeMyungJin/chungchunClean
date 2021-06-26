import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tax: 0.0825,
            command: {
                // execute the command
                executeCommand: (arg) => {
                    arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
                    if (wijmo.isNumber(arg)) {
                        let tax = this.state.tax;
                        this.setState({ tax: tax += arg });
                    }
                },
                // check if a command can be executed
                canExecuteCommand: (arg) => {
                    arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
                    if (wijmo.isNumber(arg)) {
                        let val = this.state.tax + arg;
                        return val >= 0 && val <= 1;
                    }
                    return false;
                }
            }
        };
    }
    valueChanged(sender) {
        this.setState({ tax: sender.value });
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="currentTax">Current Tax</label>
                <wjInput.InputNumber id="currentTax" format="p2" min={0} max={1} step={0.025} value={this.state.tax} valueChanged={this.valueChanged.bind(this)}>
                </wjInput.InputNumber>
            </div>
            <div className="form-group">
                <label htmlFor="changeTax">Change Tax</label>
                <wjInput.Menu header="Tax Commands" id="changeTax" command={this.state.command}>
                    <wjInput.MenuItem cmd={this.state.command} cmdParam={0.50}>
                        Increment by 50%
                    </wjInput.MenuItem>
                    <wjInput.MenuItem cmd={this.state.command} cmdParam={0.25}>
                        Increment by 25%
                    </wjInput.MenuItem>
                    <wjInput.MenuItem cmd={this.state.command} cmdParam={0.05}>
                        Increment by 5%
                    </wjInput.MenuItem>
                    <wjInput.MenuSeparator></wjInput.MenuSeparator>
                    <wjInput.MenuItem cmd={this.state.command} cmdParam={-0.05}>
                        Decrement by 5%
                    </wjInput.MenuItem>
                    <wjInput.MenuItem cmd={this.state.command} cmdParam={-0.25}>
                        Decrement by 25%
                    </wjInput.MenuItem>
                    <wjInput.MenuItem cmd={this.state.command} cmdParam={-0.50}>
                        Decrement by 50%
                    </wjInput.MenuItem>
                </wjInput.Menu>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
