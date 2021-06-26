import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { BarcodeMicroPdf417 } from '@grapecity/wijmo.react.barcode.composite';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theValue: 'This is a MicroPDF417 barcode'
        };
    }
    render() {
        return <div className="container-fluid">
            <div>MicroPDF417 barcode</div>
            <BarcodeMicroPdf417 value={this.state.theValue}/>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
