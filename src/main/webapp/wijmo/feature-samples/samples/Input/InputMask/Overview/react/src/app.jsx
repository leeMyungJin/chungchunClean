import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InputMask } from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overwrite: false
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theSSN">Social Security Number</label>
                <InputMask id="theSSN" mask="000-00-0000" overwriteMode={this.state.overwrite}/>
            </div>

            <div className="form-group">
                <label htmlFor="theZip">Zip Code</label>
                <InputMask id="theZip" mask="00000" overwriteMode={this.state.overwrite}/>
            </div>

            <div className=" form-group">
                <label htmlFor="theZip4">Zip+4 Code</label>
                <InputMask id="theZip4" mask="00000-0000" overwriteMode={this.state.overwrite}/>
            </div>

            <div className="form-group">
                <label htmlFor="thePhone">Phone Number</label>
                <InputMask id="thePhone" mask="(999) 000-0000" overwriteMode={this.state.overwrite}/>
            </div>

            <p>
                By default, typing into the <b>InputMask</b> inserts text at the cursor position.
                In some cases, you may want to overwrite the text instead.<br />
                Click the checkbox below to see the difference:
            </p>

            <label>
                Enable Overwrite{' '}
                <input type="checkbox" defaultChecked={false} onChange={(e) => this.setState({ overwrite: e.target.checked })}/>
            </label>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
